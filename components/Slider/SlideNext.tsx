import { NextEl } from "@/components/Icons";

// @ts-ignore
import { useSwiper } from 'swiper/react';
import  React from "react";

export default function SlideNextButton() {
	const swiper = useSwiper();

	return (
		<div onClick={() => swiper.slideNext()} className="swiper-button-next-custom  cursor-pointer  -mr-12"><NextEl  className={"w-12 h-12"}/></div>

	);

}
