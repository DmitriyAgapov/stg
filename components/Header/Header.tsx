import styles from './Header.module.scss';
import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import { Activity, ChevronDown, Flash, Lock, LogoSvg, Scale, Server, TagUser } from "@/components/Icons";
import NextLink from "next/link";
import StgButton from "@/components/ui/StgButton";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { JSX, useMemo, useState } from "react";
import { HeaderNewMenu, MenuHeader } from "@/components/Header/MenuHeader";

export const Logo = () => {
	return <div className={styles.logoWrapper ? styles.logoWrapper : " " + " " + "logo"}>
		<NextLink href={'/'}><LogoSvg className={"h-6 xl:h-8"}/></NextLink>
	</div>;
}

function HeaderMenu(props: {
	onClick: () => void,
	items: any,
	icons: {
		server: JSX.Element;
		activity: JSX.Element;
		scale: JSX.Element;
		lock: JSX.Element;
		chevron: JSX.Element;
		user: JSX.Element;
		flash: JSX.Element
	},
	onMouseEnter: () => void
}) {
	const menuContent = (items: any) => {
		let submenu: string | any[] = [];
		const rootMenu: JSX.Element[] = [];

		items.forEach((item:any) => {
			if (item.items.length > 0) {
				rootMenu.push(<NavbarItem onClick={props.onClick}><Button disableRipple
					className="p-0 bg-transparent lg:text-sm text-lg data-[hover=true]:bg-transparent"
					endContent={props.icons.chevron}
					radius="sm"
					variant="light"
					onClick={props.onClick}
					onMouseEnter={props.onMouseEnter}>
					<Link className={styles.links + " " + "lg:text-md text-lg"}
						as={NextLink}
						onClick={props.onClick}
						href={item.path}
						aria-current="page">{item.title}</Link></Button></NavbarItem>)
				submenu = item.items;
			} else {
				rootMenu.push(<NavbarItem onClick={props.onClick}><Link onClick={props.onClick} className={styles.links + " " + "text-lg lg:text-md  font-semibold"}
					as={NextLink}
					href={item.path}
					aria-current="page">{item.title}</Link></NavbarItem>)
			}
		});

		return {
			root: rootMenu,
			submenu: submenu
		}
	}
	const TopMenu = () => menuContent(props.items).root;
	const subMenu = menuContent(props.items).submenu.map(it => ({ ...it, child: it.items.map((i:any) => ({ ...i, url: i.path.replace('#/', '') })), }));

	return <>
		<HeaderNewMenu items={subMenu}
			onClick={props.onClick}>
			<li className={"xl:hidden -order-1 "}><TopMenu/></li>
			<li className={"xl:hidden order-2 mt-auto"}><NavbarItem className={""}>
				<StgButton as={NextLink}
					color="outline"
					size={"md"}
					href="/calc"
					variant={'solid'}
					fullWidth>
					Калькулятор
				</StgButton>
			</NavbarItem></li>
		</HeaderNewMenu>

		<NavbarContent className="hidden lg:flex gap-6 justify-between lg:col-span-4  m-0 p-0 w-full" >
			<TopMenu/>
		</NavbarContent>
	</>;
}

const Header = ({ menu, ...props }: any) => {
	const [ isMenuOpen, setIsMenuOpen ] = useState(false);

	const memoizedMenu = useMemo(() => menu, [ menu ]);

	const icons = {
		chevron: <ChevronDown fill="currentColor"
			size={16}/>,
		scale: <Scale className="text-warning"
			fill="currentColor"
			size={30}/>,
		lock: <Lock className="text-success"
			fill="currentColor"
			size={30}/>,
		activity: <Activity className="text-secondary"
			fill="currentColor"
			size={30}/>,
		flash: <Flash className="text-primary"
			fill="currentColor"
			size={30}/>,
		server: <Server className="text-success"
			fill="currentColor"
			size={30}/>,
		user: <TagUser className="text-danger"
			fill="currentColor"
			size={30}/>,
	};

	return (
		<>
			<Navbar maxWidth={"full"}
				className={styles.container + " " + "sm:flex justify-center py-0"}
				isBordered

				isMenuOpen={isMenuOpen}
				onMenuOpenChange={setIsMenuOpen}>

				<NavbarContent className="lg:hidden p-0 order-4"
					justify="end">
					<NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"}/>
				</NavbarContent>

				<NavbarBrand className={'lg:col-span-5 h-6 flex-auto'}>
					<Logo/>
				</NavbarBrand>
				<HeaderMenu onClick={() => setIsMenuOpen(false)}
					items={memoizedMenu}
					icons={icons}
					onMouseEnter={() => setIsMenuOpen(true)}/>
				<NavbarContent className={'lg:col-span-3 content-end  m-0 p-0 ml-auto'}>

					<NavbarItem className={"hidden md:block"}>
						<StgButton as={NextLink}
							color="outline"
							size={"sm"}
							href="/calc"
							variant={'solid'}>
							Калькулятор
						</StgButton>
					</NavbarItem>
					<NavbarItem className="lg:flex justify-center self-center">
						<LocaleSwitcher/>
					</NavbarItem>
				</NavbarContent>
			</Navbar>
			{/*{open && <DropDownMenu/>}*/}
		</>
	)
};

export default Header;
