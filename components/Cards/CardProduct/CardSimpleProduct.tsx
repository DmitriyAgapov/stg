import Heading, { HeadingVariants } from "@/components/ui/Heading";
import { ProductCard } from "@/components/Cards/Card/Card";
import styles from "@/components/Cards/CardProduct/CardProduct.module.scss";
import NextLink from "next/link";
import Image from "next/image";
import ImageBlock from "@/components/ui/ImageBlock";
import StgButton from "@/components/ui/StgButton";
import React from "react";

const CardSimpleProduct = ({ title, series, headingVariant = HeadingVariants.h2, properties, mousePath = true, text, style, img, link, action, locale, ...props }: ProductCard) => {

	return <div className={styles.card + " " + 'card' + style}>
		{/*<div className={styles.containerNo + " " + "card__container"}>*/}
			<NextLink className={styles.title + " " + 'card__title'}
				href={link ?? ''}>
				<Heading type={headingVariant}
					text={title}/>
			</NextLink>
			{text &&
			(text[0] === '<') ? <div className={'card__text'}
				dangerouslySetInnerHTML={{ __html: text }}/> : text && <div className={'card__text'}>{text}</div>
			}

			{/*{img && <div className={'card__img'}>{img}</div>}*/}
			{img ? (
				// @ts-ignore
				img.url && <div className={styles.card__img}>
					<Image sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"}
						// @ts-ignore
						src={process.env.NEXT_PUBLIC_BACK_URL + img.url}
						width={img.width}
						height={img.height}
						alt={''}/>

				</div>) : <div className={styles.card__img}><ImageBlock /></div>}
			{properties?.class &&
				<div className={styles.card__tags + " " + 'card__tags'}>
					<span className={styles.card__tag + " " + 'card__tag'}>{properties.class}</span>
				</div>}


			{/*{props.children && props.children}*/}
			{/*<ProdProp />*/}
		{/*</div>*/}
		{/*<div className={styles.slidePanel}>*/}

		{/*</div>*/}
	</div>;
}
export default CardSimpleProduct
