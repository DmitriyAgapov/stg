import Heading, { HeadingVariants } from "@/components/ui/Heading";
import Breadcrumbs from "@/components/Breadcrumbs";

import Section, { Main } from "@/components/Section/Section";

import React from "react";

import { getData } from "@/utils/getData";
import { queryReviewPage, queryReviews } from "@/utils/reviews";
import { ReviewCard } from "@/components/Cards/CardSimple/CardSimple";
import FormReviews from "@/components/Form/FormReviews";

export default function Reviews({data, locale}: any) {



	return (<>

			<Main className={'blog-page justify-items-start'}
				breadcrumbs={<Breadcrumbs items={[ { label: data.page.title, path: "/reviews", } ]}/>}
				headingH1={<Heading className={'text-primary mb-4'}
					type={HeadingVariants.h1}
					text={data.page.title}/>}
				shortText={data.page.shortText}
				text={data.page.description}
				>
				<div className={"col-start-2 xl:col-end-13 lg:col-end-10 my-6"}>

					<FormReviews/></div>
				<div className={"section__cards my-8 grid grid-cols-1 md:grid-cols-2 1.5xl:grid-cols-3 gap-8"}>
								{data.reviews.map((q:any) => <ReviewCard person={q.person} text={q.text} date={q.createdAt} key={q.id}/>)}
				</div>
			</Main>

		</>

	)
}

export async function getStaticProps(props: { locale: string}) {

	const { data }   = await getData(queryReviewPage, {
		locale: props.locale
	});

	const resultReviews   = await getData(queryReviews, {
		locale: props.locale
	});

	return {
		props: {
			locale: props.locale,
			data: {
				page: data,
				reviews: resultReviews.data
			},
		},
	}
}
