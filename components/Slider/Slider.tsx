import styles from './Slider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Controller } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { EventHandler, useEffect, useState } from "react";

interface SliderControlProps {
	activeSlideIndex: number
	action?: any
	maxSlides:number
}


const Slider = ({items}:any) => {
	const [activeSlide, setActiveSlide] = useState(0);
	const [activeSlider, setActiveSlider] = useState(0);
	const slides = items.map((it:any) => <SwiperSlide style={{maxWidth: "420px"}} key={it.id}>{it}</SwiperSlide>)
	// slides.push(<SwiperSlide style={{opacity: 0}} key={"last"}>{items[1]}</SwiperSlide>)
	useEffect(() => {
		if(swiperInit){

			// @ts-ignore
			swiperInit.slideTo(activeSlide, 500, () => console.log('Callback'))
		}
	}, [activeSlide])
	const SliderControl = ({activeSlideIndex, maxSlides, action}:SliderControlProps) => {
		//
		const handleActiveIndex = (event:any) => {
			// setActiveSlider(event.target.value)
			setActiveSlide(event.target.value);
			console.log(event)
		}
		// action =  handleActiveIndex
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
					// onChange={handleActiveIndex}
				/>
				{/*<label htmlFor="volume">Active slide: {activeSlideIndex}, maxSlides : {maxSlides}</label>*/}
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
