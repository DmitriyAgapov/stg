import React, { ReactElement, ReactNode } from "react";

export enum HeadingVariants {
	h1 = 'h1', h2 = 'h2', h3 = 'h3', h4 = 'h4'
}
export interface HeadingProps {
	type: HeadingVariants
	text?: ReactNode | string | ReactElement<string, any> | JSX.Element
	className?: string
	children?: ReactNode
}

const Heading = ({type, text, className} : HeadingProps) => {
	let heading;
	switch (type) {
		case 'h1' :
			heading = <h1 className={`my-6 leading-[4.5rem] mb-10`+ ' ' + className}>{text}</h1>;
			break;
		case 'h2' :
			heading =  <h2 className={className}>{text}</h2>;
			break;
		case 'h3' :
			heading =  <h3 className={className}>{text}</h3>;
			break;
		case 'h4' :
			heading =  <h4 className={className}>{text}</h4>;
			break;
		default:
			heading =  <h2 className={className}>{text}</h2>;

	}
	return heading
}
export default Heading
