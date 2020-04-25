import * as React from 'react';
import { IonGrid, IonLoading, IonRow } from '@ionic/react';
import { connect } from 'react-redux';
import { enumModeList } from '../Toolbar/ToolBar';
import {
	getIconModeList,
	getIconModeOrder,
	getTypeOrder,
} from '../../Redux/ToolbarIcon/Reducer';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Query } from '../../Utils/Query';
import { sortArray } from '../../Utils/Sorter';
import Media from '../Media/Media';

type MyProps = {
	modeList: string;
	modeOrder: string;
	modeTypeOrder: string;
	nameFolder: string;
};

const FolderContainer: React.FC<MyProps> = (props: MyProps) => {
	const [images, setImages] = useState<Array<any>>([]);
	const { error, data, loading } = useQuery<{
		searchImagesInFolder: { resources: Array<any> };
	}>(Query.getFolderContent, {
		variables: { folder: props.nameFolder },
	});
	const [showLoading, setShowLoading] = useState(loading);
	useEffect(() => {
		if (data) {
			setImages(data.searchImagesInFolder.resources);
			setShowLoading(false);
		}
		console.log(error);
	}, [data]);

	// Ordenar Imagenes
	useLayoutEffect(() => {
		if (images.length !== 0) {
			const { modeTypeOrder, modeOrder } = props;
			setImages(sortArray(modeTypeOrder, modeOrder, images));
		}
	}, [props.modeList, props.modeOrder, props.modeTypeOrder]);

	const IonSize: '6' | '12' = props.modeList === enumModeList.Grid ? '6' : '12';
	return (
		<>
			<IonLoading
				isOpen={showLoading}
				onDidDismiss={() => setShowLoading(false)}
				message={'Espere...'}
			/>
			<IonGrid>
				<IonRow>
					{images.map((item) => (
						<Media
							src={item.secure_url}
							sizeCol={IonSize}
							key={item.filename}
							type={item.resource_type}
						/>
					))}
				</IonRow>
			</IonGrid>
		</>
	);
};

const mapStateToProps = (state: any) => ({
	modeList: getIconModeList(state),
	modeOrder: getIconModeOrder(state),
	modeTypeOrder: getTypeOrder(state),
});

export default connect(mapStateToProps)(FolderContainer);
