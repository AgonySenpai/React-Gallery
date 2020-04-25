import * as React from 'react';
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { env } from '../../react-env';
import { enumModeList, enumModeOrder, enumTypeOrder } from '../Toolbar/ToolBar';
import {
	getIconModeList,
	getIconModeOrder,
	getTypeOrder,
} from '../../Redux/ToolbarIcon/Reducer';
import { connect } from 'react-redux';

type MyProps = {
	modeList?: string;
	modeOrder?: string;
	modeTypeOrder?: string;
	mode: string;
};

const SearchContainer: React.FC<MyProps> = (props: MyProps) => {
	const [content, setContent] = useState<Array<any>>([]);
	const [
		resultComponent,
		setResultComponent,
	] = useState<React.ReactElement | null>(null);
	// Obtener datos
	useEffect(() => {
		const fetch = async () => {
			if (content.length === 0) {
				const response: AxiosResponse<{
					Content: { resources: Array<any> };
				}> = await axios.get(`${env.urlSever}Find/${props.mode}`);
				if (response.data.Content) {
					const contentResponse = response.data.Content.resources;
					setContent(contentResponse);
				}
			}
		};
		fetch();
	}, [content.length, props.mode]);

	// Ordenar Imagenes
	useEffect(() => {
		if (content.length !== 0) {
			// SortBy Name
			if (props.modeTypeOrder === enumTypeOrder.Name) {
				if (props.modeOrder === enumModeOrder.Desc) {
					sortContent((a, b) => (a.filename < b.filename ? -1 : 1));
				} else if (props.modeOrder === enumModeOrder.Asc) {
					sortContent((a, b) => (b.filename < a.filename ? -1 : 1));
				}
				// SortBy Size
			} else if (props.modeTypeOrder === enumTypeOrder.Size) {
				if (props.modeOrder === enumModeOrder.Desc) {
					sortContent((a, b) => b.bytes - a.bytes);
				} else if (props.modeOrder === enumModeOrder.Asc) {
					sortContent((a, b) => a.bytes - b.bytes);
				}
				// SortBy Modified
			} else if (props.modeTypeOrder === enumTypeOrder.Modify) {
				if (props.modeOrder === enumModeOrder.Desc) {
					sortContent((a, b) =>
						Date.parse(a.createdAt) < Date.parse(b.createdAt) ? -1 : 1,
					);
				} else if (props.modeOrder === enumModeOrder.Asc) {
					sortContent((a, b) =>
						Date.parse(b.createdAt) < Date.parse(a.createdAt) ? -1 : 1,
					);
				}
			}
		}
	}, [props.modeList, props.modeOrder, props.modeTypeOrder]);

	function sortContent(method: (a: any, b: any) => number) {
		let sortedImages = content.slice().sort(method);
		setContent(sortedImages);
	}

	const IonSize: string = props.modeList === enumModeList.Grid ? '6' : '12';

	useEffect(() => {
		if (props.mode === 'image') {
			setResultComponent(() => (
				<>
					{content.map((item) => (
						<IonCol size={IonSize} key={item.filename}>
							<img src={item.secure_url} />
						</IonCol>
					))}
				</>
			));
		} else if (props.mode === 'video') {
			setResultComponent(() => (
				<>
					{content.map((item) => (
						<IonCol size={IonSize} key={item.filename}>
							<video
								src={`${item.secure_url}#t=0.1`}
								controls
								preload={'metadata'}
								width={'100%'}
							/>
						</IonCol>
					))}
				</>
			));
		} else if (props.mode === 'recent') {
			setResultComponent(() => (
				<>
					{content.map((item) => {
						return (
							<IonCol key={item.filename} size={IonSize}>
								{item.resource_type === 'image' ? (
									<img src={item.secure_url} />
								) : (
									<video
										width={'100%'}
										controls
										preload={'metadata'}
										src={`${item.secure_url}#t=0.1`}
									/>
								)}
							</IonCol>
						);
					})}
				</>
			));
		}
	}, [props.mode, content.length]);

	return (
		<IonGrid>
			<IonRow>{resultComponent}</IonRow>
		</IonGrid>
	);
};

const mapStateToProps = (state: any) => ({
	modeList: getIconModeList(state),
	modeOrder: getIconModeOrder(state),
	modeTypeOrder: getTypeOrder(state),
});

export default connect(mapStateToProps)(SearchContainer);
