import styles from './Calc.module.scss';
import Section from "@/components/Section";

import testData from '@/utils/testData.json'
import { observer } from "mobx-react-lite";
import { useStore } from "@/store";
import Books from "@/store/Books";
import BooksStore from "@/store/Books";
import Image from "next/image";
import { Bsvg, Csvg, Dsvg, Esvg, SuvSvg, CrossSvg } from "@/components/Icons";
import {useRouter} from "next/router";
import {toJS} from "mobx";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import useWindowDimensions, {num_plural} from "@/utils/utils";


let allIcons = [
	{
		id: "b-klass",
		svg: <Bsvg/>
	},
	{id: "c-klass", svg: <Bsvg/>},
	{id: "d-klass" ,svg: <Dsvg/>},
	{id: "e-klass" ,svg: <Esvg/>},
	{id: "suv-dzhip" ,svg: <SuvSvg/>},
	{id: "krossover" ,svg: <CrossSvg/>}
]

export const CalcCard = observer((props: {
	size: {
		id: string
		title: string
		subTitle: string
		slug: string
        subtitle: string
	} | undefined

}) => {

	// @ts-ignore
	let keySize = allIcons.filter((icon) => icon.id == props.size.slug);

	let store = useStore();

	const router = useRouter()
	const CurIcon = () => keySize[0].svg;
	const {width} = useWindowDimensions()
	return <div className={"card card_calc"} data-active={store.booksStore.calc.size === props.size?.slug ? true : null} onClick={event => {
		// console.log('click', store.booksStore.calc)

		(width && width < 1024) && router.push('#mat-class').then(r =>r)
		if(props.size) {
			if (!store.booksStore.calc.size) {
				store.booksStore.setCalcSize(props.size.slug)
			} else if (store.booksStore.calc.size && store.booksStore.calc.size !== props.size.slug) {
				store.booksStore.setCalcSize(props.size.slug);
			} else if (store.booksStore.calc.size && store.booksStore.calc.size === props.size.slug) {
				store.booksStore.setCalcSize(undefined)
				store.booksStore.setCalcVariant(undefined)
			}
		}

	}}><h4>{props.size?.title}</h4><span>{props.size?.subtitle}</span><CurIcon /></div>;
});

export const CalcCardVariant = observer((props: {
	variant: {
		id: string
		title: string
		subTitle: string
		slug: string
	} | undefined
}) => {
	let store = useStore()
	return <div className={"card card_calc"} data-active={store.booksStore.calc.variant === props.variant?.slug ? true : null}
		onClick={event => {

			if(props.variant) {
		if (!store.booksStore.calc.variant) {
			store.booksStore.setCalcVariant(props.variant.slug)
		} else if(store.booksStore.calc.variant && store.booksStore.calc.variant !== props.variant.slug) {
			store.booksStore.setCalcVariant(undefined);
			store.booksStore.setCalcVariant(props.variant.slug);
		} else if(store.booksStore.calc.variant && store.booksStore.calc.variant === props.variant.slug) {
			store.booksStore.setCalcVariant(undefined);
		}}

			// console.log('clickVar', store.booksStore.calc)
		}
	}><h4>{props.variant?.title}</h4><span>{props.variant?.subTitle}</span></div>;
});

const CalcSection = observer((props: any) =>  {
	let store = useStore()

	return <div className={styles.Calc}>

        <Section
			// @ts-ignore

			shortText={props.sections[0].shortText}
			className={props.sections[0].type}
			cards={props.sections[0].car_class_calcs}>
		</Section>

		{store.booksStore.calc.size  && <Section
			id={"mat-class"}
			// @ts-ignore
			className={props.sections[1].type}
			shortText={props.sections[1].shortText}
			cards={props.sections[1].series}

			// cards={testData.data.calc.variant.map((p, index) =>
			// 	<CalcCardVariant key={index}
			// 		variant={p}/>)}
>			</Section>}
		{/*<Section header={props.sections[2].title} shortText={props.sections[2].shortText} className={props.sections[2].type}><CalcResult/></Section>*/}

		{props.children}

    </div>;
});

export default CalcSection;
