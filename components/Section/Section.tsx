import styles from './Section.module.scss';
import React, { JSX, ReactElement, ReactNode } from "react";
import Slider from "@/components/Slider";
import NextSectionLink from "@/components/ui/NextSectionLink/NextSectionLink";
import { SliderProduct } from "@/components/Slider/SliderProduct/SliderProduct";
import Blocks from "editorjs-blocks-react-renderer";
import dynamic from "next/dynamic";
import Card from "@/components/Cards/Card";
import { HeadingVariants } from "@/components/ui/Heading";
import Image from 'next/image';
import CardProduct from "@/components/Cards/CardProduct";
import { useRouter } from "next/router";
import TextBlockRenderer from "@/components/ui/TextBlockRenderer/TextBlockRenderer";
import { ImageDefault } from '../Cards/Card/Card';
import FormQuestions from "@/components/Form";
import SectionNews from "@/components/Section/SectionNews";
import SectionRelated from "@/components/Section/SectionRelated";
import { CalcCard, CalcCardVariant } from "@/components/Calc/Calc";
import StgButton from "@/components/ui/StgButton";
import NextLink from "next/link";
import { CardBox, CardsListWithCounter } from "@/components/Cards/CardSimple/CardSimple";
import CardProductSmallCard from "@/components/Cards/CardProduct/CardProductSmallCard";
// @ts-ignore
const VideoOnlyClient = dynamic((props) => import('@/components/Video'), {
	ssr: false,
	loading: () => <p>Loading...</p>,
})

export interface SectionProps {
	isGallery?: boolean
	nextLink?: boolean
	children?: ReactNode | ReactElement | string | number | JSX.Element
	header?: string | ReactElement | ReactNode
	upTitle?: string | ReactElement | ReactNode
	breadcrumbs?: ReactNode
	sidebar?: ReactNode
	headingH1?: ReactNode
	shortText?: string | ReactNode
	text?: string | ReactNode
	cards?: any
	series?: any
	indexEl?: number
	Links?: any[]
	products?: any[]
	className?: string
	id?: string
	media?: ReactNode | {

		name: string
		mime?: string
		url?: string
	}
	background?: {

		url: string
		width: number
		height: number
	}
	action?: any

}


const Section = ({ header, Links, children, breadcrumbs, indexEl, id, nextLink = false, headingH1, shortText, media, background, text, cards, action, className = "", sidebar, isGallery = false, ...props }: SectionProps) => {
	const cardsAr = [];
	const router = useRouter()
	const childrenArray = [ children ];

	switch (className) {
		case 'screen':
			cardsAr.push(props.series.map((card: { id: string; title: string | undefined; description: any; slug: string; imglogo: ImageDefault | undefined; }) =>
				<Card key={card.id}
					title={card.title}
					style={' HOVER'}
					text={card.description}
					link={'/catalog/series/' + card.slug}
					img={card.imglogo}/>))
			break;

		case 'about':
			cards.forEach((c: { id: React.Key | null | undefined; text: string | undefined; link: string | undefined; image: ImageDefault | undefined; }) => cardsAr.push(
				<Card key={c.id}
					headingVariant={HeadingVariants.h3}
					title={c.text}
					style={' about-card HOVER'}
					link={c.link}
					action={false}
					img={c.image}/>)
			)
			break;

		case 'geography':
			cards.forEach((c:any) => cardsAr.push(
				<Card headingVariant={HeadingVariants.h4}
					key={c.id}
					title={c.text}
					style={" geography__card"}
					text={c.description}/>));
			break;

		case 'page-serie':
			cards.forEach((i: any) => {
				cardsAr.push(
					<CardProduct style={"-product  product__card"}
						title={i.title}
						key={i.id}
						// @ts-ignore
						locale={router.locale}
						properties={{
							variants: i.variants,
							class: i.class,
							place: i.place,
							type: i.product_category
						}}
						series={i.series}
						headingVariant={HeadingVariants.h3}
						img={i.images[0]}
						link={i.slug}>
					</CardProduct>)
			});
			break;
		case 'products':
			props.products?.forEach((i:any) => {
				cardsAr.push(<CardProductSmallCard title={i.title}
						key={i.id}
						// @ts-ignore
						style={' card_vertical card-product'}
						properties={{
							variants: i.variants,
							class: i.class,
							place: i.place,
							type: i.product_category
						}}
						series={i.series}
						headingVariant={HeadingVariants.h3}
						img={i.images[0]}
						link={i.slug}/>)})

		case 'page-catalog-category':
			cards.forEach((i: any) => {
				cardsAr.push(
					<CardProduct style={"-product  product__card"}
						title={i.title}
						key={i.id}
						// @ts-ignore
						locale={router.locale}
						properties={{
							variants: i.variants,
							class: i.class,
							place: i.place,
							type: i.product_category
						}}
						series={i.series.length > 0 ? i.series : undefined}
						headingVariant={HeadingVariants.h3}
						img={i.images[0]}
						link={i.slug}

					>
					</CardProduct>)
			});
			break;
			console.log(Links)
		case 'news':
			return <SectionNews className={'news'}
				Links={Links}
				header={header}
				cards={cards}/>

		case 'related':
			return <SectionRelated className={'related'}
				shortText={shortText}
				Links={Links}
				header={header}
				cards={props.products}/>


		case 'form_questions':
			childrenArray.push(<FormQuestions/>);
			break;

		case 'parternership_one':
			cards.forEach((i: any) => {
				cardsAr.push(
					<CardBox title={i.text}
						text={i.description}
						key={i.id}/>
				)
			});

			break;

		case 'parternership_two':
			cardsAr.push(<CardsListWithCounter ar={cards}/>)
			break;

		case 'calc_car_class':
			cards.forEach((i: any) => {
				cardsAr.push(
					<CalcCard key={i.id}
						size={i}/>
				)
			});
			break;

		case 'calc_series':
			cards.forEach((i: any) => {
				cardsAr.push(
					<CalcCardVariant key={i.id}
						variant={i}/>)
			});
			break;
	}
	return (
		<section className={`section ${styles.container} ${className}`} id={id}>
			{breadcrumbs && breadcrumbs}
			{nextLink && <NextSectionLink indexEl={indexEl}/>}
			{headingH1 && headingH1}
			{sidebar && sidebar}
			{header && <h2 className={'section__title'}>{header}</h2>}
			{shortText ? <div className={`section__shortText`}><TextBlockRenderer text={shortText}/></div> : null}
			{text && <div className={`section__text ${styles.text}`}><TextBlockRenderer text={text}/></div>}
			{(cardsAr && cardsAr.length > 0) && <div className={`section__cards ${styles.cards}`}>{isGallery ? <Slider items={cardsAr}/> : cardsAr}</div>}
			{media && <div className={`section__media ${styles.media && styles.media}`}>

				{
					// @ts-ignore
					media?.mime.indexOf('video') === 0 ?
				<VideoOnlyClient
					// @ts-ignore
					src={process.env.NEXT_PUBLIC_BACK_URL
					// @ts-ignore
					+ media?.url}/> : null}</div>}
			{background && background &&
				// @ts-ignore
				<div className={`section__media ${styles.media && styles.media}`}>
				<Image style={{ objectFit: "cover", width: "100%" }}
					src={process.env.NEXT_PUBLIC_BACK_URL + background?.url}
					fill={className === "about"}
					// @ts-ignore
					width={(className !== "about") && background?.width}
					// @ts-ignore
					height={(className !== "about") && background?.height}
					alt={''}/>
			</div>}
			{childrenArray}
		</section>
	);
};

