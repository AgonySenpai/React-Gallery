import * as React from 'react';
import { IonCol, IonIcon, IonItem } from '@ionic/react';
import { folderOpen } from 'ionicons/icons';

type MyProps = {
	sizeCol: string;
	name: string;
};

const FolderComponent: React.FC<MyProps> = (props: MyProps) => {
	const { sizeCol, name } = props;
	let classNameGrid = '';
	if (sizeCol === '12') classNameGrid = 'GridExploreContainer';
	return (
		<IonCol size={sizeCol}>
			<IonItem
				href={`/Folder/${name}`}
				className={`FolderItem ${classNameGrid}`}
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
