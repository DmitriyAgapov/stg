import styles from './SideBar.module.scss';
import React from "react";
import { useId } from "react";
import Link from "next/link";

import testData from '@/utils/testData.json'
import StgButton from "@/components/ui/StgButton";
import { Button } from "@nextui-org/button";
import { Accordion, AccordionItem, Checkbox, CheckboxGroup, Menu, MenuItem, Radio, RadioGroup } from "@nextui-org/react";
import { backUrl } from "@/utils/utils";
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
	nav?:  any
	links?: any[]
}
export interface TagProp {
	title:string,
	slug: string
}
const SideBar = ({className, nav, links}:NewsProps) => {
	console.log(links)
	const id = useId();
	return <nav className={styles.container + " sidebar " + className}>
		{nav && <ul className={styles.list}>
			{/*// @ts-ignore*/}
			{nav.map((tag:TagProp) =>
				<li key={id}>
					<Link href={`/blog/${tag.slug}`}>{tag.title}</Link></li>)}

		</ul>}

		{links && links.map(l => <StgButton key={l.id} as={Link} color={"outline"} href={l.url}>{l.text}</StgButton>)}
	</nav>;
}
const ProductPropsVariants = (props: { items:any[], type:any }) => {

	switch (props.type) {
		case 'links':
			return (
				<Menu className={'my-0  pl-0 py-0 self-center justify-self-center'} variant={"light"} >
					{props.items.map((menuItem:any) =>
						<MenuItem key={menuItem.id} className={"py-0 my-2 pl-0 hover:text-primary"} >
							<Link
								className={"font-[600] text-large text-gray-900  leading-none"}
								// @ts-ignore
								href={menuItem.slug}>{menuItem.text}</Link>
						</MenuItem>)}
				</Menu>
			)
		case "radio":
			return (
			<RadioGroup>
				{props.items.map((menuItem:any) =>
					<Radio key={menuItem.id} value={menuItem.id} classNames={{
						control: "w-4 h-4 bg-primary",
						base: "",
						wrapper: "h-8 w-8 mr-1 border-gray-500",
						label: "font-[600] text-large leading-none"
					}}>
						{menuItem.text}
					</Radio>)}
			</RadioGroup>
			)
		case "checkbox":
			return (
				<CheckboxGroup radius={"sm"} size={"lg"} >
					{props.items.map((menuItem:any) =>
					<Checkbox  key={menuItem.id} size={"lg"} classNames={{
						icon: "w-6 h-5",
						wrapper: "h-8 w-8 mr-3 mb-0.5",
						label: "font-[600]"
					}}   value={menuItem.id}>
						{menuItem.text}
					</Checkbox>)}
				</CheckboxGroup>
			)
		case "checkbox_inset":
			return (
				<CheckboxGroup radius={"sm"} size={"lg"} >
					{props.items.map((menuItem:any) =>
					<Checkbox  key={menuItem.id} size={"lg"} classNames={{
						icon: "hidden",
						base: "relative  ",
						wrapper: "h-12 w-12 mr-0 mb-0.5 inline-flex",
						label: "font-[600] group-data-[selected=true]:text-white absolute h-12 w-12 left-0 right-0 top-0 bottom-0 flex m-auto items-center justify-center"
					}}   value={menuItem.id}>
						{menuItem.text}
					</Checkbox>)}
				</CheckboxGroup>
			)

		default:
			break;
	}
}
const SideBarGroup = ({items}:{items: any[]}) => {

	return (
		<Accordion defaultExpandedKeys={[items[0].id, items[1].id]}  selectionMode={"multiple"} variant={"light"} showDivider={false}  itemClasses={{
			heading: "border-b-2 text-[var(--base)] my-1 py-0.5 leading-tight",
			content: 'my-5'

		}}>
			{items.map(i => <AccordionItem  key={i.id} title={i.title} >


						<ProductPropsVariants type={i.type}  items={i.menuItems}/>

			</AccordionItem>)
			}
		</Accordion>
	)
}
export const SideBarCatalog = (props:any) => {

	return (
		<aside className={styles.left}>
			<SideBarGroup {...props}/>
		</aside>
	)

}
export default SideBar;
