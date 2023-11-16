import React from 'react';
import Script from "next/script";
import styles from './Map.module.scss'
const MapBasics = () => {

	return (
		<>
			<Script strategy={"beforeInteractive"}  src="https://maps.api.2gis.ru/2.0/loader.js"/>
			<Script type="text/javascript" id={'ya-maps'}  dangerouslySetInnerHTML={{
				__html: `
					var map;

					DG.then(function () {
					map = DG.map('map', {
						center: [55.101880, 60.126850],
						zoom: 17
					});
					// DG.marker([55.101880, 60.126850]).addTo(map).bindLabel("I'm there!!!")
					DG.popup()
                          .setLatLng(map.getCenter())
                          .setContent('<strong style="font-size: large">StandartGroup</strong><br/> 456300 Челябинская область, г. Миасс Тургоякское шоссе, 2/25')
                          .openOn(map)
					
				});`}}
			/>
		<div className={styles.map} id={"map"} style={{width: "100%", height: "550px", gridColumn: "1/-1"}}>

		</div></>
	)
};

export default MapBasics;
