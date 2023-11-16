import Heading, { HeadingVariants } from "@/components/ui/Heading";
import Breadcrumbs from "@/components/Breadcrumbs";

import { Main } from "@/components/Section/Section";
import React from "react";
import  CalcSection  from "@/components/Calc/Calc";


export default function Calc() {

	return (
		<>

			<Main
				className={'page-calc justify-items-start'}
				breadcrumbs={<Breadcrumbs
					items={[ { label: "Главная", path: "/", },{ label: "Расчёт материалов", path: "/calc", }]} />
				}

				headingH1={<>
					<Heading
						className={'text-secondary2  !mb-0'}
						type={HeadingVariants.h1}
						text={"Расчёт материалов"} />
					<p className={'text-base'}>Расчёт материалов для полной шумоизоляции автомобиля.</p>
				</>}
			>
				<CalcSection />
				{/*<div className={'main__content  col-span-full mb-8 flex justify-end row-start-3 row-end-3 col-start-2 col-end-[-2]'}>*/}
				{/*	<div dangerouslySetInnerHTML={{__html: testData.data.articles[0].content}} />*/}
				{/*</div>*/}
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
