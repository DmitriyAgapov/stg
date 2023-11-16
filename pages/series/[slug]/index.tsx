import Blocks from 'editorjs-blocks-react-renderer';
import Heading, { HeadingVariants } from "@/components/ui/Heading";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section from "@/components/Section";
import { Main} from "@/components/Section/Section";
import { Select, SelectItem } from "@nextui-org/react";
import testData from '@/utils/testData.json'
import Image from "next/image";
import Card, { CardNews } from "@/components/Cards/Card/Card";
import useFormattedDate from "@/utils";
import React from "react";
import FormQuestions from "@/components/Form";
import CardProduct from "@/components/Cards/CardProduct";
import { SideBarCatalog } from "@/components/SideBar/SideBar";
import { getData } from "@/utils/getData";
import { querySerieLocale, querySeries, querySeriesLocale } from "@/utils/queries/series";
import { useRouter } from "next/router";
import CardDefault from "@/components/Cards/CardDefault/CardDefault";
import { I18NConfig } from "next/dist/server/config-shared";
import { queryProducts } from "@/utils/queries/products";

// @ts-ignore
export default function SeriePage({data}) {

	const router = useRouter()
	console.log(data.products)
	return (<>
		<Main
			className={'page-series'}
			breadcrumbs={
			<Breadcrumbs
				items={[ { label: router.locale === "ru" ? 'Каталог' : "Product catalog", path: "/catalog" }, { label: data.title, path: data.slug } ]} />
		}
			upTitle={router.locale === "ru" ? 'Серия' : "Series"}
			nextLink={true}
			headingH1={<Heading className={'text-secondary2'} type={HeadingVariants.h1} text={data.title}/>}
			media={data.image.url && <Image src={process.env.NEXT_PUBLIC_BACK_URL + data.image.url} height={testData.data.series[0].image.height} width={testData.data.series[0].image.width} alt={''}/>}
			shortText={data.description}
			cards={data.Features.map((card:any) => <CardDefault key={card.id}
					headingVariant={HeadingVariants.h4}
					img={card.image}
					title={card.text}
					style={" feature-series"}
					/>
			)}
		/>
		<Section className={'page-serie'}
			// sidebar={<SideBarCatalog items={testData.data["production-props"]} />}
			cards={data.products}
		>
			{/*<div className={'products-container-header col-span-full mb-8 flex justify-end row-start-3 row-end-3 col-start-2 col-end-[-2]'}>*/}
			{/*	<	// @ts-ignore*/}
			{/*		Select*/}
			{/*		label="Сортировать по"*/}
			{/*		className="max-w-xs"*/}
			{/*		color={"default"} radius={"none"} variant={"flat"}   fullWidth  disableAnimation>*/}

			{/*		<SelectItem  key={"series"} value={"Серии"}>*/}
			{/*			Серии*/}
			{/*		</SelectItem>*/}
			{/*		<SelectItem key={"size"} value={"Размеру"}>*/}
			{/*			Размеру*/}
			{/*		</SelectItem>*/}


			{/*	</Select>*/}
			{/*</div>*/}
			<div className={'products-container'}>

				{data.products.map((i) => {

					return <CardProduct
						style={"-product"}
						title={i.title}
						key={i.id}
						properties={i.variants}
						series={i.series}
						// @ts-ignore
						headingVariant={"h3"}
						img={{

							id: i.images[0].id,
							src: i.images[0].url,
							width: i.images[0].width,
							height: i.images[0].height
						}
						}
						link={`/catalog/${data.slug}/${i.slug}`}
                        {...i}
					>
					</CardProduct>})}
			</div>
		</Section>
		{/*<Section header={'Аксессуары'}*/}
		{/*	className={'accessories'}*/}
		{/*	isGallery={true}*/}
		{/*	shortText={'Инструмент, СИЗ, разное'}*/}
		{/*	cards={testData.data.sections.news.cards.map((card) => <CardNews key={card.id}*/}
		{/*			headingVariant={HeadingVariants.h4}*/}
		{/*			img={card.image}*/}
		{/*			title={card.title}*/}
		{/*			style={card.style}*/}
		{/*			link={`/news${card.slug}`}>*/}
		{/*			/!* eslint-disable-next-line react-hooks/rules-of-hooks *!/*/}
		{/*			<div className={'card__date'}>{useFormattedDate(card.publishedTime)}</div>*/}
		{/*			<div className={'card__tags'}>{card.tags.map((tag, index) => <span key={index} className={'card__tag'}>{tag.text}</span> )}</div>*/}
		{/*		</CardNews>*/}
		{/*	)}>*/}
		{/*</Section>*/}
		{/*	<Section*/}
		{/*		className={'form-questions '}*/}
		{/*		header={'Остались вопросы?'}*/}
		{/*		shortText={'Напишите нам, с Вами свяжутся в течении нескольких часов. Мы знаем ответ на ваш вопрос'}*/}
		{/*	>*/}
		{/*		<FormQuestions />*/}
		{/*	</Section>*/}
		</>
	)
}

export async function getStaticPaths({ locales }: I18NConfig) {
	const { data }  = await getData(querySeries,  {})
	const paths: {params: { slug: string}, locale: string}[] = [];
	data.forEach((v:any) => {
		paths.push({
			params: { slug: v.slug}, locale: "en"
		}, {
			params: { slug: v.slug}, locale: "ru"
		})
	})

	return  {
		paths: paths,
		fallback: false,
	}
}
export async function getStaticProps(props: {locale:string, params: { slug:string }}) {


	const { data } = await getData(querySerieLocale,  {
		locale: props.locale,
		slug: props.params.slug
	});
	return {
		props: {
			locale: props.locale,
			data: data[0]
		},
	}
}
