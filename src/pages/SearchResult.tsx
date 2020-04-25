import React from 'react';
import { useParams } from 'react-router';
import {
	IonContent,
	IonHeader,
	IonInfiniteScroll,
	IonPage,
} from '@ionic/react';
import { Toolbar } from '../components/Toolbar/ToolBar';
import SearchContainer from '../components/SearchContainer/SearchContainer';

type MyProps = {};

const SearchResult: React.FC<MyProps> = (_props: MyProps) => {
	const { mode } = useParams<{ mode: string }>();

	let title: string = '';
	if (mode === 'image') title = 'Imagenes';
	else if (mode === 'video') title = 'Videos';
	else if (mode === 'recent') title = 'Recientes';

	return (
		<IonPage>
			<IonHeader>
				<Toolbar title={title} />
			</IonHeader>
			<IonContent>
				<SearchContainer mode={mode} />
				<IonInfiniteScroll />
			</IonContent>
		</IonPage>
	);
};

export default SearchResult;
