import Heading, { HeadingVariants } from "@/components/ui/Heading";
import { ProductCard } from "@/components/Cards/Card/Card";
import styles from "@/components/Cards/CardProduct/CardProduct.module.scss";
import NextLink from "next/link";
import ImageBlock from "@/components/ui/ImageBlock";
import React from "react";

const CardSimpleProduct = ({ title, series, headingVariant = HeadingVariants.h2, properties, mousePath = true, text, style, img, link, action, locale, ...props }: ProductCard) => {

	return <div className={styles.CardSimpleProduct + " " + 'card' + style}>
		{/*<div className={styles.containerNo + " " + "card__container"}>*/}
			<NextLink className={styles.titleSimple + " " + 'card__title'} as={link ? `/catalog/${properties.category.slug}/${link}` : ''}
				href={link ?? ''}>
				<Heading type={headingVariant}
					text={title}/>
			</NextLink>
			{text &&
			(text[0] === '<') ? <div className={'card__text'}
				dangerouslySetInnerHTML={{ __html: text }}/> : text && <div className={'card__text'}>{text}</div>
			}

			{/*{img && <div className={'card__img'}>{img}</div>}*/}
			<div className={styles.card__imgSimple  + " " + 'card__image'}>
				<ImageBlock sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"}
					// @ts-ignore
					src={img?.url}
					width={img?.width}
					height={img?.height}
					alt={''}/>

				</div>
			{properties?.class &&
				<div className={styles.card__tags + " " + 'card__tags'}>
					<span className={styles.card__tag + " " + 'card__tag'}>{properties.class}</span>
				</div>}
			{properties?.category &&
				<div className={styles.subtitle}>
					<span >{properties.category.title.toLowerCase()}</span>
				</div>}


			{/*{props.children && props.children}*/}
			{/*<ProdProp />*/}
		{/*</div>*/}
		{/*<div className={styles.slidePanel}>*/}

		{/*</div>*/}
	</div>;
}
export default CardSimpleProduct
