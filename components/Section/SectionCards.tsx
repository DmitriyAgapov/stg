import { observer } from "mobx-react-lite";
import { useStore } from "@/store";
import { ReactNode, useEffect, useRef, useState } from "react";
import styles from "@/components/Section/Section.module.scss";
import Card, { CardParams } from "@/components/Cards/Card/Card";
import { CardProductsBg } from "@/components/Section/CardProductsBg";
import Blocks from "editorjs-blocks-react-renderer";

export const SectionCards = observer((props: {background?: any, cards: ReactNode[] | {} | undefined, onMouseOver?: (event: any) => void,onMouseLeave?: (event: any) => void}) => {

	let store = useStore()
	const cardsRef = useRef(null);
	const [img, setImg] = useState(false);
	// console.log(props.cards)

	useEffect(() => {

		if(props.background) {
			setImg(true)

		} else {
			setImg(false);

		}
	}, [props.cards])

	if(props.cards)
		return <div className={`section__cards ${styles.cards}`}
			data-bgsrc={props.background}
			// style={{backgroundImage: `url(${props.background})`}}

			// ref={cardsRef}
		>
			{/*// @ts-ignore*/}
			{props.cards.map((card:CardParams) =>
				<Card
					key={card.id}
					id={card.id}
					style={" HOVER"}
					title={card.title}
					text={card.description}
					mousePath={false}
					link={`/catalog/series/${card.slug}`}
					action={true}
					imglogo={card.imglogo}
					headingVariant={card.headingVariant}
					// action={() => {
					// 	console.log('action', props);
					// 	// setTimeout(() => store.booksStore.setImageBg({
					// 	// 	// id: "-1"
					// 	// }, 1000));
					// }}
					// img={<Image src={card.image.src}
					// 	width={card.image.width}
					// 	height={card.image.height}
					// 	alt={''}/>}
					img={card.image}

				/>
			)}
			{/*{store.booksStore.imageBg && <div className={'section__background'}>*/}
			{/*	<Image src={store.booksStore.imageBg} alt={''}/>*/}
			{/*</div>}	*/}
			{/*// @ts-ignore*/}
			{props.cards.map((card:CardParams, index:number) => <CardProductsBg key={card.id + 'img'}

				card={card}
				img={img}
				index={index}/>)}
			{/*{store.booksStore.imageBg && <div className={'section__background'}>*/}
			{/*	<Image src={store.booksStore.imageBg} alt={''}/>*/}
			{/*</div>}*/}

		</div>;
})
