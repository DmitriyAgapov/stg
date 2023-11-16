import styles from './Calc.module.scss';
import Section from "@/components/Section";

import testData from '@/utils/testData.json'
import { observer } from "mobx-react-lite";
import { useStore } from "@/store";
import Books from "@/store/Books";
import BooksStore from "@/store/Books";
import Image from "next/image";
import { Bsvg, Csvg, Dsvg, Esvg, SuvSvg, CrossSvg } from "@/components/Icons";
let allIcons = [
	{
		id: "b",
		svg: <Bsvg/>
	},
	{id: "c", svg: <Bsvg/>},
	{id: "d" ,svg: <Dsvg/>},
	{id: "e" ,svg: <Esvg/>},
	{id: "suv" ,svg: <SuvSvg/>},
	{id: "cross" ,svg: <CrossSvg/>}
]

const CalcCard = observer((props: {
	size: {
		id: string
		title: string
		subTitle: string
	} | undefined

}) => {
	// @ts-ignore
	let keySize = allIcons.filter((icon) => icon.id === props.size.id)

	// console.log(icon[`${keySize.toString()}`])
	let store = useStore()

	const CurIcon = () => keySize[0].svg;
	return <div className={"card card_calc"} data-active={store.booksStore.calc.size === props.size?.id ? true : null} onClick={event => {
		if(props.size) {
			if (!store.booksStore.calc.size) {
				store.booksStore.setCalcSize(props.size.id)
			} else if (store.booksStore.calc.size && store.booksStore.calc.size !== props.size.id) {
				store.booksStore.setCalcSize(props.size.id);
			} else if (store.booksStore.calc.size && store.booksStore.calc.size === props.size.id) {
				store.booksStore.setCalcSize(undefined)
				store.booksStore.setCalcVariant(undefined)
			}
		}
	}}><h4>{props.size?.title}</h4><span>{props.size?.subTitle}</span><CurIcon /></div>;
});

const CalcCardVariant = observer((props: {

	variant: {
		id: string
		title: string
		subTitle: string
	} | undefined
}) => {

	let store = useStore()

	return <div className={"card card_calc"} data-active={store.booksStore.calc.variant === props.variant?.id ? true : null}
		onClick={event => {
			if(props.variant) {
		if (!store.booksStore.calc.variant) {
			store.booksStore.setCalcVariant(props.variant.id)
		} else if(store.booksStore.calc.variant && store.booksStore.calc.variant !== props.variant.id) {
			store.booksStore.setCalcVariant(undefined);
			store.booksStore.setCalcVariant(props.variant.id);
		} else if(store.booksStore.calc.variant && store.booksStore.calc.variant === props.variant.id) {
			store.booksStore.setCalcVariant(undefined);
		}}}
	}><h4>{props.variant?.title}</h4><span>{props.variant?.subTitle}</span></div>;
});

const CalcSection = observer(props =>  {
	let store = useStore()
	return <div className={styles.Calc}>
        <Section
			shortText={'Выберите класс автомобиля'}
			cards={testData.data.calc.size.map((p, index) =>
				<CalcCard key={index}
					size={p}/>)}
			>
		</Section>
		{store.booksStore.calc.size  && <Section
			shortText={'Выберите размер автомобиля'}
			cards={testData.data.calc.variant.map((p, index) =>
				<CalcCardVariant key={index}
					variant={p}/>)}
>			</Section>}


    </div>;
});

export default CalcSection;
