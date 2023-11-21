import Image from "next/image";
import noimg from "@/public/no-image.png"
// @ts-ignore
const ImageBlock = (props: any) => {

	if (props && props.src) {
		// @ts-ignore
		return <Image
				{...props}
				quality={props.quality || 90}
				src={process.env.NEXT_PUBLIC_BACK_URL + props.src}
				width={props.width}
				height={props.height}
				alt={''}

		/>
	}
	if(props && !props.src) return <div className={"noimage__wrapper w-full h-full flex justify-center items-center"}><Image  src={noimg} alt={'no image'}/></div>
}
export default ImageBlock
