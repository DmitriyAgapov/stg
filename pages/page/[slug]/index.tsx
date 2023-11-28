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
import { queryPage } from "@/utils/queries/pageQuery";


export default function Page({data, locale}: {data: any, locale: string}) {

	return (
		<>

			<Main
				className={'blog-page blog-page-article justify-items-start page-common' }
				breadcrumbs={<Breadcrumbs items={[ { label:data.title, path: data.url }]} />}
				headingH1={<>
					<Heading className={'text-primary'} type={HeadingVariants.h1}
				text={data.title} />
				</>}
				text={data.content}
				shortText={data.shortText}
				Links={data.link}
				cards={data.cards}
			>

			</Main>
			{data.sections.map((section:any, index: number) => {

				return <Section
					key={section.id}
					className={section.type}
					header={section.title}
					shortText={section.shortText}
					nextLink={section.nextLink}
					indexEl={index == 0 ? 1 : undefined}
					// @ts-ignore
					Links={section.Links}
					media={section.media}
					cards={section.cards}
					series={section.series}
					background={section.background}
					{...section}
				/>
			})}

		</>
	)
}

export async function getStaticPaths({ locales }: I18NConfig) {
	const { data }  = await getData(queryPage,  {})

	const paths: {params: { slug: string}, locale: string}[] = [];

	data.forEach((v:any) => {
		paths.push({
			params: { slug: v.url}, locale: "en"
		}, {
			params: { slug: v.url}, locale: "ru"
		})
	})
	return  {
		paths: paths,
		fallback: 'blocking',
	}
}
export async function getStaticProps(props: { locale: string, params: {slug: string}}) {

	const { data }   = await getData(queryPage, {
		locale: props.locale,
		url: props.params.slug
	});
	return {
		props: {
			locale: props.locale,
			data: data[0]
		},
	}
}