export const Main = ({ children, sidebar, upTitle, indexEl, header, breadcrumbs, headingH1, Links, nextLink = false, shortText, media, text, cards, action, className = "", isGallery = false }: SectionProps) => {
	const AllLinks = () => Links && Links.length > 0 && <div className={"page__links flex gap-4 col-span-full flex-wrap"}> {Links.map((l) => <StgButton as={NextLink}
		className={"flex-auto"}
		key={'button' + l.id}
		size={"sm"}
		variant={"darkOutline"}
		color={"outline"}
		href={l.url}>{l.text}</StgButton>)}</div>

	// @ts-ignore
	// @ts-ignore
	return (
		<main className={`${styles.mainPage + " " + " "} ${className}`}>
			{breadcrumbs && breadcrumbs}
			{nextLink && <NextSectionLink indexEl={indexEl}/>}
			{upTitle && <div className={'section__upTitle'}>{upTitle}</div>}
			{headingH1 && <div className={'section__title'}>{headingH1}</div>}
			{sidebar && sidebar}
			{header && <h2 className={'section__title'}>{header}</h2>}
			{shortText && <div className={`section__shortText ${styles.shortText}`}>
				<Blocks
					// @ts-ignore
					data={JSON.parse(shortText)}/></div>}
			<AllLinks/>
			{text &&
				<div className={`section__text ${styles.text}`}>
					<Blocks
						// @ts-ignore
						data={JSON.parse(text)}/>
				</div>}
			{(cards && cards.length > 0) && <div className={`section__cards ${styles.cards}`}>{isGallery ? <Slider items={cards}/> : cards}</div>}
			{media
				// @ts-ignore
				&& <div className={`section__media ${styles.media}`}>{media}</div>}
			{children && children}

		</main>
	);
};

export const MainProduct = ({ children, sidebar, upTitle, header, breadcrumbs, headingH1, nextLink = false, shortText, media, text, cards, action, className = "", isGallery = false }: SectionProps) => {

	return (
		<main className={`${styles.mainProduct} ${className}`}>
			{breadcrumbs && breadcrumbs}
			{nextLink && <NextSectionLink/>}
			{upTitle && <div className={'section__upTitle'}>{upTitle}</div>}
			{headingH1 && <div className={'section__title'}>{headingH1}</div>}
			{sidebar && sidebar}
			{header && <h2 className={'section__title'}>{header}</h2>}
			{shortText && typeof shortText == "string" ?
				<div className={`section__shortText ${styles.shortText}`}
					dangerouslySetInnerHTML={{ __html: shortText }}/> : shortText && <div className={`section__shortText ${styles.shortText}`}>{shortText}</div>} {text &&
			<div className={`section__text ${styles.text}`}
				dangerouslySetInnerHTML={{ __html: text }}/>}
			{cards && <div className={`section__cards ${styles.cards}`}>
				<div className={`section__cards_wrapper`}><SliderProduct items={cards}/></div>
			</div>}
			{media &&
				// @ts-ignore
				<div className={`section__media ${styles.media}`}>{media}</div>}
			{children && children}
		</main>
	);
};


export const SectionClean = ({ children, header, media, shortText, text, cards, className = "" }: SectionProps) => {
	return (
		<section className={`section ${styles.container} ${className}`}>
			{header && header}
			{shortText && shortText}
			{text && text}
			{cards && cards}
			{children && children}
			{media && media}

		</section>
	);
};

export default Section;
