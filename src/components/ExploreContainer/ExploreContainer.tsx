import React, { useEffect, useLayoutEffect, useState } from 'react';
import './ExploreContainer.scss';
import { IonGrid, IonRow } from '@ionic/react';
// eslint-disable-next-line no-unused-vars
import axios, { AxiosResponse } from 'axios';
import { connect } from 'react-redux';
import { env } from '../../react-env';
import {
	getIconModeList,
	getIconModeOrder,
	getTypeOrder,
} from '../../Redux/ToolbarIcon/Reducer';
import { enumModeList, enumModeOrder, enumTypeOrder } from '../Toolbar/ToolBar';
import FolderComponent from '../ExploreContainer/Folder/Folder';

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
					// for (let x = 0; x < foldersResponse.length; x++) {
					// 	foldersResponse[x].id = x;
					// }
					setFolders(foldersResponse);
				}
			}
		};
		fetchData();
	}, [props.modeOrder, props.modeList]);

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
	}, [props.modeList, props.modeOrder, props.modeTypeOrder]);

	const sortFolders = (method: (a: Folder, b: Folder) => number) => {
		let sortedFolders = folders.slice().sort(method);
		setFolders(sortedFolders);
	};

	const IonSize = props.modeList === enumModeList.Grid ? '6' : '12';
	return (
		<IonGrid className='wrapper'>
			<IonRow>
				{folders.map((folder) => {
					return (
						<FolderComponent
							key={folder.id}
							sizeCol={IonSize}
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
