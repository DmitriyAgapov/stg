import styles from './Section.module.scss';
import { ReactElement, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { observer } from "mobx-react-lite";
import Card from "@/components/Cards/Card";
import { useStore } from "@/store";
import { CardParams } from "@/components/Cards/Card/Card";
import Slider from "@/components/Slider";

interface SectionProps  {
	isGallery?: boolean
	children?: ReactNode
	header?: string | ReactElement | ReactNode
	shortText?: string | ReactNode
	text?: string | ReactNode
	cards?: ReactNode
	className? : string
	media?: ReactNode
	action?: any

}

const Section = ({ children, header, shortText, media, text, cards, action, className = "", isGallery = false }: SectionProps) => {
	return (
		<section className={`section ${styles.container} ${className}`}>
			{header && <h2 className={'section__title'}>{header}</h2>}
			{shortText && <div className={`section__shortText ${styles.shortText}`} dangerouslySetInnerHTML={{__html: shortText}}/>}
			{text && <div className={`section__text ${styles.text}`}  dangerouslySetInnerHTML={{__html: text}}/>}
			{cards && <div className={`section__cards ${styles.cards}`}>{isGallery ? <Slider items={cards}/> : cards }</div>}
			{media && <div className={`section__media ${styles.media}`}>{media}</div>}
			{children && children}
		</section>
	);
};

const SectionCards = observer((props: {background: any, cards: React.ReactNode[] | {} | undefined, onMouseOver?: (event: any) => void,onMouseLeave?: (event: any) => void}) => {

	let store = useStore()
	const cardsRef = useRef(null);
	const [img, setImg] = useState(false);

	useEffect(() => {

		if(props.background) {
			setImg(true)
		} else {
			setImg(false);
		}

	}, [props.cards])

	if(props.cards)
		return <div className={`section__cards ${styles.cards}`}
			data-Bgsrc={props.background}
			// style={{backgroundImage: `url(${props.background})`}}
		onMouseLeave={props.onMouseLeave}
		onMouseOver={props.onMouseOver}
		ref={cardsRef}>
			{/*// @ts-ignore*/}
			{props.cards.map((card:CardParams) =>
				<Card key={card.id}
					style={card.style}
					title={card.title}
					text={card.text}
					mousePath={false}
					link={card.link}
					headingVariant={card.headingVariant}
					action={() => console.log('action', props)}
					// img={<Image src={card.image.src}
					// 	width={card.image.width}
					// 	height={card.image.height}
					// 	alt={''}/>}
					img={card.image}
					{...props}
				/>
			)}
			{/*{store.booksStore.imageBg && <div className={'section__background'}>*/}
			{/*	<Image src={store.booksStore.imageBg} alt={''}/>*/}
			{/*</div>}	*/}
			{/*// @ts-ignore*/}
			{props.cards.map((card:CardParams) => <div className={`section__background ${store.booksStore.imageBg && 'bg-active'}` }  key={card.id + 'img'}><Image src={card.image} alt={''}/></div>)}
			{store.booksStore.imageBg && <div className={'section__background'}>
				<Image src={store.booksStore.imageBg} alt={''}/>
			</div>}

	</div>;
})

export const ProdSection = ({ children, header, shortText, media, text, cards, action, className = "" }: SectionProps) => {

	const [imgBackground, setBackground] = useState(null);

	return (
		<section className={`section ${styles.container} ${className}`}>
			{header && <h2 className={'section__title'}>{header}</h2>}
			{shortText && <div className={`section__shortText ${styles.shortText}`} dangerouslySetInnerHTML={{__html: shortText}}/>}
		{text && <div className={`section__text ${styles.text}`} dangerouslySetInnerHTML={{__html: text}}/>}
			<SectionCards
				// @ts-ignore
				cards={cards}

				background={imgBackground}
				// onMouseLeave={() => setBackground(null)}
				// onMouseOver={handleOver}
				/>
			{media && <div className={`section__media ${styles.media}`}>{media}</div>}
			{children && children}
		</section>
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
