const initialState = { Images: [] };

const reducer = (state = initialState, action: any) => {
	if (action.type === 'UPDATE_IMAGES') {
		return { ...state, Images: action.payload };
	}
	return initialState;
};

export const getImages = (state: any) => state.imageReducer.Images;

export default reducer;
