import { createStore, combineReducers } from 'redux';
import iconsReducer from '../ToolbarIcon/Reducer';
const reducers = combineReducers({
	iconsReducer,
});

const store = createStore(
	reducers,
	// @ts-ignore
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
