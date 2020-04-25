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
import { useHistory } from 'react-router';
import { menuController } from '@ionic/core';

type MyProps = {
	children: React.ReactElement;
};

export const Menu: React.FC<MyProps> = (props: MyProps) => {
	const history = useHistory();
	const menuCtrl = menuController;

	const menuItemClick = async (route: string) => {
		await menuCtrl.close('firstMenu');
		history.push(route);
	};
	return (
		<>
			<IonMenu
				side='start'
				type={'reveal'}
				menuId='firstMenu'
				contentId={'menu'}>
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
						<IonItem lines={'full'} onClick={() => menuItemClick('/home')}>
							<IonIcon icon={folderOpen} slot={'start'} />
							Carpetas
						</IonItem>
						<IonItem
							lines={'full'}
							onClick={() => menuItemClick('/Search/image')}>
							<IonIcon icon={image} slot={'start'} />
							Imágenes
						</IonItem>
						<IonItem
							lines={'full'}
							onClick={() => menuItemClick('/Search/video')}>
							<IonIcon icon={videocam} slot={'start'} />
							Videos
						</IonItem>
						<IonItem
							lines={'full'}
							onClick={() => menuItemClick('/Search/recent')}>
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
