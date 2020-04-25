import React from 'react';
import { IonCol } from '@ionic/react';

type IProps = {
	src: string;
	sizeCol: '6' | '12';
	type: 'image' | 'video';
};

const Media: React.FC<IProps> = (props: IProps) => {
	const { sizeCol, src, type } = props;
	return (
		<IonCol size={sizeCol}>
			{type === 'video' ? (
				<video
					controls
					preload={'metadata'}
					width={'100%'}
					src={src + '#t=0.1'}
				/>
			) : (
				<img src={src} />
			)}
		</IonCol>
	);
};

export default Media;
