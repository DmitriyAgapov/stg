import Heading, { HeadingVariants } from "@/components/ui/Heading";
import Breadcrumbs from "@/components/Breadcrumbs";

import { Main } from "@/components/Section/Section";

import React, { useState } from "react";

import { getData } from "@/utils/getData";

import Link from "next/link";
import {Accordion, AccordionItem} from "@nextui-org/react";
import TextBlockRenderer from "@/components/ui/TextBlockRenderer/TextBlockRenderer";
import { Minus, Plus } from "@/components/Icons";
import { queryReviewPage, queryReviews } from "@/utils/reviews";

export default function Reviews({data, locale}: any) {
	console.log(data)
	const [ posts, setPosts ] = useState(null);

	return (

			<Main className={'blog-page justify-items-start'}
				breadcrumbs={<Breadcrumbs items={[ { label: data.page.label, path: "/reviews", } ]}/>}
				headingH1={<Heading className={'text-primary mb-16'}
					type={HeadingVariants.h1}
					text={data.page.label}/>}
				>
				<section className={"col-start-2 w-full col-span-8 row-start-3  "}>
					<Accordion variant="bordered" className={"rounded-none px-0"} itemClasses={{
						startContent: "bg-black",
						heading: "py-3 hover:outline outline-primary",
						title: "pl-6",
						indicator: "data-[open=true]:-rotate-180 mr-6",
						content: "mx-6"
					}}>
						{data.map((q:any) => {
							if(q.question.length > 0) {
								return q.question.map((i:any) => <AccordionItem          indicator={({ isOpen }) => (!isOpen ? <Plus /> : <Minus />)}    key={i.id} aria-label={i.text} title={i.text} variant="light">
									<TextBlockRenderer text={i.description}/>
								</AccordionItem>)
							}
						})}
					</Accordion>
				</section>

			</Main>

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
