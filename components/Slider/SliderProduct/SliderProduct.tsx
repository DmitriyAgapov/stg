import styles from './SliderProduct.module.scss';
import React, { useEffect, useState } from 'react';
// @ts-ignore
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import ArrowLeftIcon from ""
// @ts-ignore
import { Controller, Navigation, Pagination, Thumbs, FreeMode } from 'swiper/modules';

import Image from 'next/image';
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { backUrl } from "@/utils/utils";
import ImageBlock from "@/components/ui/ImageBlock";
import { NextEl, PrevEl } from "@/components/Icons";

export const SliderProduct = ({ items }: any) => {
	const swiper = useSwiper();
	const [ thumbs, setThumbs ] = useState(null);
	const [ controlledSwiper, setControlledSwiper ] = useState(null);
	const handleNext = (event: number) => {
		// @ts-ignore
		if (controlledSwiper) {
			// @ts-ignore
			controlledSwiper.slideNext();
		}
	}
	const handlePrev = (event: number) => {
		if (controlledSwiper) {
			// @ts-ignore
			controlledSwiper.slidePrev();
		}
	}

	// useEffect(() => {
	// 	if(controlledSwiper){
	// 		// @ts-ignore
	// 		controlledSwiper.slideTo(activeSlide, 500, () => console.log('Callback'))
	// 	}
	// }, [activeSlide])
	const [ ready, setReady ] = useState(false);
	const Slides = [];
	useEffect(() => {
		setReady(true);
	}, []);

	return (

		ready ? (<><Swiper controller={{ control: controlledSwiper }}
			spaceBetween={0}
			className={"mySwiper2"}
			slidesPerView={1}
			modules={[ Thumbs, Controller, Navigation ]}
			loop={true}
			thumbs={{ swiper: controlledSwiper }}
			watchOverflow={true}
			watchSlidesProgress={true}>

			{	// @ts-ignore
				ready && items.length > 0 ? items.map((i, index: number) => <SwiperSlide key={index}><ImageBlock src={i.url}
					width={i.formats.medium.width}
					height={i.formats.medium.height}
					alt={' '}/></SwiperSlide>) : <SwiperSlide key={'nulll'}><ImageBlock src={undefined} fill style={{width: "100%", height: "100%", objectFit: "cover"}}

					alt={' '}/></SwiperSlide>}

		</Swiper>
			<div className={'swiper-wpapper_custom  !overflow-x-clip z-40 !relative !max-w-full mt-8  !w-auto'}>
				<Swiper spaceBetween={12}
					className="mySwiper !mx-12"
					slidesPerView={3}
					modules={[ Thumbs, FreeMode, Controller, Navigation, Pagination, FreeMode ]}
					loop={false}
					controller={{ control: thumbs }}
					// @ts-ignore

					onSwiper={(swiper) => {

						// @ts-ignore
						setControlledSwiper(swiper)
					}}
					watchOverflow={true}
					watchSlidesProgress={true}
					freeMode={true}

					navigation={{
						prevEl: ".swiper-button-prev-custom",
						nextEl: ".swiper-button-next-custom",
						enabled: true,
						disabledClass: "opacity-20",
					}}>

					{	// @ts-ignore
						ready && items.map((i: any, index: React.Key | null | undefined) => {

							return (<SwiperSlide style={{
								minHeight: "5rem",
								minWidth: "5rem",
								objectFit: "contain",
								display: "flex",

								// flex: 1,
								// aspectRatio: "640/540"
							}}
								className={' flex'}
								key={index}>
								<ImageBlock src={i.url}
									width={i.formats.thumbnail.width}
									height={i.formats.thumbnail.height}
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
									style={{
										// width: "100%",
										// height: "100%",
										maxWidth: "max-content",
										minHeight: "5rem",
										minWidth: "5rem",
										// position: "absolute",
										// flex: "1 0 100%",
										objectFit: "cover"
									}}
									alt={' '}/></SwiperSlide>)
						})}

				</Swiper>{ready && <>
				<div className={"swiper-button-prev-custom " + " " + styles.slidePrev}
					onClick={(event) => handlePrev(event)}><NextEl className={"w-12 h-12"}/></div>
				<div className={"swiper-button-next-custom cursor-pointer " + " " + styles.slideNext}
					onClick={(event) => handleNext(event)}><PrevEl className={"w-12 h-12"}/></div>

			</>}</div>
		</>) : <>load</>)


};
