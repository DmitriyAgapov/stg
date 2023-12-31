import { Button, extendVariants } from "@nextui-org/react";


const StgButton = extendVariants(Button, {
	variants: {

		// <- modify/add variants
		color: {
			primary: "text-white bg-primary",
			secondary: "text-white bg-secondary",
			white: " bg-transparent border-white text-white  hover:border-gray-500 hover:text-gray-100 border-2 hover:bg-gray-700 hover:bg-opacity-50",
			outline: "font-semibold border-primary border-2 text-primary bg-transparent hover:bg-primary hover:text-white",
			orange: "bg-[#ff8c00] text-[#fff]",
			violet: "bg-[#8b5cf6] text-[#fff]",
			darkOutline: "font-semibold border-white border-2 text-white bg-transparent hover:bg-white hover:text-primary hover:border-primary",
		},

		isDisabled: {
			true: "bg-[#eaeaea] text-[#000] opacity-50 cursor-not-allowed",
		},

		size: {
			xs: "px-unit-2 min-w-unit-12 h-unit-6 text-tiny gap-unit-1 rounded-none",
			sm: "px-unit-6 py-unit-3 lg:px-unit-6 lg:py-unit-4 min-w-unit-20 lg:h-unit-14 h-unit-12 text-base gap-unit-2 rounded-none my-auto",
			md: "px-unit-6 py-unit-4 min-w-unit-20 h-unit-14 text-base gap-unit-2 rounded-none ",
			xl: "px-unit-8  py-unit-4 min-w-unit-28 h-unit-15 text-xl gap-unit-4 rounded-none",
		},
	},
	defaultVariants: { // <- modify/add default variants
		// @ts-ignore
		outlined: "primary",
		// @ts-ignore
		size: "md",
	},
	compoundVariants: [ // <- modify/add compound variants
		{
			isDisabled: true,
			color: "primary",
			class: "bg-[#84cc16]/80 opacity-100",
		},
	],
});
export default StgButton
