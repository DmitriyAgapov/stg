import styles from '@/components/Cards/CardProduct/CardProduct.module.scss';
import Heading, { HeadingVariants } from "@/components/ui/Heading";
import NextLink from "next/link";
import Image from "next/image";
import React from "react";
import { CardParams, ProductCard } from "@/components/Cards/Card/Card";
import { translateText } from "@/utils/translate";
import ImageBlock from "@/components/ui/ImageBlock";

const CardProduct = ({ title, series, headingVariant = HeadingVariants.h2, properties, mousePath = true, text, style, img, link, action, locale, ...props }: ProductCard) => {

    function mapProps() {
        const newAr = new Map();
        if(properties) {
            for (let i = 0; properties.length > i; i++) {
                for (const key in properties[i]) {
                    let propslist: any = []
                    let groupBy = properties.reduce((accumulator, currentValue) => [ ...accumulator, currentValue[key] ],
                        propslist);

                    newAr.set(key, {
                        "heading": translateText(key, locale),
                        "propslist": groupBy.indexOf(null) !== 0 ? groupBy : []
                    })
                }
            }
            newAr.delete('id')
            newAr.delete('property')
            newAr.delete('quanity_in_box')
            newAr.delete('sqrt')
            newAr.delete('weight')
            newAr.delete('specific_weight')
            newAr.delete('kmp')
            newAr.delete('temp')
            newAr.delete('adhesion')
        }
        return newAr

    }

    const propsMap = mapProps();

    const ProdProp = () => {
        const arr: React.JSX.Element[] = [];
        propsMap.forEach((value, key, map) => {
                if (value.propslist.length > 0)
                    arr.push(
                        <dl key={key}
                            className={styles.card__prop + " " + 'card__properties'}>
                            <dt className={styles.card__dt + " " + 'card__dt'}>{value.heading}</dt>
                            {key === 'size' ? <dd className={styles.card__dd + " " + 'card__dd' + ' '}>
                            <span key={'one' + key}
                                className={''}>{value.propslist[0]}</span></dd> :
                                <dd className={styles.card__dd + " " + 'card__dd' + ' ' + styles[`properties-checkbox_inset`]}>{value.propslist.map((li: any, index: number) =>
                                    <span key={index}
                                        className={''}>{li}</span>,)}</dd>
                            }</dl>)
            }
        )
        arr.push()
        return <div className={styles.properties}>{arr}</div>
    }


    return <div className={styles.card + " " + 'card' + style}>
        <div className={styles.containerNo + " " + "card__container"}>
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
                img.url && <div className={'card__img'}>
                    <Image sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"}
                        // @ts-ignore
                        src={process.env.NEXT_PUBLIC_BACK_URL + img.url}
                        width={img.width}
                        height={img.height}
                        alt={''}/>

                </div>) : <ImageBlock />}
            {series && series.type &&
                <div className={styles.card__tags + " " + 'card__tags'}>
                    <span className={styles.card__tag + " " + 'card__tag'}>{series.type}</span>
                </div>}


            {props.children && props.children}
            {/*<ProdProp/>*/}
        </div>
        {/*<div className={styles.slidePanel}>*/}

        {/*</div>*/}
    </div>;
}
export default CardProduct;
