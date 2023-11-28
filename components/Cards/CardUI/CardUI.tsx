import styles from './CardUI.module.scss';
import { Card, CardBody } from "@nextui-org/react";
import { CardFooter, CardHeader } from "@nextui-org/card";
import Heading, { HeadingVariants } from "@/components/ui/Heading";
import NextLink from "next/link";
import React from "react";
import ImageBlock from "@/components/ui/ImageBlock";
import { ProductCard } from "@/components/Cards/Card/Card";
import {Image} from "@nextui-org/react";
import NextImage from "next/image";

const CardUI = ({ title, series, headingVariant = HeadingVariants.h2, properties, mousePath = true, text, style, img, link, action, locale,  ...props }: ProductCard) => {
    console.log('img',properties)
    return <Card className={styles.CardUI} {...props} radius={"none"} shadow={"none"}>
        <CardHeader>
         <div className={styles.card__img}>
                    <ImageBlock sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"}
                        // @ts-ignore

                        as={NextImage}
                        src={img?.url}
                        width={img?.width}
                        height={img?.height}
                        alt={''}/>

                </div>

        </CardHeader>
        <CardBody>
            <NextLink className={styles.title + " " + 'card__title'}
                href={link ?? ''}>
                <Heading type={headingVariant}
                    text={title}/>
            </NextLink>
        </CardBody>
        <CardFooter>
            {properties?.class &&
                <div className={styles.card__tags + " " + 'card__tags'}>
                    <span className={styles.card__tag + " " + 'card__tag'}>{props.class}</span>
                </div>}
        </CardFooter>
    </Card>;
};

export default CardUI;
