import styles from './Video.module.css';
import React from 'react';
import ReactPlayer from 'react-player';

function Video(props:any) {
	return (
		<div className={styles.container}>
			<ReactPlayer
				url={props.src}
				width="1280"
				height="720"
				muted
				loop
				playing
				// playbackRate={0.5}
			/>
		</div>
	);
}

export default Video;
