import styles from './SliderProduct.module.scss';
import React, { useEffect, useState } from 'react';
// @ts-ignore
import { Swiper,  SwiperSlide } from 'swiper/react';

// @ts-ignore
import { Controller, Navigation, Pagination, Thumbs } from 'swiper/modules';

import Image from 'next/image';
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
export const SliderProduct = (items:any) => {
	const [thumbs, setThumbs] = useState(null);
	const [controlledSwiper, setControlledSwiper] = useState(null);
	console.log('sl', items)
	const [ready, setReady] = useState(false);
	const Slides = [];
	useEffect(() => {

		setReady(true);
	}, []);


	return (

			ready ? (<><Swiper  controller={{ control: controlledSwiper }}
				spaceBetween={0}  className={"mySwiper2"}
				slidesPerView={1} modules={[ Thumbs, Controller, Navigation]}
				loop={true}
				navigation={true}
				watchOverflow={true}
				watchSlidesProgress={true}
			>

				{	// @ts-ignore
					ready && items.items.map((i, index:number) => <SwiperSlide key={index}><Image src={`http://localhost:3000${i.src}`} width={i.width} height={i.height} alt={' '}/></SwiperSlide>)}

	</Swiper>
	<Swiper
		spaceBetween={12}  className="mySwiper"
		slidesPerView={"auto"} modules={[ Thumbs, Controller, Navigation, Pagination]}
		loop={false}

		// @ts-ignore
		onSwiper={setControlledSwiper}
		watchOverflow={true}
watchSlidesProgress={true}
		navigation={true}
>
		{	// @ts-ignore
			ready && items.items.map((i:any, index: React.Key | null | undefined) => <SwiperSlide
				style={{
					width:i.width / 4,
					objectFit: "contain",
					display: "flex",
					height: "100%",

					maxWidth: "fit-content",
					// aspectRatio: "640/540"
			}}
				className={' flex'} key={index}><Image src={`http://localhost:3000${i.src}`}
				width={i.width / 4}
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
			style={{
				// width: "100%",
				// height: "100%",
				// maxWidth: "7rem",
				position: "relative",
				// flex: "1 0 100%",
				objectFit: "contain"}}
				height={i.height / 4}
				alt={' '}/></SwiperSlide>)}

	</Swiper></>) : <>load</>)


};
