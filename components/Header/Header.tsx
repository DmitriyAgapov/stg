import styles from './Header.module.scss';

import { Link, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem,  Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu} from "@nextui-org/react";
import {ChevronDown,LogoSvg, Lock, Activity, Flash, Server, TagUser, Scale} from "@/components/Icons";
import NextLink  from "next/link";
import StgButton from "@/components/ui/StgButton";
import LocaleSwitcher from "@/components/LocaleSwitcher";


import { useState } from "react";
import Section from "@/components/Section";
export const Logo = () => {
	return <div className={styles.logoWrapper ? styles.logoWrapper : " " + " " + "logo"}>
		<NextLink href={'/'}><LogoSvg/></NextLink>
	</div> ;
}

const DropDownMenu = () => {
	return (
	<Section className={'fixed left-0 right-0 h-[200px] top-[112px] bg-white z-10'}>
		<ul>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
		</ul>
	</Section>
	)
}

const Header = () => {
	const [open, setOpen] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const icons = {
		chevron: <ChevronDown fill="currentColor" size={16} />,
		scale: <Scale className="text-warning" fill="currentColor" size={30} />,
		lock: <Lock className="text-success" fill="currentColor" size={30} />,
		activity: <Activity className="text-secondary" fill="currentColor" size={30} />,
		flash: <Flash className="text-primary" fill="currentColor" size={30} />,
		server: <Server className="text-success" fill="currentColor" size={30} />,
		user: <TagUser className="text-danger" fill="currentColor" size={30} />,
	};
	return (
<>
			<Navbar maxWidth={"full"} className={styles.container} isBordered
				isMenuOpen={isMenuOpen}
				onMenuOpenChange={setIsMenuOpen}>

				<NavbarContent className="sm:hidden" justify="start">
					<NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
				</NavbarContent>

				<NavbarBrand className={'lg:col-span-5'}>
					<Logo />
				</NavbarBrand>

				<NavbarMenu className={'lg:max-h-48 lg:top-24 list-none'}
					onClick={() => setIsMenuOpen(false)}
					onMouseLeave={() => setIsMenuOpen(false)}
				>

					<NavbarMenuItem>
						{/*<DropdownTrigger>*/}
						<Section>
							<div className={"inner_menu lg:col-start-7 lg:col-end-13"}>
								<Button
									disableRipple
									className="p-0 bg-transparent data-[hover=true]:bg-transparent "
									endContent={icons.chevron}
									radius="sm"
									variant="light"
									href={'/test'}
									as={NextLink}
								>Features
								</Button>
							</div>
						</Section>
						{/*</DropdownTrigger>*/}
					</NavbarMenuItem>


				</NavbarMenu>
				<NavbarContent className="hidden sm:flex gap-6 justify-between lg:col-span-4  m-0 p-0 w-full" >


					<NavbarItem>
						<Button
							disableRipple
							className="p-0 bg-transparent data-[hover=true]:bg-transparent"
							endContent={icons.chevron}
							radius="sm"
							variant="light"
							onMouseEnter={() => setIsMenuOpen(prevState => !prevState)}
						>
							<Link className={styles.links} as={NextLink} href="/features" aria-current="page">
								Каталог
							</Link>
						</Button>

					</NavbarItem>
					<NavbarItem >
						<Link className={styles.links} as={NextLink} href="#" aria-current="page">
							Партнерам
						</Link>
					</NavbarItem>

					<NavbarItem>
						<Link className={styles.links} as={NextLink}  href="#">
							О компании
						</Link>
					</NavbarItem>
					<NavbarItem>
						<Link className={styles.links} as={NextLink} color="foreground" href="#">
							Контакты
						</Link>
					</NavbarItem>

				</NavbarContent>
				<NavbarContent justify={"end"} className={'lg:col-span-3 content-end  m-0 p-0'}>

					<NavbarItem>
						<StgButton as={Link} color="outline" size={"md"} href="#"  variant="ghost">
							Калькулятор
						</StgButton>
					</NavbarItem>
					<NavbarItem className="hidden lg:flex">
						<LocaleSwitcher />
					</NavbarItem>
				</NavbarContent>
			</Navbar>
			{open && <DropDownMenu />}
		</>
	)
};

export default Header;
