export const updateIconModeOrder = (icon: string) => {
	return {
		type: 'UPDATE_ICON_ORDER',
		payload: icon,
	};
};
export const updateIconModeList = (icon: string) => {
	return {
		type: 'UPDATE_ICON_LIST',
		payload: icon,
	};
};

export const updateTypeOder = (type: string) => {
	return {
		type: 'UPDATE_TYPE_ORDER',
		payload: type,
	};
};
