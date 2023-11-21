import styles from '@/components/Cards/CardProduct/CardProduct.module.scss';
import Heading, { HeadingVariants } from "@/components/ui/Heading";
import NextLink from "next/link";
import Image from "next/image";
import React from "react";
import { CardParams, ProductCard } from "@/components/Cards/Card/Card";
import { translateText } from "@/utils/translate";
import ImageBlock from "@/components/ui/ImageBlock";
import { useRouter } from "next/router";
import { Util } from "leaflet";
import indexOf = Util.indexOf;
import { translateIt } from "@/utils/utils";
import StgButton from "@/components/ui/StgButton";
interface ItemPropertiesProps {
    label: string
    id: string
    size: string
    thickness: number
    quanity_in_box: number
    sqrt: number
    weight: string
    specific_weight: number
    kmp: number
    adhesion: number
    temp: string
    values: any[] | {
        title: string
    }
}
export function ItemProperties({ items, label }: { items: any, label: string }) {

    const restrictedComma = ["thickness", "sqrt", "quanity_in_box"]

    if(items && items.values) return <dl className={styles.card__prop + " " + "card__properties "  + (restrictedComma.indexOf(label) === -1 ? " card_not_inbox" : "")}>
        <dt className={styles.card__dt + " " + "card__dt"}>{translateText(label)}</dt>
        <dd className={styles.card__dd + " " + "card__dd "}>
            {items.length > 0 && items.map((value:any, index:number) => {
                return <span key={index}
                className={label === "thickness" || label === "sqrt" || label === "quanity_in_box" ?  styles.properties_checkbox_inset : undefined}>
                {`${translateText(value)} ${(restrictedComma.indexOf(label) === -1) ? ((index < items.length - 1) ? ',' : '') : ""} `}
            </span>})}
        </dd>
    </dl>;
}


const CardProduct = ({ title, series, headingVariant = HeadingVariants.h2, properties, mousePath = true, text, style, img, link, action, locale, ...props }: ProductCard) => {


    const Places = ({values, label} : any) => {
        return <ItemProperties items={values} label={label} key={'places'} />
    }
    const Series = ( {values, label}:any) => {

        return <ItemProperties items={values} label={label} key={'places'} />
    }
    const Type = ( {values, label}:any) => {
        return <ItemProperties items={values} label={label}
             key={'type'} />
    }
    const Thickness = ( items: {values: any, label: string}) => {
        return <ItemProperties
            items={items.values.reduce((accamulator: any, currentValue: any) => [...accamulator, currentValue["thickness"]],[] )}
            label={'thickness'}
            key={'thickness'} />}

    const Sizes = () => <ItemProperties items={[`${properties.variants[0]?.size}`]} label={'size'} key={'size'} />

    return <div className={styles.card + " " + 'card' + style}>
        <div className={styles.containerNo + " " + "card__container"}>
            <NextLink className={styles.title + " " + 'card__title'}
                as={link ? `/catalog/${properties.type.slug}/${link}` : ''}
                href={link ?? ''}
            >
                <Heading type={headingVariant}
                    text={series && series.length > 0 ? series[0].title + " " +  title : title}/>
            </NextLink>
            {text &&
            (text[0] === '<') ? <div className={'card__text'}
                dangerouslySetInnerHTML={{ __html: text }}/> : text && <div className={'card__text'}>{text}</div>
            }

            {/*{img && <div className={'card__img'}>{img}</div>}*/}
          <div className={styles.card__img}>
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
            <div className={styles.properties}>
                {series && <Series values={[series[0].title]}
                    label={'series'}
                />}
                {properties && properties.type && <Type values={properties.type ? [properties.type.title] : undefined}
                    label={'type'}
                />}
                { properties && properties.variants.length > 0 && <Thickness values={properties.variants}
                    label={'thickness'}/>}
                { properties && properties.place &&  <Places values={properties.place}
                    label={'place'} />}
                { properties && properties.variants.length > 0 && <Sizes />}
                <StgButton as={NextLink}
                    className={styles.button}
                    color="outline"
                    size={"md"}
                    href={{ pathname: '/catalog/[category]/[slug]', query: { category: properties.type.slug, slug: link } }}

                    variant={'outline'}>
                    Подробнее
                </StgButton>

            </div>

            {/*{props.children && props.children}*/}
            {/*<ProdProp />*/}
        </div>
        {/*<div className={styles.slidePanel}>*/}

        {/*</div>*/}
    </div>;
}
export default CardProduct;
