import * as React from 'react';
import { IonButton, IonIcon } from '@ionic/react';

type MyProps = {
	icon: any;
	onClick?: () => void;
};

export const ButtonsWithButton: React.FC<MyProps> = (props: MyProps) => {
	const { icon, onClick } = props;
	return (
		<IonButton onClick={onClick}>
			<IonIcon icon={icon} />
		</IonButton>
	);
};
