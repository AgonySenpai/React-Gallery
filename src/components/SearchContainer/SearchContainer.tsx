import * as React from 'react';
import { IonGrid, IonLoading, IonRow } from '@ionic/react';
import { useEffect, useState } from 'react';
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

type MyProps = {
	modeList?: string;
	modeOrder?: string;
	modeTypeOrder?: string;
	mode: string;
};

const SearchContainer: React.FC<MyProps> = (props: MyProps) => {
	const [content, setContent] = useState<Array<any>>([]);
	const { loading, data, error } = useQuery<{
		searchContent: { resources: Array<any> };
	}>(Query.searchContentQuery, {
		variables: {
			mode: props.mode,
		},
	});
	const [showLoading, setShowLoading] = useState<boolean>(loading);

	useEffect(() => {
		if (data) {
			console.log(error);
			console.log(data);
			setContent(data.searchContent.resources);
			setShowLoading(false);
		}
	}, [data]);

	// Ordenar Imagenes
	useEffect(() => {
		if (content.length !== 0) {
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
					{content.map((item) => (
						<Media
							key={item.filename}
							src={item.secure_url}
							sizeCol={sizeCol}
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

export default connect(mapStateToProps)(SearchContainer);
