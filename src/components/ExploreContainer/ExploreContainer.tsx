import React, { useEffect, useState } from 'react';
import './ExploreContainer.scss';
import { IonGrid, IonLoading, IonRow } from '@ionic/react';
import { connect } from 'react-redux';
import {
	getIconModeList,
	getIconModeOrder,
	getTypeOrder,
} from '../../Redux/ToolbarIcon/Reducer';
import { enumModeList, enumModeOrder, enumTypeOrder } from '../Toolbar/ToolBar';
import FolderComponent from './Folder/FolderComponent';
import { gql, useQuery } from '@apollo/client';

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

const FolderQuery = gql`
	query {
		getFolders {
			id
			name
			createdAt
			size
		}
	}
`;

const ExploreContainer: React.FC<MyProps> = (props: MyProps) => {
	const [folders, setFolders] = useState<Array<Folder>>([]);
	const { data, error, loading } = useQuery<{ getFolders: Array<Folder> }>(
		FolderQuery,
	);
	const [showLoading, setShowLoading] = useState(loading);

	useEffect(() => {
		if (data) {
			setFolders(data.getFolders);
			setShowLoading(false);
		}
	}, [data]);

	// Ordenar Carpetas
	useEffect(() => {
		if (folders.length !== 0) {
			// SortBy Name
			if (props.modeTypeOrder === enumTypeOrder.Name) {
				if (props.modeOrder === enumModeOrder.Desc) {
					sortFolders((a, b) => (a.name < b.name ? -1 : 1));
				} else if (props.modeOrder === enumModeOrder.Asc) {
					sortFolders((a, b) => (b.name < a.name ? -1 : 1));
				}
				// SortBy Size
			} else if (props.modeTypeOrder === enumTypeOrder.Size) {
				if (props.modeOrder === enumModeOrder.Desc) {
					sortFolders((a, b) => b.size - a.size);
				} else if (props.modeOrder === enumModeOrder.Asc) {
					sortFolders((a, b) => a.size - b.size);
				}
				// SortBy Modified
			} else if (props.modeTypeOrder === enumTypeOrder.Modify) {
				if (props.modeOrder === enumModeOrder.Desc) {
					sortFolders((a, b) => (a.createdAt < b.createdAt ? -1 : 1));
				} else if (props.modeOrder === enumModeOrder.Asc) {
					sortFolders((a, b) => (b.createdAt < a.createdAt ? -1 : 1));
				}
			}
		}
	}, [props.modeList, props.modeOrder, props.modeTypeOrder, folders.length]);

	function sortFolders(method: (a: Folder, b: Folder) => number) {
		let sortedFolders = folders.slice().sort(method);
		setFolders(sortedFolders);
	}

	return (
		<>
			<IonLoading
				isOpen={showLoading}
				onDidDismiss={() => setShowLoading(false)}
				message={'Please wait...'}
			/>
			<IonGrid className='wrapper'>
				<IonRow>
					{props.modeList === enumModeList.Grid
						? folders.map((folder) => {
								return (
									<FolderComponent
										key={folder.id}
										sizeCol={'6'}
										name={folder.name}
									/>
								);
						  })
						: folders.map((folder) => {
								return (
									<FolderComponent
										key={folder.id}
										sizeCol={'12'}
										className={'GridExploreContainer'}
										name={folder.name}
									/>
								);
						  })}
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
