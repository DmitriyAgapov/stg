import { observer } from "mobx-react-lite";
import { CardParams } from "@/components/Cards/Card/Card";
import { useStore } from "@/store";
import Image from "next/image";

export const CardProductsBg = observer((props: { card: CardParams, img: boolean, index: number }) => {
	const store = useStore();
	return <div
		// @ts-ignore
		style={(props.card.image.id  == store.booksStore.activeImageBgIndex)  ? { opacity: 1 } : { opacity: 0 }}
		className={`section__background ${props.img ? `bg-active-${props.index}` : " "}`}>
		<Image
			// @ts-ignore
			src={process.env.NEXT_PUBLIC_BACK_URL + props.card.image.url}
			// @ts-ignore
			width={props.card.image.width}
			// @ts-ignore
			height={props.card.image.height}
			alt={""}/>
	</div>;
});

