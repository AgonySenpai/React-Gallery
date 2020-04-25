import {
	enumModeList,
	enumModeOrder,
	enumTypeOrder,
} from '../../components/Toolbar/ToolBar';

const initialState = {
	IconModeOrder: enumModeOrder.Desc,
	IconModeList: enumModeList.Grid,
	updateTypeOrder: enumTypeOrder.Name,
};

const reducer = (state = initialState, action: any) => {
	if (action.type === 'UPDATE_ICON_ORDER') {
		return { ...state, IconModeOrder: action.payload };
	}
	if (action.type === 'UPDATE_ICON_LIST') {
		return { ...state, IconModeList: action.payload };
	}
	if (action.type === 'UPDATE_TYPE_ORDER') {
		return { ...state, updateTypeOrder: action.payload };
	}
	return state;
};

export const getIconModeOrder = (state: any) =>
	state.iconsReducer.IconModeOrder;

export const getIconModeList = (state: any) => state.iconsReducer.IconModeList;

export const getTypeOrder = (state: any) => state.iconsReducer.updateTypeOrder;

export default reducer;
