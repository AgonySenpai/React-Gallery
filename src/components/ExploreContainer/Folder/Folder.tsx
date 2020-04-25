import * as React from 'react';
import { IonCol, IonIcon, IonItem } from '@ionic/react';
import { folderOpen } from 'ionicons/icons';

type MyProps = {
	sizeCol: string;
	name: string;
};

const Folder: React.FC<MyProps> = (props: MyProps) => {
	const { sizeCol, name } = props;
	return (
		<IonCol size={sizeCol}>
			<IonItem href={`/Folder/${name}`} className='FolderItem' lines='full'>
				<div className='Folder'>
					<IonIcon icon={folderOpen} />
					{name}
				</div>
			</IonItem>
		</IonCol>
	);
};

export default Folder;
