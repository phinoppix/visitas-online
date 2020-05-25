import {writable} from 'svelte/store';

export const contactsLoaded$ = writable(false);
export const territoriesLoaded$ = writable(false);

export const territories$ = writable([], () => {
	territoriesLoaded$.set(true);
});

export const contacts$ = writable([], () => {
	contactsLoaded$.set(true);
});

export const tags$ = writable([]);