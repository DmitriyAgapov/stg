import styles from './TextBlockRenderer.module.scss';
import React from "react";
import Blocks, { RenderFn } from "editorjs-blocks-react-renderer";
import Image from "next/image";
interface ImageProps {

		file: {
			url: string
			mime: string
			height: number
			width: number
			size: number
			alt: string
			formats: {
				large: ImageProps
				small: ImageProps
				medium: ImageProps
				thumbnail: ImageProps
			}
		},
		caption: string
		withBorder: boolean
		stretched: boolean
		withBackground: boolean


}
const ImageBlock: RenderFn<{
	data: ImageProps
}> = ({
	className = "", ...data
}) => {
	return (
		<Image src={process.env.NEXT_PUBLIC_BACK_URL + data.file.url} width={data.file.width} height={data.file.height} alt={data.caption} />
	)
}
const TextBlockRenderer = (props: { text: string | any }) => {

	return <Blocks data={JSON.parse(props.text)} renderers={{
		image: ImageBlock
	}}/>;
}
//
// const TextBlockRenderer = () => {
// 	return <div className={styles.TextBlockRenderer}>TextBlockRenderer</div>;
// };

export default TextBlockRenderer;
