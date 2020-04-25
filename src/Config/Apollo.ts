import { InMemoryCache, ApolloClient, HttpLink } from '@apollo/client';
import { env } from '../react-env';

const httpLink: HttpLink = new HttpLink({
	uri: `${env.urlSever}graphql`,
});

const cache: InMemoryCache = new InMemoryCache();

export const apolloConfig = new ApolloClient({
	cache,
	link: httpLink,
});
