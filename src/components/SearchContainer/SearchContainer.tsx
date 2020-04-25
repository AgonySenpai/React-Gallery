import * as React from 'react';
import { IonGrid, IonLoading, IonRow } from '@ionic/react';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { enumModeList } from '../Toolbar/ToolBar';
import {
	getIconModeList,
	getIconModeOrder,
	getTypeOrder,
} from '../../Redux/ToolbarIcon/Reducer';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/client';
import { Query } from '../../Utils/Query';
import { sortArray } from '../../Utils/Sorter';
import Media from '../Media/Media';
import SearchComponent from './searchComponent';
import { useParams } from 'react-router';

type MyProps = {
	modeList?: string;
	modeOrder?: string;
	modeTypeOrder?: string;
	mode: string;
};

const SearchContainer: React.FC<MyProps> = (props: MyProps) => {
	const { mode } = useParams();
	const [content, setContent] = useState<Array<any>>([]);
	const { loading, data, error } = useQuery<{
		searchContent: { resources: Array<any> };
	}>(Query.searchContentQuery, {
		variables: {
			mode,
		},
	});
	const [showLoading, setShowLoading] = useState<boolean>(loading);

	useMemo(() => {
		if (data !== undefined) {
			setShowLoading(false);
			setContent(Array.from(data.searchContent.resources.slice()));
		}
	}, [mode, data?.searchContent.resources.length]);

	// Ordenar Imagenes
	useEffect(() => {
		if (content != null && content.length !== 0) {
			setContent(sortArray(props.modeTypeOrder, props.modeOrder, content));
		}
	}, [props.modeList, props.modeOrder, props.modeTypeOrder, data]);

	const sizeCol: '6' | '12' = props.modeList === enumModeList.Grid ? '6' : '12';
	return (
		<>
			<IonLoading
				isOpen={showLoading}
				onDidDismiss={() => setShowLoading(false)}
				message={'Espere...'}
			/>
			<IonGrid>
				<IonRow>
					{content.map((item) => {
						return (
							<Media
								key={item.filename}
								src={item.secure_url}
								sizeCol={sizeCol}
								type={item.resource_type}
							/>
						);
					})}
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

export default connect(mapStateToProps)(SearchContainer);
