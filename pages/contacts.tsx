import Heading, { HeadingVariants } from "@/components/ui/Heading";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Main } from "@/components/Section/Section";
import { getData } from "@/utils/getData";
import { baseConfig } from "@/utils/queries/baseConfig";
import styles from "@/components/Map/Map.module.scss";
import React from "react";
import map from "@/public/map.png";
import Image from "next/image";

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

				breadcrumbs={<Breadcrumbs items={[ { label: props.locale === "ru" ? "Контакты" : "Contacts", path: "/contacts", } ]}/>}
				headingH1={<Heading className={'text-secondary2'}
				type={HeadingVariants.h1}
				text={props.locale === "ru" ? 'Контакты' : "Contacts"}/>}
				cards={contactsCards.map((it, index: number) => <div className={`card-contacts contacts_item`}
					key={index + it.cardTitle}>
						<h4 className={'text-gray-500 font-semibold'}>{it.cardTitle}</h4>
						<ul className={'pl-0 list-none'}>
							{it.properties.map((pr: any, index: number) => <li className={'text-base text-xl font-semibold'} key={pr.id + index}>{pr.value}</li>)}
						</ul>
					</div>
				)}
			>
			<div className={styles.map} id={"map"} style={{width: "100%", height: "550px", gridColumn: "1/-1"}}>
				<Image src={map} alt={''} layout={"fill"} fill style={{width:'100%', height: "100%", objectFit: "cover"}}/>
			</div>
		</Main>

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
