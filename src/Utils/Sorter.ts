import { enumTypeOrder, enumModeOrder } from '../components/Toolbar/ToolBar';

export function sortArray(
	mode: string | undefined,
	order: string | undefined,
	array: Array<any>,
	type = 'cloudinary',
) {
	if (mode === undefined || order === undefined || array.length === 0) {
		return [];
	}
	const myArray = array.slice();
	if (mode === enumTypeOrder.Name) {
		if (order === enumModeOrder.Desc) {
			if (type === 'cloudinary')
				return myArray.sort((a, b) => (a.filename < b.filename ? -1 : 1));
			else return myArray.sort((a, b) => (a.name < b.name ? -1 : 1));
		} else if (order === enumModeOrder.Asc) {
			if (type === 'cloudinary')
				return myArray.sort((a, b) => (b.filename < a.filename ? -1 : 1));
			else return myArray.sort((a, b) => (b.name < a.name ? -1 : 1));
		}
	} else if (mode === enumTypeOrder.Size) {
		if (order === enumModeOrder.Desc) {
			if (type === 'cloudinary')
				return myArray.sort((a, b) => b.bytes - a.bytes);
			else return myArray.sort((a, b) => b.size - a.size);
		} else if (order === enumModeOrder.Asc) {
			if (type === 'cloudinary')
				return myArray.sort((a, b) => a.bytes - b.bytes);
			else return myArray.sort((a, b) => a.size - b.size);
		}
	} else if (mode === enumTypeOrder.Modify) {
		console.log(myArray[0].createdAt);
		if (order === enumModeOrder.Desc) {
			if (type === 'cloudinary')
				return myArray.sort((a, b) =>
					Date.parse(a.created_at) < Date.parse(b.created_at) ? -1 : 1,
				);
			else
				return myArray.sort(
					(a, b) => Number(a.createdAt) - Number(b.createdAt),
				);
		} else if (order === enumModeOrder.Asc) {
			console.log(myArray);
			if (type === 'cloudinary')
				return myArray.sort((a, b) =>
					Date.parse(b.created_at) < Date.parse(a.created_at) ? -1 : 1,
				);
			else
				return myArray.sort(
					(a, b) => Number(b.createdAt) - Number(a.createdAt),
				);
		}
	}
	return [];
}
