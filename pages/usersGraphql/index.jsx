import { useEffect } from "react";
import { 
	ApolloClient, 
	InMemoryCache, 
	ApolloProvider,
	split, 
	HttpLink
} from '@apollo/client';
import { persistCache } from "apollo-cache-persist";
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

import FindByGraphql from "../../graphql/FindByGraphql";
import InsertByGraphql from "../../graphql/InsertByGraphql";

const cache = new InMemoryCache()

export default function List() {

	useEffect(() => {
		if (localStorage['apollo-chace-persist']) {
			let cacheData = JSON.parse(localStorage['apollo-chace-persist'])
			cache.restore(cacheData)
		} else persistCache({ cache, storage: localStorage})
	}, [])


	// const httpLink = new HttpLink({
	// 	uri: 'http://localhost:4000/graphql'
	// });
	  
	const wsLink = new GraphQLWsLink(createClient({
		url: 'ws://localhost:4000/graphql',
	}));
	
	const httpLink = createUploadLink({
		uri: "http://localhost:4000/graphql",
	})

	// The split function takes three parameters:
	//
	// * A function that's called for each operation to execute
	// * The Link to use for an operation if the function returns a "truthy" value
	// * The Link to use for an operation if the function returns a "falsy" value
	const splitLink = split(
		({ query }) => {
			const definition = getMainDefinition(query);
			return (
				definition.kind === 'OperationDefinition' &&
				definition.operation === 'subscription'
			);
		},
		wsLink,
		httpLink,
	);
	
	const client = new ApolloClient({
		link: splitLink,
		//cache: new InMemoryCache()
		cache
	});

	// const client = new ApolloClient({ 
	// 	uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`, 
	// 	//cache: new InMemoryCache(),
	// 	cache
	// })

	return (
		<ApolloProvider client={client}>
			<FindByGraphql cache={cache} />
			<br />
			<InsertByGraphql/>
		</ApolloProvider>
	)
}