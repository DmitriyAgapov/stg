import React, { useEffect, useState } from "react";
import SideBar from "@/components/SideBar";
import styles from "@/components/Section/Section.module.scss";
import Slider from "@/components/Slider";
import { CardNews } from "@/components/Cards/Card/Card";
import { HeadingVariants } from "@/components/ui/Heading";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import CardProduct from "@/components/Cards/CardProduct";
import TextBlockRenderer from "@/components/ui/TextBlockRenderer/TextBlockRenderer";
import CardSimpleProduct from "@/components/Cards/CardProduct/CardSimpleProduct";

function SectionRelated(props: any) {

	let isGallery = true;
	const router = useRouter()
	// let store = useStore();
	// const [data, setData] = useState()
	// useEffect(() => {
	// 	store.booksStore.lastNews(router.locale)
	// 		.then((r: any) => setData(r));
	// }, [store]);

	// @ts-ignore
	console.log(props)
	const cardsAr = props.cards.map(card => <CardSimpleProduct key={card.id}
		headingVariant={HeadingVariants.h4}
		img={card.image}
		title={card.title}
		style={" card-product related"}
		link={`/blog/${card.slug}`}>
		<div className={'card__category text-sm font-semibold  text-gray-400 capitalize'}><span>{card.product_category.title.toLowerCase()}</span></div>
	</CardSimpleProduct>);

	return <section className={`section ${styles.container} related`}>
		{props.header && <h2 className={'section__title'}>{props.header}</h2>}
		{props.shortText  ? <div className={`section__shortText`}><TextBlockRenderer text={props.shortText }/></div> : null}
		{/*{text && <div className={`section__text ${styles.text}`}><TextBlockRenderer text={text}/></div>}*/}
		{cardsAr && <div className={`section__cards ${styles.cards}`}>{isGallery ? <Slider maxWidth={"300px"}  items={cardsAr}/> : cardsAr }</div>}
		{/*{media && <div className={`section__media ${styles.media  && styles.media}`}>{media?.mime.indexOf('video') === 0 ? <VideoOnlyClient src={process.env.NEXT_PUBLIC_BACK_URL + media?.url}/> : null }</div>}*/}
		{/*{background && background &&  <div className={`section__media ${styles.media  && styles.media}`}>*/}
		{/*	<Image*/}
		{/*		style={{ objectFit: "cover", width: "100%"}}*/}
		{/*		src={process.env.NEXT_PUBLIC_BACK_URL + background?.url}*/}
		{/*		fill={className === "about"}*/}
		{/*		width={(className !== "about") && background?.width}*/}
		{/*		height={(className !== "about") && background?.height}*/}
		{/*		alt={''}/>*/}
		{/*</div>}*/}
		<SideBar className={"news"}
			links={props.Links}
			// @ts-ignore
			/>
	</section>


}
export default observer(SectionRelated);
