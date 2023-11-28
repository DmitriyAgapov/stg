import styles from './Card.module.css';
import NextLink from "next/link";
import React, { ReactNode, useEffect, useState } from "react";
import { configStore } from "@/store/configStore";
import Image, { StaticImageData } from "next/image";
import { useStore } from "@/store";
import books, { imageBgProps } from "@/store/Books";
import { observer } from "mobx-react-lite";
import { ArrowRightSvg } from "@/components/Icons";
import Heading, { HeadingVariants } from "@/components/ui/Heading";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Blocks from "editorjs-blocks-react-renderer";
import { I18NConfig } from "next/dist/server/config-shared";
import TextBlockRenderer from "@/components/ui/TextBlockRenderer/TextBlockRenderer";
import ImageBlock from "@/components/ui/ImageBlock";
export interface ImageDefault  {

	id?: string

	width: number
	height: number
	url?: string
	src?: string


}
export interface CardParams {
	image?: StaticImport | string | imageBgProps | undefined | null | ReactNode
	imglogo?: ReactNode | imageBgProps | StaticImport
	link?: string;
	text?: string | any;
	style?: string;
	description?: string;
	title?: string ;
	slug?: string ;
	img?:  any
	children?: ReactNode | imageBgProps
	action?: any
	mousePath?: boolean
	locale?: string
	id?: string
	headingVariant?:  HeadingVariants
}
export interface ProductCard extends CardParams {
	class?: string
	series?: {
		title: string,
		slug: string,
		id: string,
		type: string,
		images: {
			data: {attributes: {
					url: string,
					width: number,
					height: number
				}}[]

		}
	} | any
	properties?: any
}

const Card = observer(({id, title, headingVariant = HeadingVariants.h2, mousePath = true,  text, style, img, link, action = false, imglogo, ...props }: CardParams) => {
	let store = useStore()
	// console.log('222', process.env.NEXT_PUBLIC_BACK_URL + img?.data?.attributes.url)
	const handleAnimation = (event: React.MouseEvent<HTMLDivElement>) => {
		const ANIMATEDCLASSNAME = "animated";


		let addAnimation = false;
		const element = event.target;

		if(element && mousePath) {
			// @ts-ignore
			const ELEMENTS_SPAN = event.target.querySelector('span');
			// @ts-ignore
			if (element && element.classList[1] == "FLASH") {
				element.addEventListener("animationend", e => {
					// @ts-ignore
					element.classList.remove(ANIMATEDCLASSNAME);
				});
				addAnimation = true;
			}

			if(element && ELEMENTS_SPAN) {
				element.addEventListener("mouseover", e => {
					// @ts-ignore
					ELEMENTS_SPAN.style.left = e.pageX - element.offsetLeft + "px";
					// @ts-ignore
					ELEMENTS_SPAN.style.top = e.pageY - element.offsetTop + "px";

					// Add an animation-class to animate via CSS.
					// @ts-ignore
					if (addAnimation) element.classList.add(ANIMATEDCLASSNAME);
				});

				element.addEventListener("mouseout", e => {
					// @ts-ignore
					ELEMENTS_SPAN.style.left = e.pageX - element.offsetLeft + "px";
					// @ts-ignore
					ELEMENTS_SPAN.style.top = e.pageY - element.offsetTop + "px";
				});
			}
		}
	}
	// @ts-ignore
	return <div className={styles.container + " " + 'card' + style}   onMouseLeave={() => {
		// console.log('over')
		store.booksStore.setActveImageBgIndex("")
	}} onMouseEnter={(event) => {
		// @ts-ignore
		action && store.booksStore.setActveImageBgIndex(img.id)
		handleAnimation(event)
	}}>
		<span></span>
		{link ? <NextLink className={'card__title'} href={link}>
			<Heading type={headingVariant} text={title}/>
			<ArrowRightSvg />
		</NextLink> : title && <Heading type={headingVariant}  className={'card__title'} text={title}/>}
		{text && <div className={'card__text'}><Blocks data={JSON.parse(text)}/></div>}
		{img && img.url && (
			// @ts-ignore
			img.url && <div className={'card__img'}>
			<Image
				// @ts-ignore
				src={process.env.NEXT_PUBLIC_BACK_URL + img.url} width={img.width} height={img.height} alt={''} />
		</div>)}
		{imglogo && (
			// @ts-ignore
			imglogo.url && <div className={'card__imglogo absolute top-0 bottom-4 flex right-4'}>
			<Image
				// @ts-ignore
				className={'relative my-auto'} src={process.env.NEXT_PUBLIC_BACK_URL + imglogo.url} width={imglogo.width} height={imglogo.height} alt={''} />
		</div>)}


		{props.children && props.children}

	</div> ;
})
export const CardNews = ({title, headingVariant = HeadingVariants.h2, mousePath = true,  text, style, img, link, action, ...props } :CardParams) => {

	if (text != null) {
		console.log(text[0] === '<')
	}
	return <div className={styles.container + " " + 'card' + style}>

		{link && <NextLink className={'card__title'} href={link}>
			<Heading type={headingVariant} text={title} />

		</NextLink>}
		{text &&
			<div className={'card__text'}><TextBlockRenderer text={text}/></div>
		}

		{/*{img && <div className={'card__img'}>{img}</div>}*/}
		{img && (
			img.url && <div className={'card__img'}>
			<ImageBlock src={img.url} width={img.width} height={img.height} alt={''} />
		</div>)}
		{props.children && props.children}

	</div> ;
}

export default Card;
