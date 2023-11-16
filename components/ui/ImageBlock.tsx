import Image, { ImageProps } from "next/image";
import React from "react";
import noimg from "@/public/no-image.png"
// @ts-ignore
const ImageBlock = (props: ImageProps | undefined) => {
	if (props.src) return <Image {...props} src={process.env.NEXT_PUBLIC_BACK_URL + props.src}
		width={props.width}
		height={props.height}/>
	if(!props.src) return <Image src={noimg} alt={'no image'}/>
}
export default ImageBlock
