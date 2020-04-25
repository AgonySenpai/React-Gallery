import * as React from 'react';
import './Menu.scss';
import {
	IonContent,
	IonHeader,
	IonItem,
	IonList,
	IonMenu,
	IonTitle,
	IonToolbar,
	IonButtons,
	IonMenuButton,
	IonIcon,
} from '@ionic/react';
import { folderOpen, image, timeOutline, videocam } from 'ionicons/icons';

type MyProps = {
	children: React.ReactElement;
};

export const Menu: React.FC<MyProps> = (props: MyProps) => {
	return (
		<>
			<IonMenu side='start' menuId='firstMenu' contentId={'menu'}>
				<IonHeader>
					<IonToolbar>
						<IonButtons slot='end'>
							<IonMenuButton color='light' menu='first' />
						</IonButtons>
						<IonTitle>Archivos</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonContent>
					<IonList>
						<IonItem lines={'full'} href={'home'}>
							<IonIcon icon={folderOpen} slot={'start'} />
							Carpetas
						</IonItem>
						<IonItem lines={'full'} href={'Search/image'}>
							<IonIcon icon={image} slot={'start'} />
							Imágenes
						</IonItem>
						<IonItem lines={'full'} href={'Search/video'}>
							<IonIcon icon={videocam} slot={'start'} />
							Videos
						</IonItem>
						<IonItem lines={'full'} href={'Search/recent'}>
							<IonIcon icon={timeOutline} slot={'start'} />
							Reciente
						</IonItem>
					</IonList>
				</IonContent>
			</IonMenu>
			{props.children}
		</>
	);
};
