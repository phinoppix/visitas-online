import { jsonColumnPredicate } from './misc';
import { ColumnValuePair } from './sqlClient';

export const tagsColumnPredicate = {
	'tags': jsonColumnPredicate
};

export const toContact = (data: ColumnValuePair | undefined | null, territoryId: string | undefined | null, divisionId: string | undefined | null): any =>
	data && ({
		...data,
		phoneNumber: undefined,
		email: undefined,
		territory_id: undefined,
		territory_code: undefined,
		territory_name: undefined,
		contact_info: {
			phoneNumber: data!.phoneNumber,
			email: data!.email
		},
		territory: (territoryId || data.territory_id) ? {
			id: (territoryId || data.territory_id),
			name: data.territory_name || '',
			code: data.territory_code || ''
		} : undefined,
		division: divisionId ? {
			id: divisionId,
			name: ''
		} : undefined
	});