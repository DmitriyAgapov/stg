import styles from './CardDefault.module.scss';
import NextLink from "next/link";
import Heading, { HeadingVariants } from "@/components/ui/Heading";
import { ArrowRightSvg } from "@/components/Icons";
import Image from "next/image";
import React from "react";
import { CardParams } from "@/components/Cards/Card/Card";
import Blocks from "editorjs-blocks-react-renderer";

const CardDefault = ({title, headingVariant = HeadingVariants.h2, mousePath = true,  text, style, img, link, action = false, imglogo, ...props }: CardParams) => {

    return <div className={'card' + style}>

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

};

export default CardDefault;
