import { Checkbox, extendVariants } from "@nextui-org/react";

const StgCheckBox = extendVariants(Checkbox, {
	variants: {
		// <- modify/add variants

		size: {
			xl: {
				wrapper: "px-unit-2 min-w-unit-12 h-unit-6 text-tiny gap-unit-1 rounded-none"
			}
		},
	},
	defaultVariants: { // <- modify/add default variants
// @ts-ignore
		size: "xl",
	},
	compoundVariants: [ // <- modify/add compound variants
		{
			class: "bg-[#84cc16]/80 opacity-100",
		},
	],
});
export default StgCheckBox
