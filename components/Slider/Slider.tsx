import styles from './Slider.module.scss';
// @ts-ignore
import { Swiper, SwiperSlide } from 'swiper/react';
// @ts-ignore
import { Autoplay, Controller } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// @ts-ignore
import { Pagination } from 'swiper/modules';
import { EventHandler, useEffect, useId, useState } from "react";

interface SliderControlProps {
	activeSlideIndex: number
	action?: any
	maxSlides:number
}


const Slider = ({items, maxWidth = "420px"}:any) => {
	const id = useId();
	const [activeSlide, setActiveSlide] = useState(0);
	const slides = items.map((it:any) => <SwiperSlide style={{maxWidth: maxWidth  }} key={id}>{it}</SwiperSlide>)
	useEffect(() => {
		if(swiperInit){
			// @ts-ignore
			swiperInit.slideTo(activeSlide, 500, () => console.log('Callback'))
		}
	}, [activeSlide])
	const SliderControl = ({activeSlideIndex, maxSlides, action}:SliderControlProps) => {

		const handleActiveIndex = (event:any) => {
			setActiveSlide(event.target.value);
		}
		return (
			<div className={styles.slider__control}>
				<input type="range"
					id={'slider'}
					name="slider"
					min="0"
					value={activeSlideIndex}
					defaultValue={0}
					max={maxSlides}
					step={1}
					onInput={(event) => handleActiveIndex(event)}
					onChange={(event) => handleActiveIndex(event)}
				/>
			</div>
		)
	}

	const handleIndex = (event: number) => {
		setActiveSlide(event);
	}
	const [swiperInit, setSwiperInit] = useState(null);
	// @ts-ignore
	return <div className={styles.container}>
		<Swiper
			watchSlidesProgress={true}
			spaceBetween={32}
			slidesPerView={"auto"}
			grabCursor={true}
			freeMode={true}
			// pagination={{
			// 	clickable: true,
			// }}
			// autoplay={{
			// 	delay: 2500,
			// 	disableOnInteraction: false,
			// }}
			className="mySwiper"
			modules={[Controller, Autoplay, Pagination]}

			onSlideChange={(swiper) => {
				handleIndex(swiper.activeIndex)
			}}
			// @ts-ignore
			onSwiper={(swiper) => setSwiperInit(swiper)}
		>
			{slides}
		</Swiper>
		<SliderControl maxSlides={slides.length - 1} activeSlideIndex={activeSlide}/>
	</div>;
};

export default Slider;
