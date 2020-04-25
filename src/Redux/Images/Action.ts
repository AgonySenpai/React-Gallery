export const setImages = (Images: Array<any>) => {
	return {
		type: 'UPDATE_IMAGES',
		payload: Images,
	};
};
