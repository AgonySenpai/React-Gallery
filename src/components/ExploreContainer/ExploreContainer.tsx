import React, { useEffect, useState } from 'react';
import './ExploreContainer.scss';
import { IonGrid, IonRow } from '@ionic/react';
import axios, { AxiosResponse } from 'axios';
import { connect } from 'react-redux';
import { env } from '../../react-env';
import {
	getIconModeList,
	getIconModeOrder,
	getTypeOrder,
} from '../../Redux/ToolbarIcon/Reducer';
import { enumModeList, enumModeOrder, enumTypeOrder } from '../Toolbar/ToolBar';
import FolderComponent from './Folder/FolderComponent';

type responseFolders = {
	folders: Array<Folder>;
};

interface MyProps {
	modeOrder?: string;
	modeList?: string;
	modeTypeOrder?: string;
}

type Folder = {
	name: string;
	path: string;
	id: number;
	createdAt: Date;
	updatedAt: Date;
	size: number;
};

const ExploreContainer: React.FC<MyProps> = (props: MyProps) => {
	const [folders, setFolders] = useState<Array<Folder>>([]);

	useEffect(() => {
		const fetchData = async () => {
			if (folders.length === 0) {
				const response: AxiosResponse<responseFolders> = await axios.get(
					`${env.urlSever}folders`,
				);
				if (response.data.folders) {
					const foldersResponse = response.data.folders;
					setFolders(foldersResponse);
				}
			}
		};
		fetchData();
	}, [folders.length]);

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

	const sortFolders = (method: (a: Folder, b: Folder) => number) => {
		let sortedFolders = folders.slice().sort(method);
		setFolders(sortedFolders);
	};

	return (
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
	);
};

const mapStateToProps = (state: any) => ({
	modeOrder: getIconModeOrder(state),
	modeList: getIconModeList(state),
	modeTypeOrder: getTypeOrder(state),
});

export default connect(mapStateToProps)(ExploreContainer);
