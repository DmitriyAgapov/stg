import Heading, { HeadingVariants } from "@/components/ui/Heading";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section from "@/components/Section";
import { Main } from "@/components/Section/Section";
import testData from '@/utils/testData.json'
import Card, { CardNews, ImageDefault } from "@/components/Cards/Card/Card";
import useFormattedDate from "@/utils";
import { SideBarCatalog } from "@/components/SideBar/SideBar";
import React, { useEffect, useState } from "react";
import FormQuestions from "@/components/Form";
import CardProduct from "@/components/Cards/CardProduct";
import { Select, SelectItem } from "@nextui-org/react";
import { Tab, Tabs, Pagination } from "@nextui-org/react";
import { getData } from "@/utils/getData";
import { queryMainPage } from "@/utils/queries/pageQuery";
import { queryPostList, queryPostsList } from "@/utils/queries/Posts";


export default function Blog(props: any) {

	const [ posts, setPosts ] = useState(null);

	return (
		<>
			<Main className={'blog-page justify-items-start'}
				breadcrumbs={<Breadcrumbs items={[ { label: props.locale === "ru" ? "Блог" : "Blog", path: "/blog", } ]}/>}
				headingH1={<Heading className={'text-primary'}
					type={HeadingVariants.h1}
					text={props.locale === "ru" ? "Блог" : "Blog"}/>}>
				<nav className={'blog-page__nab w-full'}>
					<Tabs color={"primary"}
						classNames={{
							base: "block  min-w-full mb-6 tab_bar",
							tabList: "gap-0 min-w-full relative rounded-none p-0",
							cursor: "border-2 border-primary text-primary mb-[0] w-full",
							tab: "py-4 h-12 max-w-fit  px-4 text-gray-500 font-semibold",

						}}
						key={1}
						size={"lg"}
						variant={"underlined"}
						aria-label="Tabs variants">

						<Tab key="all"
							title={props.locale === "ru" ? "Все" : "All"}>
							{props.posts.map((card: { shortText: any; id: React.Key | null | undefined; image: ImageDefault | undefined; title: string | undefined; slug: string | number | boolean; publishedAt: string | number | Date; post_category: { title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }; }) =>
								<CardNews
									// text={card.shortText}
									key={card.id}
									headingVariant={HeadingVariants.h4}
									img={card.image}
									title={card.title}
									style={" news__card" + " horizontal"}
									link={`/blog/${encodeURIComponent(card.slug)}`}>
									{/* eslint-disable-next-line react-hooks/rules-of-hooks */}
									<div className={'card__date'}>{new Date(Date(card.publishedAt)).toLocaleDateString()}</div>
									<div className={'card__tags'}><span className={'card__tag'}>{card.post_category.title}</span></div>
								</CardNews>
							)}
						</Tab>
						{props.data.map(category => <Tab key={category.slug}
							title={category.title}>
							{category.posts.map((card: { shortText: any; id: React.Key | null | undefined; image: ImageDefault | undefined; title: string | undefined; slug: string | number | boolean; publishedAt: string | number | Date; post_category: { title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }; }) =>
								<CardNews text={card.shortText} key={card.id}
									headingVariant={HeadingVariants.h4}
									img={card.image}
									title={card.title}
									style={" news__card" + " horizontal"}
									link={`/blog/${encodeURIComponent(card.slug)}`}>
									{/* eslint-disable-next-line react-hooks/rules-of-hooks */}
									<div className={'card__date'}>{new Date(Date(card.publishedAt)).toLocaleDateString()}</div>
									<div className={'card__tags'}><span className={'card__tag'}>{category.title}</span></div>
								</CardNews>
							)}
						</Tab>)}
					</Tabs>
					{/*<Pagination variant={"flat"} radius={'none'} size={"lg"} showControls total={10} initialPage={1} />*/}
				</nav>
			</Main>


		</>
	)
}

export async function getStaticProps(props: { locale: string, category: string}) {

	const { data }   = await getData(queryPostsList, {
		locale: props.locale,
		category: props.category || ""
	});
	const posts   = await getData(queryPostList, {
			locale: props.locale,
			slug: props.category || ""
	});

	return {
		props: {
			locale: props.locale,
			data: data,
			posts: posts.data
		},
	}
}
