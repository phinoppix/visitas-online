import ApolloClient from 'apollo-boost';
import {setClient} from 'svelte-apollo';

import {appConfig} from './appConfig';

// We are already using apollo-boost, which comes with caching and apollo-link-http. However,
// apollo-boost does not allow modifying link-http so we will need to add the header this way
// as per documentation.
// Ref: 1) https://www.apollographql.com/docs/react/get-started/#apollo-boost
//      2) https://www.apollographql.com/docs/react/networking/authentication/#header
const client = new ApolloClient({
	uri: appConfig.beUrl,
	request: operation => {
		const token = (JSON.parse(localStorage.getItem('okta-token-storage')) || {})
			.access_token.accessToken;
		operation.setContext({
			headers: {
				authorization: token ? `Bearer ${token}`: ''
			}
		});
	}
});

// We need to call setClient inside a svelte component.
const initApolloClient = () => setClient(client);

export {client, initApolloClient};