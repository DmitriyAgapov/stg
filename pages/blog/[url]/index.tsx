import Heading, { HeadingVariants } from "@/components/ui/Heading";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section from "@/components/Section";
import { Main } from "@/components/Section/Section";
import testData from '@/utils/testData.json'
import Card, { CardNews } from "@/components/Cards/Card/Card";
import useFormattedDate from "@/utils";
import { SideBarCatalog } from "@/components/SideBar/SideBar";
import React from "react";
import FormQuestions from "@/components/Form";
import CardProduct from "@/components/Cards/CardProduct";
import { Select, SelectItem } from "@nextui-org/react";
import { Tab, Tabs, Pagination } from "@nextui-org/react";
import { getData } from "@/utils/getData";
import { queryAllPosts, queryPost, queryPostList, queryPostsList } from "@/utils/queries/Posts";
import { I18NConfig } from "next/dist/server/config-shared";
import { querySeries } from "@/utils/queries/series";
import { backUrl } from "@/utils/utils";


export default function Blog(props: { publishedAt: any; locale: string; data: { title: string | number | boolean | JSX.Element | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | React.ReactElement<string, any> | null | undefined; slug: any; post_category: { title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }; }; }) {
	// @ts-ignore
	const curDate = new Date(Date(props.publishedAt)).toLocaleDateString();
	return (
		<>

			<Main
				className={'blog-page blog-page-article justify-items-start'}
				breadcrumbs={<Breadcrumbs items={[ { label: props.locale === "ru" ? "Блог" : "Blog", path: "/blog", }, { label: props.data.title, path: `${backUrl}/${props.data.slug}` }]} />}
				headingH1={<><Heading className={'text-primary'} type={HeadingVariants.h1} text={props.data.title} />
					<ul className={'list-none pl-0 flex gap-4 font-bold text-base'}>
						<li>Раздел: {"  "}<span className={' text-gray-500 font-normal'}>{props.data.post_category.title}</span></li>
					<li>Дата публикации:  <span className={' text-gray-500 font-normal'}> {curDate + ''}</span></li>
				</ul></>}

			>
			<div className={'main__content  col-span-full mb-8 flex justify-end row-start-3 row-end-3 col-start-2 col-end-[-2]'}>
					<div dangerouslySetInnerHTML={{__html: testData.data.articles[0].content}} />
				</div>
				<div className={'products-container'}>

					{/*{testData.data.page["catalog-category"].items.map((i) =>*/}
					{/*	<CardProduct*/}
					{/*		style={"-product"}*/}
					{/*		title={i.title}*/}
					{/*		key={i.id}*/}
					{/*		properties={i.properties}*/}
					{/*		series={i.series}*/}
					{/*		headingVariant={HeadingVariants.h3}*/}
					{/*		img={i.images[0]}*/}
					{/*		link={`/catalog/${i.series.slug}/${i.slug}`}*/}
					{/*	>*/}
					{/*	</CardProduct>)}*/}
				</div>


			</Main>


		</>
	)
}

export async function getStaticPaths({ locales }: I18NConfig) {
	const { data }  = await getData(queryAllPosts,  {})

	const paths: {params: { url: string}, locale: string}[] = [];

	data.forEach((v:any) => {
		paths.push({
			params: { url: v.slug}, locale: "en"
		}, {
			params: { url: v.slug}, locale: "ru"
		})
	})
	return  {
		paths: paths,
		fallback: 'blocking',
	}
}
export async function getStaticProps(props: { locale: string, params: {url: string}}) {

	const { data }   = await getData(queryPost, {
		locale: props.locale,
		slug: props.params.url
	});
	return {
		props: {
			locale: props.locale,
			data: data[0]
		},
	}
}
