import {gql} from 'apollo-boost';
import {getClient, query} from 'svelte-apollo';

const QUERY_TAGS = gql`query {
    tags {
        tag
    }
}`;

export async function getTags() {
	const client = getClient();
	const qry = await query(client, {
		query: QUERY_TAGS
	});
	return qry.result();
}