import Heading, { HeadingVariants } from "@/components/ui/Heading";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section from "@/components/Section";
import { Main } from "@/components/Section/Section";
import testData from '@/utils/testData.json'
import { CardNews } from "@/components/Cards/Card/Card";
import useFormattedDate from "@/utils";
import { SideBarCatalog } from "@/components/SideBar/SideBar";
import React, { useMemo } from "react";
import FormQuestions from "@/components/Form";
import CardProduct from "@/components/Cards/CardProduct";
import { Select, SelectItem } from "@nextui-org/react";
import { I18NConfig } from "next/dist/server/config-shared";
import { getData } from "@/utils/getData";
import { querySerieLocale, querySeries } from "@/utils/queries/series";
import { queryProducts, queryProductsCategory } from "@/utils/queries/products";
import { useRouter } from "next/router";
import { fullPath } from "@/utils/utils";

export default function CategoryPage({data, ...props}:any) {
	const router = useRouter()
	const newPath = useMemo(() => fullPath({product_category: data.product_category, series: data.series, item: {title: data.title,	slug: data.slug	}}), [])
	return (
	<>

	<Main
		className={'mainPage catalog-category'}
		breadcrumbs={<Breadcrumbs items={[ { label: props.locale === "ru" ? 'Каталог' : "Product catalog", path: "/catalog" }, ...newPath ]} />}
		// sidebar={<SideBarCatalog items={testData.data["production-props"]} />}
		headingH1={<Heading className={'text-secondary2'} type={HeadingVariants.h1} text={data.title} />}
		>

		{/*<div className={'products-container-header col-span-full mb-8 flex justify-end row-start-3 row-end-3 col-start-2 col-end-[-2]'}>*/}
		{/*	<Select*/}
		{/*		label="Сортировать по"*/}
		{/*		className="max-w-xs"*/}

		{/*		color={"default"}*/}
		{/*		radius={"none"} variant={"bordered"}*/}

		{/*		classNames={{*/}
		{/*			label: "group-data-[filled=true]:-translate-y-3 text-xs text-primary font-semibold ",*/}
		{/*			trigger: "min-h-unit-12",*/}
		{/*			value: "font-semibold text-primary",*/}

		{/*			listboxWrapper: "max-h-[400px] bg-transparent",*/}
		{/*			listbox: " bg-transparent",*/}
		{/*			popoverContent: "border-none bg-transparent rounded-none shadow-md"*/}
		{/*			// popoverContent: "bg-red-500",*/}
		{/*			// listbox: "text-red-200",*/}

		{/*		}}*/}
		{/*		listboxProps={{*/}
		{/*			classNames: {*/}
		{/*				base: 	["text-primary"],*/}
		{/*				list: ["p-0 my-0"]*/}
		{/*			},*/}
		{/*			itemClasses: {*/}
		{/*				title: "text-gray-700 font-semibold",*/}

		{/*				list: [*/}
		{/*					"bg-black"*/}
		{/*				],*/}
		{/*				base: [*/}
		{/*					"rounded-none",*/}
		{/*					"text-default-900",*/}
		{/*					"transition-opacity",*/}
		{/*					"data-[hover=true]: bg-none",*/}
		{/*					"data-[hover=true]: text-primary",*/}
		{/*					"data-[hover=true]: font-semibold ",*/}
		{/*					"data-[hover=true]:bg-transparent",*/}
		{/*					"dark:data-[hover=true]:bg-default-50",*/}
		{/*					"data-[selectable=true]:focus:bg-default-50",*/}
		{/*					"data-[pressed=true]:opacity-70",*/}
		{/*					"data-[focus-visible=true]:ring-default-500",*/}
		{/*				],*/}
		{/*			},*/}
		{/*		}}*/}




		{/*		 >*/}

		{/*		<SelectItem  key={"series"} value={"Серии"}>*/}
		{/*			Серии*/}
		{/*		</SelectItem>*/}
		{/*		<SelectItem key={"size"} value={"Размеру"}>*/}
		{/*			Размеру*/}
		{/*		</SelectItem>*/}

		{/*	</Select>*/}
		{/*</div>*/}
		{/*<div className={'products-container'}>*/}

		{/*	{testData.data.page["catalog-category"].items.map((i) =>*/}
		{/*		<CardProduct*/}
		{/*			style={"-product"}*/}
		{/*			title={i.title}*/}
		{/*			key={i.id}*/}
		{/*			// properties={i.properties}*/}
		{/*			// series={i.series}*/}
		{/*			headingVariant={HeadingVariants.h3}*/}
		{/*			img={i.images[0]}*/}
		{/*			link={`/catalog/${i.series.slug}/${i.slug}`}*/}
		{/*		>*/}
		{/*		</CardProduct>)}*/}
		{/*</div>*/}


	</Main>
		<Section className={'page-catalog-category'}
			header={'Продукция'}
			// sidebar={<SideBarCatalog items={testData.data["production-props"]} />}
			cards={data.products}
		/>
		{data.sections?.map((section:any) => <Section
			key={section.id}
			className={section.type}
			header={section.title}
			shortText={section.shortText}
			nextLink={section.nextLink}
			Links={section.Links}
			// @ts-ignore
			products={section.products}
			media={section.media}
			cards={section.cards}
			series={section.series}
			background={section.background}

		/>)}

	</>
	)
}

export async function getStaticPaths({ locales }: I18NConfig) {
	const { data }  = await getData('query { products { data { attributes { slug product_category { data { attributes { slug } } } } } } }',  {})
	const paths: { params: { category: string }, locale: string}[] = [];
	const uniqueSlus = data.reduce((acc: string | any[], item: { product_category: { slug: any; }; }) =>  {
		if(acc.includes(item.product_category.slug)) {
			return acc;
		}
		// @ts-ignore
		return [...acc, item.product_category.slug]
	}, [])
	uniqueSlus.forEach((v:any) => {
		paths.push({
			params: { category: v }, locale: "en"
		}, {
			params: { category: v }, locale: "ru"
		})
	})
	return  {
		paths: paths,
		fallback: false,
	}
}
export async function getStaticProps(props: {locale:string, params: { category:string }}) {

	const {data} = await getData(queryProductsCategory,  {
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
