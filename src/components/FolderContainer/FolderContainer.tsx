import * as React from 'react';
import { IonCol, IonGrid, IonImg, IonRow } from '@ionic/react';
import { connect } from 'react-redux';
import { enumModeList, enumModeOrder, enumTypeOrder } from '../Toolbar/ToolBar';
import {
	getIconModeList,
	getIconModeOrder,
	getTypeOrder,
} from '../../Redux/ToolbarIcon/Reducer';
import { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';
import { env } from '../../react-env';

type MyProps = {
	modeList: string;
	modeOrder: string;
	modeTypeOrder: string;
	nameFolder: string;
};

const FolderContainer: React.FC<MyProps> = (props: MyProps) => {
	const [images, setImages] = useState<Array<any>>([]);
	useEffect(() => {
		const fetch = async () => {
			if (images.length === 0) {
				const response = await axios.get(
					`${env.urlSever}Images/${props.nameFolder}`,
				);
				if (response.data.Images) {
					const { Images } = response.data;
					setImages(Images);
				}
			}
		};
		fetch();
	}, [props.modeOrder, props.modeTypeOrder, props.modeList]);

	// Ordenar Imagenes
	useLayoutEffect(() => {
		if (images.length !== 0) {
			// SortBy Name
			if (props.modeTypeOrder === enumTypeOrder.Name) {
				if (props.modeOrder === enumModeOrder.Desc) {
					sortImages((a, b) => (a.filename < b.filename ? -1 : 1));
				} else if (props.modeOrder === enumModeOrder.Asc) {
					sortImages((a, b) => (b.filename < a.filename ? -1 : 1));
				}
				// SortBy Size
			} else if (props.modeTypeOrder === enumTypeOrder.Size) {
				if (props.modeOrder === enumModeOrder.Desc) {
					sortImages((a, b) => b.bytes - a.bytes);
				} else if (props.modeOrder === enumModeOrder.Asc) {
					sortImages((a, b) => a.bytes - b.bytes);
				}
				// SortBy Modified
			} else if (props.modeTypeOrder === enumTypeOrder.Modify) {
				if (props.modeOrder === enumModeOrder.Desc) {
					sortImages((a, b) =>
						Date.parse(a.createdAt) < Date.parse(b.createdAt) ? -1 : 1,
					);
				} else if (props.modeOrder === enumModeOrder.Asc) {
					sortImages((a, b) =>
						Date.parse(b.createdAt) < Date.parse(a.createdAt) ? -1 : 1,
					);
				}
			}
		}
	}, [props.modeList, props.modeOrder, props.modeTypeOrder]);

	const sortImages = (method: (a: any, b: any) => number) => {
		let sortedImages = images.slice().sort(method);
		setImages(sortedImages);
	};

	const IonSize: string = props.modeList === enumModeList.Grid ? '6' : '12';
	return (
		<IonGrid>
			<IonRow>
				{images.map((img) => {
					return (
						<IonCol size={IonSize} key={(img.version - img.bytes).toFixed(0)}>
							<IonImg src={img.secure_url} />
						</IonCol>
					);
				})}
			</IonRow>
		</IonGrid>
	);
};

const mapStateToProps = (state: any) => ({
	modeList: getIconModeList(state),
	modeOrder: getIconModeOrder(state),
	modeTypeOrder: getTypeOrder(state),
});

export default connect(mapStateToProps)(FolderContainer);
