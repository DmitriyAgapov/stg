import Link from "next/link";
import { ReactNode, useId } from "react";
import { useRouter } from "next/router";
export type CrumbItem = {
	label: ReactNode; // e.g., Python
	path: string; // e.g., /development/programming-languages/python
};
export type BreadcrumbsProps = {
	items: CrumbItem[];
};
const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
	const router = useRouter()
	const id = useId()
	const newAr = [];
	newAr.push(	<Link
		key={id}
		href={'/'}
		className="text-gray-600 hover:text-primary text-sm"
	>
		{router.locale === "ru" ? 'Главная' : "Main"}
	</Link>)
	newAr.push(	<span key={id + id}> / </span>)
	items.forEach((crumb, i) => {

	const isLastItem = i === items.length - 1;

	if (!isLastItem) {
		newAr.push(

			<Link
				key={id}
				href={crumb.path}

				className="text-gray-600 hover:text-primary text-sm"
			>
				{crumb.label}
			</Link>

		);
		newAr.push(	<span key={id}> / </span>)
	} else {
		newAr.push(<span className="text-gray-600 text-sm" 	key={id}>{crumb.label}</span>);
	}});
	return (
		<div className="flex gap-2 items-start breadcrumbs">
			{newAr}
		</div>
	);
};
export default Breadcrumbs;
