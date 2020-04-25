import * as React from 'react';
import { IonCol, IonIcon, IonItem } from '@ionic/react';
import { folderOpen } from 'ionicons/icons';
import { useHistory } from 'react-router';

type MyProps = {
	sizeCol: string;
	name: string;
};

const FolderComponent: React.FC<MyProps> = (props: MyProps) => {
	const { sizeCol, name } = props;
	const history = useHistory();
	return (
		<IonCol size={sizeCol}>
			<IonItem
				onClick={() => {
					history.push(`/Folder/${name}`);
				}}
				className={`FolderItem ${
					sizeCol === '12' ? 'GridExploreContainer' : ''
				}`}
				lines={'inset'}
				mode={'ios'}>
				<div className='Folder'>
					<IonIcon icon={folderOpen} />
					{name}
				</div>
			</IonItem>
		</IonCol>
	);
};

export default FolderComponent;
