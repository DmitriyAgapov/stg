import Image from 'next/image';
import React from "react";
import { getData } from "@/utils/getData";
import { pageQuery } from "@/utils/queries/pageQuery";
import Section, { ProdSection } from "@/components/Section/Section";
import dynamic from 'next/dynamic'
import Card from "@/components/Cards/Card";
import testData from '@/utils/testData.json'
import { HeadingVariants } from "@/components/ui/Heading";
import SideBar from "@/components/SideBar";
import useFormattedDate from "@/utils";
import { CardNews } from "@/components/Cards/Card/Card";

// @ts-ignore
const VideoOnlyClient = dynamic((props) => import('@/components/Video'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
})

export default function Home() {
    const {screen, about, products, geography, news} = testData.data.sections;


    return (
    <>
        <Section className={screen.class}
            header={screen.header}
            shortText={screen.shortText}
            // @ts-ignore
            media={<VideoOnlyClient src={screen.media.src}/>}
            cards={screen.cards.map(card =>
                <Card key={card.id}
                    title={card.title}
                    style={card.style}
                    text={card.text}
                    link={card.link}
                    img={card.image}/>)}/>

        <Section className={about.class}
            header={about.header}
            shortText={about.shortText}

            media={<Image style={{
                objectFit: "cover",

            }}
                src={about.media.src}
                fill
                // width={about.media.width}
                // height={about.media.height}
                alt={''}/>}
            cards={about.cards.map(card =>
                <Card key={card.id}
                    title={card.title}
                    style={card.style}
                    link={card.link}
                    img={card.image}/>)}

        />
        <Section className={geography.class}
            header={geography.header}
            shortText={geography.shortText}
            cards={geography.cards.map(card =>
                <Card headingVariant={HeadingVariants.h4}
                    key={card.id}
                    title={card.title}
                    style={card.style}
                    text={card.text}/>)}
            media={<Image src={geography.media}
                alt={''}/>}/>

        <ProdSection className={products.class}
            header={products.header}
            shortText={products.shortText}
            // @ts-ignore
            cards={products.cards.map((i) => ({
                ...i,
                headingVariant: HeadingVariants.h3
            }))}/>
        <Section header={news.header}
            className={news.class}
            isGallery={true}
            cards={news.cards.map((card) => <CardNews key={card.id}
                headingVariant={HeadingVariants.h4}
                img={card.image}
                title={card.title}
                style={card.style}
                link={`/news${card.slug}`}>
                {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
                <div className={'card__date'}>{useFormattedDate(card.publishedTime)}</div>
                <div className={'card__tags'}>{card.tags.map((tag, index) => <span key={index} className={'card__tag'}>{tag.text}</span> )}</div>
            </CardNews>
           )}>

            <SideBar
                className={news.class}
                tags={news.nav.tags}
             nav={news.nav}/>
        </Section>

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
// export async function getServerSideProps(ctx:GetServerSidePropsContext) {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   //
//   // const data = await getData(pageQuery, ctx.locale, {
//   //   id: 3
//   // } );
//
//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//      ...data,
//     },
//   }
// }
