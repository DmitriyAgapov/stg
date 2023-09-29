import styles from './Card.module.css';
import NextLink from "next/link";
import React, { ReactNode, useEffect } from "react";
import { configStore } from "@/store/configStore";
import Image, { StaticImageData } from "next/image";
import { useStore } from "@/store";
import books, { imageBgProps } from "@/store/Books";
import { observer } from "mobx-react-lite";
import { ArrowRightSvg } from "@/components/Icons";
import Heading, { HeadingVariants } from "@/components/ui/Heading";

export interface CardParams {
	image?: ReactNode | imageBgProps
	link?: string;
	text?: string;
	style?: string;
	title?: string ;
	img?: ReactNode | imageBgProps
	children?: ReactNode | imageBgProps
	action?: any
	mousePath?: boolean
	key?: string
	id?: string
	headingVariant?: HeadingVariants
}


const Card = observer(({title, headingVariant = HeadingVariants.h2, mousePath = true, key, text, style, img, link, action, ...props }: CardParams) => {
	let store = useStore()
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

	return <div className={styles.container + " " + 'card' + style} onMouseLeave={() => store.booksStore.setImageBg(null)}  onMouseOver={() => store.booksStore.setImageBg(img)} onMouseEnter={(event) => handleAnimation(event)}>
		<span></span>
		{link ? <NextLink className={'card__title'} href={link}>
			<Heading type={headingVariant}>{title}</Heading>
			<ArrowRightSvg />
		</NextLink> : 	<Heading type={headingVariant}  className={'card__title'}>{title}</Heading>}
		{text &&
			(text[0] === '<') ? <div className={'card__text'} dangerouslySetInnerHTML={{ __html: text}}/> : text && <div className={'card__text'}>{text}</div>
		}

		{/*{img && <div className={'card__img'}>{img}</div>}*/}
		{img && (
			// @ts-ignore
			img.src && <div className={'card__img'}>
			<Image
				// @ts-ignore
				src={img.src} width={img.width} height={img.height} alt={''} />
		</div>)}
		{props.children && props.children}

	</div> ;
})
export const CardNews = ({title, headingVariant = HeadingVariants.h2, mousePath = true, key, text, style, img, link, action, ...props } :CardParams) => {

	if (text != null) {
		console.log(text[0] === '<')
	}
	return <div className={styles.container + " " + 'card' + style}>

		{link && <NextLink className={'card__title'} href={link}>
			<Heading type={headingVariant}>{title}</Heading>

		</NextLink>}
		{text &&
			(text[0] === '<') ? <div className={'card__text'} dangerouslySetInnerHTML={{ __html: text}}/> : text && <div className={'card__text'}>{text}</div>
		}

		{/*{img && <div className={'card__img'}>{img}</div>}*/}
		{img && (
			// @ts-ignore
			img.src && <div className={'card__img'}>
			<Image
				// @ts-ignore
				src={img.src} width={img.width} height={img.height} alt={''} />
		</div>)}
		{props.children && props.children}

	</div> ;
}

export default Card;
