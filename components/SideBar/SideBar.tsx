import styles from './SideBar.module.scss';
import React from "react";
import Link from "next/link";
import StgButton from "@/components/ui/StgButton";
import { Button } from "@nextui-org/button";
export interface NavProps {
	tags?: TagProp[],
	parentLink?:
		{
			link: string, text: string
		}
}
export interface NewsProps {
	className?: string,
	cards?: {},
	nav:  NavProps
	tags?:  TagProp[]
}
export interface TagProp {
	text:string,
	link: string
}
const SideBar = ({className, nav, tags}:NewsProps) => {


	return <nav className={styles.container + " sidebar " + className}>
		<ul className={styles.list}>
			{/*// @ts-ignore*/}
			{nav.tags.map((tag:TagProp, index:number) =>
				<li key={index}>
					<Link href={tag.link}>{tag.text}</Link></li>)}

		</ul>

		{nav.parentLink && <StgButton as={Link} color={"white"} href={nav.parentLink.link}>{nav.parentLink?.text}</StgButton>}
	</nav>;
}

export default SideBar;
