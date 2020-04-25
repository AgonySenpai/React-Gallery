import { IonContent, IonHeader, IonPage } from '@ionic/react';
import React from 'react';
import ExploreContainer from '../../components/ExploreContainer/ExploreContainer';
import './Home.scss';
import { Toolbar } from '../../components/Toolbar/ToolBar';

type Props = {};

const Home: React.FC<Props> = (_props: Props) => (
	<IonPage>
		<IonHeader>
			<Toolbar title='Inicio' />
		</IonHeader>
		<IonContent>
			<ExploreContainer />
		</IonContent>
	</IonPage>
);

export default Home;
