import Heading, {HeadingVariants} from "@/components/ui/Heading";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section, {Main} from "@/components/Section/Section";
import React, { useEffect, useState } from "react";
import CalcSection from "@/components/Calc/Calc";
import {getData} from "@/utils/getData";
import {queryCalcPage} from "@/utils/queries/pageQuery";
import TextBlockRenderer from "@/components/ui/TextBlockRenderer/TextBlockRenderer";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useStore } from "@/store";
import { toJS } from "mobx";
import Link from "next/link";
import { num_plural } from "@/utils/utils";
import { translateText } from "@/utils/translate";
import { ChevronRightSvg } from "@/components/Icons";


const CalcResult = observer((props) => {
    const router = useRouter()
    let store = useStore();
    const result = toJS(store.booksStore.calcResult.data[0])?.result;
    const serie = toJS(store.booksStore.calcResult.data[0])?.series;
    const category = toJS(store.booksStore.calcResult.data[0])?.product_category;
    useEffect(() => {
        console.log(store.booksStore.calc)
        if(store.booksStore.calc.size && store.booksStore.calc.variant) {
            store.booksStore.getResult(router.locale)
        } else {
            store.booksStore.getResult(router.locale)
        }
    }, [store.booksStore, store.booksStore.calc])

    const ResultTable = () => {
        if (result) return <div className={'result__table'}>
            {result.map((item: any) =>
                (<div className={'result__row'} key={item.id}>
                    <h3>{item.place}</h3>
                    <div className={'result__products'}>
                        {item.item.map((subitem) => (
                            <div className={'result__product'}>
                                <div className={'result__material'}>
                                    <Link href={`/catalog/${subitem?.product.slug}`}>{subitem.product.slug}</Link>
                                </div>
                                <div className={'result__thickness'}>
                                    {subitem.thickness}
                                </div>
                                <div className={'result__qty'}>
                                    {num_plural(subitem.quanity)}
                                </div>
                            </div>))}
                    </div>
                </div>))
            }</div>
    }

    return <ResultTable result={result}/>
})

const ResultSection = observer((props: { data: any })  => {
    const store = useStore();
    const router = useRouter()
    const variant = store.booksStore.calc.variant;
    const ar = ['technik', 'noise-control', 'deloud'];

    if(variant) return <Section header={props.data.sections[2].title}
        shortText={props.data.sections[2].shortText}

        text={props.data.sections[2].series[ar.indexOf(variant)].calc_description}
        className={props.data.sections[2].type}>

        <CalcResult/>

        <div className={'calc_series__info'}>
            <div className={'calc_series__header'}>
                <span className={'text-gray-600'}>{translateText("series")}</span>
                <h3>{props.data.sections[2].series[ar.indexOf(variant)].title}</h3>
            </div>

            <Link href={`/catalog/series/${props.data.sections[2].series[ar.indexOf(variant)].slug}`}
                className={'calc_series__link text-primary font-bold inline-flex hover:opacity-70 leading-none'}>{router.locale === "ru" ? "Посмотреть в каталоге" : "Browse the catalog"}
                {/*<ChevronRightSvg  className={'inline'}/>*/}
            </Link>
        </div>
        <div className={'calc_series__annotation'}>
            <p>
            {router.locale === "ru" ? "Материалы и их количество указаны с учётом технологии, рекомендованной заводом «STG Group»." : "The materials and their quantities are specified according to the technology recommended by the \"STG Group\" factory"}
            </p>
        </div>

    </Section>;
})

export default function Calc(props: { data: any }) {
    const store = useStore()
    return (
        <>
            <Main className={'page-calc justify-items-start'}
                breadcrumbs={<Breadcrumbs items={[ { label: props.data.title, path: "/calc", } ]}/>
                }
                headingH1={<>
                    <Heading className={'text-primary'}
                        type={HeadingVariants.h1}
                        text={props.data.title}/>
                    <TextBlockRenderer text={props.data.shortText}/>
                </>}>
                <CalcSection sections={props.data.sections}/>
                <ResultSection data={props.data}/>
            </Main>

        </>
    )
}

export async function getStaticProps(props: {
    locale: string
}) {

    const { data } = await getData(queryCalcPage, {
        locale: props.locale
    });
    return {
        props: {
            locale: props.locale,
            data: data
        },
    }
}
