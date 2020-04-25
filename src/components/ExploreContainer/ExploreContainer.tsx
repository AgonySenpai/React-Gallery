import React, { useEffect, useMemo, useState } from 'react';
import './ExploreContainer.scss';
import { IonGrid, IonLoading, IonRow } from '@ionic/react';
import { connect } from 'react-redux';
import {
	getIconModeList,
	getIconModeOrder,
	getTypeOrder,
} from '../../Redux/ToolbarIcon/Reducer';
import { enumModeList } from '../Toolbar/ToolBar';
import FolderComponent from './Folder/FolderComponent';
import { useQuery } from '@apollo/client';
import { Query } from '../../Utils/Query';
import { sortArray } from '../../Utils/Sorter';

interface MyProps {
	modeOrder?: string;
	modeList?: string;
	modeTypeOrder?: string;
}

type Folder = {
	name: string;
	path?: string;
	id: number;
	createdAt: Date;
	updatedAt?: Date;
	size: number;
};

const ExploreContainer: React.FC<MyProps> = (props: MyProps) => {
	const [folders, setFolders] = useState<Array<Folder>>([]);
	const { data, error, loading } = useQuery<{ getFolders: Array<Folder> }>(
		Query.FolderQuery,
	);
	const [showLoading, setShowLoading] = useState(loading);

	useMemo(() => {
		if (data) {
			console.log(error);
			setFolders(data.getFolders);
			setShowLoading(false);
		}
	}, [data]);

	// Ordenar Carpetas
	useEffect(() => {
		if (folders.length !== 0) {
			const { modeOrder, modeTypeOrder } = props;
			setFolders(sortArray(modeTypeOrder, modeOrder, folders, 'folders'));
		}
	}, [props.modeList, props.modeOrder, props.modeTypeOrder, folders.length]);

	const sizeCol: '6' | '12' = props.modeList === enumModeList.Grid ? '6' : '12';
	return (
		<>
			<IonLoading
				isOpen={showLoading}
				onDidDismiss={() => setShowLoading(false)}
				message={'Please wait...'}
			/>
			<IonGrid className='wrapper'>
				<IonRow>
					{folders.map((folder) => (
						<FolderComponent
							key={folder.name}
							name={folder.name}
							sizeCol={sizeCol}
						/>
					))}
				</IonRow>
			</IonGrid>
		</>
	);
};

const mapStateToProps = (state: any) => ({
	modeOrder: getIconModeOrder(state),
	modeList: getIconModeList(state),
	modeTypeOrder: getTypeOrder(state),
});

export default connect(mapStateToProps)(ExploreContainer);
