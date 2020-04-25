import * as React from 'react';
import {
	IonButtons,
	IonIcon,
	IonItem,
	IonMenuButton,
	IonTitle,
	IonPopover,
	IonToolbar,
} from '@ionic/react';
import {
	chevronDown,
	chevronUp,
	ellipsisVertical,
	list,
	grid,
	search,
} from 'ionicons/icons';
import './Toolbar.scss';
import { connect } from 'react-redux';
import { useState } from 'react';
import {
	updateIconModeList,
	updateIconModeOrder,
	updateTypeOder,
} from '../../Redux/ToolbarIcon/Action';
import {
	getIconModeList,
	getIconModeOrder,
	getTypeOrder,
} from '../../Redux/ToolbarIcon/Reducer';
import { ButtonsWithButton } from '../Buttons/ButtonsWithButton';

type MyProps = {
	title: string;
	updateIconModeList(icon: string): void;
	updateIconModeOrder(icon: string): void;
	updateTypeOder(type: string): void;
	modeOrder: string;
	modeList: string;
	modeTypeOrder: string;
};

export enum enumModeOrder {
	Desc = 'Descending',
	Asc = 'Ascending',
}

export enum enumModeList {
	List = 'List',
	Grid = 'Grid',
}

export enum enumTypeOrder {
	Name = 'Nombre',
	Modify = 'Modificación',
	Size = 'Tamaño',
}

const MyToolbar: React.FC<MyProps> = (props: MyProps) => {
	const [showPopOver, setShowPopOver] = useState(false);
	const [popOverEvent, setPopOverEvent] = useState<undefined | Event>(
		undefined,
	);
	const { title, modeOrder, modeList, modeTypeOrder } = props;

	const handleToggleModeOrder = () => {
		props.updateIconModeOrder(
			modeOrder === enumModeOrder.Desc ? enumModeOrder.Asc : enumModeOrder.Desc,
		);
	};

	const handleToggleModeList = () => {
		props.updateIconModeList(
			modeList === enumModeList.Grid ? enumModeList.List : enumModeList.Grid,
		);
	};

	const togglePopOver = (show: boolean, event: Event | undefined) => {
		setPopOverEvent(event);
		setShowPopOver(show);
	};
	return (
		<>
			<IonToolbar color='primary'>
				<IonButtons slot='start'>
					<IonMenuButton
						autoHide={false}
						color='dark'
						slot='start'
						menu='firstMenu'
					/>
				</IonButtons>
				<IonTitle>{title}</IonTitle>

				<IonButtons slot='end'>
					<ButtonsWithButton icon={search} />
					<ButtonsWithButton
						icon={modeList === enumModeList.List ? list : grid}
						onClick={handleToggleModeList}
					/>
					<ButtonsWithButton icon={ellipsisVertical} />
				</IonButtons>
			</IonToolbar>
			<IonItem className='Mode'>
				<p onClick={(e) => togglePopOver(true, e.nativeEvent)}>
					{modeTypeOrder}
				</p>
				<IonPopover
					translucent
					animated
					event={popOverEvent}
					isOpen={showPopOver}
					onDidDismiss={() => togglePopOver(false, undefined)}>
					{Object.values(enumTypeOrder).map((type) => (
						<IonItem
							lines={'full'}
							key={type}
							onClick={() => {
								togglePopOver(false, undefined);
								props.updateTypeOder(type);
							}}>
							<p>{type}</p>
						</IonItem>
					))}
				</IonPopover>

				<IonIcon
					onClick={handleToggleModeOrder}
					size={'large'}
					icon={modeOrder === enumModeOrder.Asc ? chevronUp : chevronDown}
				/>
			</IonItem>
		</>
	);
};

const mapStateToProps = (state: any) => ({
	modeOrder: getIconModeOrder(state),
	modeList: getIconModeList(state),
	modeTypeOrder: getTypeOrder(state),
});

export const Toolbar = connect(mapStateToProps, {
	updateIconModeOrder,
	updateIconModeList,
	updateTypeOder,
})(MyToolbar);
