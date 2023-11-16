import Heading, { HeadingVariants } from "@/components/ui/Heading";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Main } from "@/components/Section/Section";
import testData from '@/utils/testData.json';
import MapBasics from "@/components/Map/Map";
import { getData } from "@/utils/getData";
import { baseConfig } from "@/utils/queries/baseConfig";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react";

export default function Contacts(props: { locale: string, data: any }) {

	const contactsCards = [
		{
			cardTitle: props.locale === "ru" ? "Телефоны" : "Phone",
			properties: props.data.attributes.phone
		},
		{
			cardTitle: props.locale === "ru" ? "Email" : "Email",
			properties: props.data.attributes.email
		},
		{
			cardTitle: props.locale === "ru" ? "Адрес" : "Address",
			properties: [
				{
					value: props.data.attributes.address
				}
			]
		}
	]
	console.log(contactsCards[0].properties)
	return (
		<>

			<Main className={'page-contacts justify-items-start'}
				breadcrumbs={
					<Breadcrumbs items={[ { label: props.locale === "ru" ? "Главная" : "Home", path: "/", }, { label: props.locale === "ru" ? "Контакты" : "Contacts", path: "/contacts", } ]}/>}

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
				<MapBasics />


			</Main>

			{/* eslint-disable-next-line react/jsx-no-undef */}

		</>
	)
}
export async function getStaticProps(props: {locale:string}) {

	const {baseConfig: {data}} = await getData(baseConfig, props.locale, {})
	return {
		props: {
			locale: props.locale,
			data
		},
	}
}
