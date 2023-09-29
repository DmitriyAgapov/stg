import React, { ReactNode } from "react";

export enum HeadingVariants {
	h1 = 'h1', h2 = 'h2', h3 = 'h3', h4 = 'h4'
}
interface HeadingProps {
	type?: HeadingVariants
	children: ReactNode
	className?: string
}

const Heading = ({type, children, className}:HeadingProps) => {
	let heading;
	switch (type) {
		case 'h1' :
			heading = <h1 className={className}>{children}</h1>;
			break;
		case 'h2' :
			heading =  <h2 className={className}>{children}</h2>;
			break;
		case 'h3' :
			heading =  <h3 className={className}>{children}</h3>;
			break;
		case 'h4' :
			heading =  <h4 className={className}>{children}</h4>;
			break;
		default:
			heading =  <h2 className={className}>{children}</h2>;

	}
	return heading
}
export default Heading
