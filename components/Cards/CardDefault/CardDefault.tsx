import styles from './CardDefault.module.scss';
import NextLink from "next/link";
import Heading, { HeadingVariants } from "@/components/ui/Heading";
import { ArrowRightSvg } from "@/components/Icons";
import Image from "next/image";
import React from "react";
import { CardParams } from "@/components/Cards/Card/Card";

const CardDefault = ({title, headingVariant = HeadingVariants.h2, mousePath = true,  text, style, img, link, action = false, imglogo, ...props }: CardParams) => {

    return <div className={'card' + style}>

        {link ? <NextLink className={'card__title'} href={link}>
            <Heading type={headingVariant} text={title}/>
            <ArrowRightSvg />
        </NextLink> : title && <Heading type={headingVariant}  className={'card__title'} text={title}/>}
        {text &&
        (text[0] === '<') ? <div className={'card__text'} dangerouslySetInnerHTML={{ __html: text}}/> : text && <div className={'card__text'}>{text}</div>
        }

        {/*{img && <div className={'card__img'}>{img}</div>}*/}

        {img && (
            // @ts-ignore

            img.url && <div className={'card__img'}>
                <Image
                    // @ts-ignore
                    src={process.env.NEXT_PUBLIC_BACK_URL + img.url} width={img.width} height={img.height} alt={''} />
            </div>)}



        {props.children && props.children}

    </div> ;

};

export default CardDefault;
