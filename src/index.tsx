import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './Redux/Store/Store';
import { ApolloProvider } from '@apollo/client';
import { apolloConfig } from './Config/Apollo';

const Application: React.FC = () => (
	<ApolloProvider client={apolloConfig}>
		<Provider store={store}>
			<App />
		</Provider>
	</ApolloProvider>
);

ReactDOM.render(<Application />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
