import Heading, { HeadingVariants } from "@/components/ui/Heading";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Main } from "@/components/Section/Section";
import map from "@/public/map.png"
import { getData } from "@/utils/getData";
import { baseConfig } from "@/utils/queries/baseConfig";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
// @ts-ignore
const DynamicMap = dynamic(() => import('@/components/Map/Map'), {})

export default function Contacts(props: { locale: string, data: any }) {

	const contactsCards = [
		{
			cardTitle: props.locale === "ru" ? "Телефоны" : "Phone",
			properties: props.data.phone
		},
		{
			cardTitle: props.locale === "ru" ? "Email" : "Email",
			properties: props.data.email
		},
		{
			cardTitle: props.locale === "ru" ? "Адрес" : "Address",
			properties: [
				{
					value: props.data.address
				}
			]
		}
	]

	return (
		<>

			<Main className={'page-contacts justify-items-start'}
				breadcrumbs={
					<Breadcrumbs items={[ { label: props.locale === "ru" ? "Контакты" : "Contacts", path: "/contacts", } ]}/>}

				headingH1={<Heading className={'text-secondary2'}
					type={HeadingVariants.h1}
					text={props.locale === "ru" ? 'Контакты' : "Contacts"}/>}
				cards={contactsCards.map((it, index: number) => <div className={`card-contacts contacts_item`}
					key={index + it.cardTitle}>
					<h4 className={'text-gray-500 font-semibold'}>{it.cardTitle}</h4>
					<ul className={'pl-0 list-none'}>
						{it.properties.map((pr: { id: Key | null | undefined; value: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }) => <li className={'text-base text-xl font-semibold'} key={pr.id}>{pr.value}</li>)}
						</ul>
					</div>
				)}
			>
				<div className={'map_img'}>

				</div>
				<DynamicMap />


			</Main>

			{/* eslint-disable-next-line react/jsx-no-undef */}

		</>
	)
}


export async function getStaticProps(props: {
	locale: string
}) {

	const { data } = await getData(baseConfig, {
		locale: props.locale
	});
	return {
		props: {
			locale: props.locale,
			data: data
		},
	}
}
