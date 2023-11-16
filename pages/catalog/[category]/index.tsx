import Heading, { HeadingVariants } from "@/components/ui/Heading";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section from "@/components/Section";
import { Main } from "@/components/Section/Section";
import testData from '@/utils/testData.json'
import { CardNews } from "@/components/Cards/Card/Card";
import useFormattedDate from "@/utils";
import { SideBarCatalog } from "@/components/SideBar/SideBar";
import React from "react";
import FormQuestions from "@/components/Form";
import CardProduct from "@/components/Cards/CardProduct";
import { Select, SelectItem } from "@nextui-org/react";
import { I18NConfig } from "next/dist/server/config-shared";
import { getData } from "@/utils/getData";
import { querySerieLocale, querySeries } from "@/utils/queries/series";
import { queryProducts } from "@/utils/queries/products";

export default function Page() {
	console.log('category')
	return (
	<>

	<Main
		className={'mainPage catalog-category'}
		breadcrumbs={<Breadcrumbs items={[ { label: "Главная", path: "/", },{ label: "Каталог", path: "/catalog", }, { label: "Шумоизоляция", path: "/shumoizolyacia", } ]} />}
		sidebar={<SideBarCatalog items={testData.data["production-props"]} />}
		headingH1={<Heading className={'text-secondary2'} type={HeadingVariants.h1} text={'Каталог'} />}

		>
		<div className={'products-container-header col-span-full mb-8 flex justify-end row-start-3 row-end-3 col-start-2 col-end-[-2]'}>
			<Select
				label="Сортировать по"
				className="max-w-xs"
				color={"default"} radius={"none"} variant={"flat"}   fullWidth >

				<SelectItem  key={"series"} value={"Серии"}>
					Серии
				</SelectItem>
				<SelectItem key={"size"} value={"Размеру"}>
					Размеру
				</SelectItem>

			</Select>
		</div>
		<div className={'products-container'}>

			{testData.data.page["catalog-category"].items.map((i) =>
				<CardProduct
					style={"-product"}
					title={i.title}
					key={i.id}
					properties={i.properties}
					series={i.series}
					headingVariant={HeadingVariants.h3}
					img={i.images[0]}
					link={`/catalog/${i.series.slug}/${i.slug}`}
				>
				</CardProduct>)}
		</div>


	</Main>
	<Section header={'Аксессуары'}
		className={'accessories'}
		isGallery={true}
		shortText={'Инструмент, СИЗ, разное'}
		cards={testData.data.sections.news.cards.map((card) => <CardNews key={card.id}
				headingVariant={HeadingVariants.h4}
				img={card.image}
				title={card.title}
				style={card.style}
				link={`/news${card.slug}`}>
				{/* eslint-disable-next-line react-hooks/rules-of-hooks */}
				<div className={'card__date'}>{useFormattedDate(card.publishedTime)}</div>
				<div className={'card__tags'}>{card.tags.map((tag, index) => <span key={index} className={'card__tag'}>{tag.text}</span> )}</div>
			</CardNews>
		)}>


	</Section>
		<Section
			className={'form-questions'}
			header={'Остались вопросы?'}
			shortText={'Напишите нам, с Вами свяжутся в течении нескольких часов. Мы знаем ответ на ваш вопрос'}
		>
			<FormQuestions />
		</Section>
	</>
	)
}

export async function getStaticPaths({ locales }: I18NConfig) {
	const { series }  = await getData(querySeries,  {})
	const paths: {params: { category: string}, locale: string}[] = [];
	series.data.forEach((v:any) => {
		paths.push({
			params: { category: v.attributes.slug}, locale: "en"
		}, {
			params: { category: v.attributes.slug}, locale: "ru"
		})
	})

	return  {
		paths: paths,
		fallback: false,
	}
}
export async function getStaticProps(props: {locale:string, params: { category:string }}) {

	const {products: {data}} = await getData(queryProducts,  {
		locale: props.locale,
		slug: props.params.category
	});
	return {
		props: {
			locale: props.locale,
			data: data[0]
		},
	}
}
