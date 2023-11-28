import styles from 'components/Video/Video.module.scss';
import React, { PropsWithChildren } from 'react';
import ReactPlayer from 'react-player';

function Video(props:any) {
	const Wr = (children: PropsWithChildren) => <>{children}</>
	return (
		<div className={styles.container}>
			<ReactPlayer
				url={props.src}
				width="1280"
				height="720"
				muted
				loop
				playing
				// @ts-ignore
				wrapper={'span'}
				// playbackRate={0.5}
			/>
		</div>
	);
}

export default Video;
