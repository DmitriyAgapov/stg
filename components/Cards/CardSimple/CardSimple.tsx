import styles from "./CardSimple.module.scss";
import TextBlockRenderer from "@/components/ui/TextBlockRenderer/TextBlockRenderer";

type CardProps = {
 	title:string,
	text:string
}
type CardReviewProps = {
 	person:string,
	text:string
	date:any
}

export const CardWithCounter = ( props: any) => {

	return <li className={styles.cardwithcounter}>
		<h3>{props.title.toLowerCase().charAt(0).toUpperCase() + props.title.toLowerCase().slice(1)}</h3>
		{props.text && <div><TextBlockRenderer text={props.text} /></div>}
	</li>
}
export const CardBox = ( props: any) => {
	return <div className={styles.cardbox}>
		<h3>{props.title}</h3>
		{props.text && <div><TextBlockRenderer text={props.text} /></div>}
	</div>
}

export const CardsListWithCounter = ({ ar }:any) => {
	return <ul className={"cards__partner "}>{ar.map((a:any) => <CardWithCounter  title={a.text} text={a.description} key={a.id}/>)}</ul>
}

// @ts-ignore
export const ReviewCard = (props: CardReviewProps) => <div className={'card-review border py-10 px-8 text-black'}><header className={"text-sm text-gray-500"}>{new Date(Date(props.date)).toLocaleDateString()}</header><TextBlockRenderer text={props.text}/><footer className={"font-semibold text-gray-500 text-sm block"}>{props.person}</footer></div>
