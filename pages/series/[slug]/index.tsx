import Heading, { HeadingVariants } from "@/components/ui/Heading";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section from "@/components/Section";
import { Main} from "@/components/Section/Section";
import testData from '@/utils/testData.json'
import Image from "next/image";
import React from "react";
import { getData } from "@/utils/getData";
import { querySerieLocale, querySeries, querySeriesLocale } from "@/utils/queries/series";
import { useRouter } from "next/router";
import CardDefault from "@/components/Cards/CardDefault/CardDefault";
import { I18NConfig } from "next/dist/server/config-shared";

// @ts-ignore
export default function SeriePage({data}) {

	const router = useRouter()
	console.log(data)
	return (<>
		<Main
			className={'page-series'}
			indexEl={0}
			breadcrumbs={
			<Breadcrumbs
				items={[ { label: router.locale === "ru" ? 'Каталог' : "Product catalog", path: "/catalog" }, { label: data.title, path: data.slug } ]} />
		}
			upTitle={data.series && (router.locale === "ru" ? 'Серия' : "Series")}
			nextLink={true}
			headingH1={<Heading className={'text-secondary2'} type={HeadingVariants.h1} text={data.title}/>}
			media={data.image && data.image.url && <Image src={process.env.NEXT_PUBLIC_BACK_URL + data.image.url} height={testData.data.series[0].image.height} width={testData.data.series[0].image.width} alt={''}/>}
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
			header={router.locale === "ru" ? 'Продукция' : "Products"}
			// sidebar={<SideBarCatalog items={testData.data["production-props"]} />}
			cards={data.products}
		/>
		</>
	)
}

export async function getStaticPaths({ locales }: I18NConfig) {
	const  dataEn   = await getData(querySeries,  {
		locale: "en"
	})
	const dataRu  = await getData(querySeries,  {
		locale: "ru"
	})
	console.log(dataRu)
	const paths: {params: { slug: string}, locale: string}[] = [];

	dataEn.data.forEach((v:any) => {
		paths.push({
			params: { slug: v.slug}, locale: "en"
		})
	})
	dataRu.data.forEach((v:any) => {
		paths.push({
			params: { slug: v.slug}, locale: "ru"
		})
	})
	console.log('paths', paths)
	return  {
		paths: paths,
		fallback: 'blocking',
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
