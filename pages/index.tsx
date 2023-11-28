import React from "react";
import Section from "@/components/Section/Section";
import { getData } from "@/utils/getData";
import {  queryMainPage } from "@/utils/queries/pageQuery";
import { HeadingVariants } from "@/components/ui/Heading";
import CardProductSmallCard from "@/components/Cards/CardProduct/CardProductSmallCard";
export default function Home(props:any) {
    const related = props.data.sections.filter((sect:any) => sect.type === 'products')

    return (
        <>
            {props.data.sections.map((section:any, index: number) => {

                return <Section
                    key={section.id}
                    className={section.type}
                    header={section.title}
                    shortText={section.shortText}
                    nextLink={section.nextLink}
                    indexEl={index == 0 ? 1 : undefined}
                    products={section.products}
                    // @ts-ignore
                    Links={section.Links}
                    media={section.media}
                    cards={section.cards}
                    series={section.series}
                    background={section.background}
                />
            })}
            <section className={'section Section_container__mkPCF'}></section>

            {/*<Section className={about.class}*/}
            {/*    header={about.header}*/}
            {/*    shortText={about.shortText}*/}

                {/*media={<Image style={{*/}
                {/*    objectFit: "cover",*/}

                {/*}}*/}
                {/*    src={about.media.src}*/}
                {/*    fill*/}
                {/*    // width={about.media.width}*/}
                {/*    // height={about.media.height}*/}
                {/*    alt={''}/>}*/}
            {/*    cards={about.cards.map(card =>*/}
            {/*        <Card key={card.id}*/}
            {/*            headingVariant={HeadingVariants.h2}*/}
            {/*            title={card.title}*/}
            {/*            style={card.style}*/}
            {/*            link={card.link}*/}
            {/*            action={false}*/}
            {/*            img={card.image && card.image }/>)}*/}

            {/*/>*/}
            {/*<Section className={geography.class}*/}
            {/*    header={geography.header}*/}
            {/*    shortText={geography.shortText}*/}
            {/*    cards={geography.cards.map(card =>*/}
            {/*        <Card headingVariant={HeadingVariants.h4}*/}
            {/*            key={card.id}*/}
            {/*            title={card.title}*/}
            {/*            style={card.style}*/}
            {/*            text={card.text}/>)}*/}
            {/*    media={<Image src={geography.media}*/}
            {/*        alt={''}/>}/>*/}

            {/*<ProdSection className={'products'}*/}
            {/*    header={'Каталог Продукции'}*/}
            {/*    // shortText={products.shortText}*/}
            {/*    // @ts-ignore*/}

            {/*    cards={products.cards.map((i) => ({*/}
            {/*        ...i,*/}
            {/*        headingVariant: HeadingVariants.h3*/}
            {/*    }))}*/}
            {/*/>*/}
            {/*<Section*/}
            {/*    header={testData.data.sections.news.header}*/}
            {/*    className={"news"}*/}
            {/*    isGallery={true}*/}
            {/*    cards={testData.data.sections.news.cards.map((card) => <CardNews key={card.id}*/}
            {/*        headingVariant={HeadingVariants.h4}*/}
            {/*        img={card.image}*/}
            {/*        title={card.title}*/}
            {/*        style={card.style}*/}
            {/*        link={`/news${card.slug}`}>*/}
            {/*        /!* eslint-disable-next-line react-hooks/rules-of-hooks *!/*/}
            {/*        <div className={'card__date'}>{useFormattedDate(card.publishedTime)}</div>*/}
            {/*        <div className={'card__tags'}>{card.tags.map((tag, index) => <span key={index} className={'card__tag'}>{tag.text}</span> )}</div>*/}
            {/*    </CardNews>*/}
            {/*   )}>*/}

            {/*    <SideBar*/}
            {/*        className={testData.data.sections.news.class}*/}
            {/*        tags={testData.data.sections.news.nav.tags}*/}
            {/*     nav={testData.data.sections.news.nav}/>*/}
            {/*</Section>*/}
            {/*<Section*/}
            {/*    className={'form-questions margintop'}*/}
            {/*    header={'Остались вопросы?'}*/}
            {/*    // shortText={'Напишите нам, с Вами свяжутся в течении нескольких часов. Мы знаем ответ на ваш вопрос'}*/}
            {/*    >*/}
            {/*    <FormQuestions />*/}
            {/*</Section>*/}
            {/*<SectionClean className={'screen'}*/}
            {/*    header={<h1>Идеальная шумоизоляция<span>для комфорта в вашем авто</span></h1>}*/}
            {/*    shortText={'Мы знаем все про то, как сделать ваш автомобиль максимально тихим и комфортным.'}*/}
            {/*    media={<VideoOnlyClient/>}*/}
            {/*    cards={[*/}
            {/*    <Card*/}
            {/*        key={'card1'}*/}
            {/*        title={'Technik'}*/}
            {/*        text={'Высокоэффективный многослойный материал нового поколения, созданный на основе газонаполненного полиэтилена.'}*/}
            {/*        link={'#'}*/}
            {/*    />, <Card*/}
            {/*            key={'card2'}*/}
            {/*            title={'Noise Сontrol'}*/}
            {/*            text={'Эластичный самоклеящийся материал, состоящий из полимерного слоя, защищённого антиадгезионной плёнкой и алюминиевой фольгой с тиснением.'}*/}
            {/*            link={'#'}*/}
            {/*        />, <Card*/}
            {/*            key={'card3'}*/}
            {/*            title={'Deloud'}*/}
            {/*            text={'Трёхслойная конструкция, состоящую из алюминиевой фольги с тиснением и полимерного слоя, защищённого антиадгезионной бумагой.'}*/}
            {/*            link={'#'}*/}
            {/*        />]}*/}

            {/*/>*/}
        </>
    )
}

export async function getStaticProps(props: { locale: string}) {
    const { data }  = await getData(queryMainPage, {
        locale: props.locale
    });

    return {
        props: {
            locale: props.locale,
            data: data
        },
    }
}
