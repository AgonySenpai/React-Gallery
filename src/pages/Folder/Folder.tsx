import * as React from 'react';
import {
	IonContent,
	IonHeader,
	IonInfiniteScroll,
	IonPage,
} from '@ionic/react';
import { Toolbar } from '../../components/Toolbar/ToolBar';
import FolderContainer from '../../components/FolderContainer/FolderContainer';
import { useParams } from 'react-router';

type MyProps = {};

const Folder: React.FC<MyProps> = (_props: MyProps) => {
	const { nameFolder } = useParams<{ nameFolder: string }>();
	return (
		<IonPage>
			<IonHeader>
				<Toolbar title={nameFolder} />
			</IonHeader>
			<IonContent>
				<FolderContainer nameFolder={nameFolder} />
				<IonInfiniteScroll />
			</IonContent>
		</IonPage>
	);
};

export default Folder;
