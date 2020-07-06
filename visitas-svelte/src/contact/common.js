import {onMount} from 'svelte';
import {getClient} from 'svelte-apollo';

import * as svcTags from '../data-services/tags';
import * as store from '../store';

export const initTagsOnMount = () => {
	onMount(() => {
		const client = getClient();
		svcTags.getTags(client).then(result => {
			store.tags.set(result.data.tags);
		});
	})
};