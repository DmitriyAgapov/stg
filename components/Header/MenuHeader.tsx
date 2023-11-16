import { Button, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import styles from "@/components/Header/Header.module.scss";
import NextLink from "next/link";
import Heading, {HeadingVariants} from "@/components/ui/Heading";
import { useEffect, useState} from "react";

export const DropDownMenu = ( props:{heading?:string | any, first?: boolean, menuItems: any, locale: string}) => {

    return (
        <div  className={`inner_menu`}>
            <Heading className={'text-gray-500 text-medium capitalize mb-4'} text={props.heading} type={HeadingVariants.h4}/>
            <ul className={'list-none pl-0'} {...props}>
                {props.menuItems?.map(item => <li key={item.id} className={'my-1.5 py-0'}>
                    <NextLink  className={'font-semibold text-gray-900'}  href={`/catalog/${item.link}`}>{props.locale === "ru" ? item.attributes.title : item.attributes.title_en}</NextLink></li>)}
            </ul>
        </div>
    )
}

export function MenuHeader(props: { onClick: () => void, items: any }) {

    const [items, setItems] = useState(null);

    useEffect(() => {
        let newAr: any[] = [];
        for(let i = 0; props.items.length > i; i++) {

            if(props.items[i].parent === null) {
                newAr.push(props.items[i]);
            } else {

                if(!newAr.filter(p => p.id === props.items[i].parent.id)[0].child) {
                    Object.assign(newAr.filter(p => p.id === props.items[i].parent.id)[0], {
                        child: []
                    });
                }
                newAr.filter(p => p.id === props.items[i].parent.id)[0].child.push(props.items[i])
            }
        }
      // @ts-ignore
        setItems(newAr);

    }, [props.items]);


    return <NavbarMenu className={"max-h-56 overflow-hidden lg:top-[6.5rem] list-none backdrop-blur-none backdrop-filter-none  backdrop-saturate-0 bg-background border-t-1 fixed left-0 right-0 top-[112px] " + styles.containerMenu}
        style={{ boxShadow: "0px 30px 100px 0px rgba(0, 0, 0, 0.35)" }}
        onClick={props.onClick}
        onMouseLeave={props.onClick}>
       {items &&
           // @ts-ignore
           items.length > 0 && items.map((menu:any, index: number) => <NavbarMenuItem key={menu.id} className={'bg-white  z-50 bg-white grid-rows-1 grid-flow-row my-0 items-center' + styles.item}>
               <div  className={`inner_menu`}>
                   <Heading className={'text-gray-500 text-medium capitalize mb-4'} text={menu.title} type={HeadingVariants.h4}/>
                   <ul className={'list-none pl-0'}>
                       {menu.child.map((i:any) => <li key={i.id} className={'my-1.5 py-0'}>
                           <NextLink  className={'font-semibold text-gray-900'}  href={`${i.url}`}>{i.title}</NextLink></li>)}
                   </ul>
               </div>
           </NavbarMenuItem>
       )}
        <NavbarMenuItem>
            <Button
                className="p-0 bg-transparent self-center stg-button border-current h-[80px] font-bold border-2 data-[hover=true]:bg-primary data-[hover=true]:text-white lg:!col-start-11 self-stretch flex lg:col-span-2 self-center"
                radius="sm"
                variant="light"
                href={"/catalog"}
                as={NextLink}>Все разделы
            </Button>
        </NavbarMenuItem>
    </NavbarMenu>;

}
export  const HeaderNewMenu = (props: any) => <NavbarMenu className={"max-h-56 overflow-hidden lg:top-[6.5rem] list-none backdrop-blur-none backdrop-filter-none  backdrop-saturate-0 bg-background border-t-1 fixed left-0 right-0 top-[112px] " + styles.containerMenu}
    style={{ boxShadow: "0px 30px 100px 0px rgba(0, 0, 0, 0.35)" }}
    onClick={props.onClick}
    onMouseLeave={props.onClick}>
    {props.items && props.items.length > 0 && props.items.map((menu:any) => <NavbarMenuItem key={menu.id} className={'bg-white  z-50 bg-white grid-rows-1 grid-flow-row my-0 items-center' + styles.item}>
                <div  className={`inner_menu`}>
                    <Heading className={'text-gray-500 text-sm capitalize mb-4'} text={menu.title} type={HeadingVariants.h4}/>
                    <ul className={'list-none pl-0'}>
                        {menu.child.map((i:any) => <li key={i.id} className={'my-1.5 py-0'}>
                            <NextLink  className={'font-semibold text-gray-900'}  href={`${i.url}`}>{i.title}</NextLink></li>)}
                    </ul>
                </div>
            </NavbarMenuItem>
        )}
    <NavbarMenuItem>
        <Button
            className="p-0 bg-transparent self-center stg-button border-current h-[80px] font-bold border-2 data-[hover=true]:bg-primary data-[hover=true]:text-white lg:!col-start-11 self-stretch flex lg:col-span-2 self-center"
            radius="sm"
            variant="light"
            href={"/catalog"}
            as={NextLink}>Все разделы
        </Button>
    </NavbarMenuItem>
</NavbarMenu>
