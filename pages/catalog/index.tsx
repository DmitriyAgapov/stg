import Heading, { HeadingVariants } from "@/components/ui/Heading";
import Section from "@/components/Section";
import { Main } from "@/components/Section/Section";
import { SectionCards } from "@/components/Section/SectionCards";
import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getData } from "@/utils/getData";
import { queryCatalogPage } from "@/utils/queries/pageQuery";

export default function PageCatalog(props: any) {

	return (
		<>

			<Main className={'mainPage page-catalog'}
				breadcrumbs={<Breadcrumbs items={[
					{
						label: props.data.title,
						path: "/catalog",
					}
				]}/>}
				headingH1={
					<Heading className={'text-secondary2 mb-10'}
						type={HeadingVariants.h1}
						text={props.data.title}/>
				}
				shortText={props.data.description}>

				<SectionCards cards={props.data.series.map((i: any) => ({
					...i,
					headingVariant: HeadingVariants.h3
				}))}/>

			</Main>
			{props.data.sections.map((section:any) => <Section
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

export async function getStaticProps(props: { locale: string }) {

	const  { data } = await getData(queryCatalogPage, {
		locale: props.locale
	});

	return {
		props: {
			locale: props.locale,
			data: data
		},
	}
}
