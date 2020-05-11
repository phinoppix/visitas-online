// Canada address format
const ADDRESS_FORMAT_CA = [
	'street',
	'cityTown',
	'provinceState',
	'country'
];
const STREET_NUMBER_FORMAT = new RegExp(/^\d\w+(-\d\w+)* /);
const POSTALCODE_FORMAT_CA = new RegExp(/\w\d\w\W+\d\w\d$/);

const parserHelper = {
	[0]: part => {
		const match_st_number = part.match(STREET_NUMBER_FORMAT);
		if (!match_st_number) {
			return {
				streetName: part
			};
		} else {
			const streetName = part.slice(match_st_number[0].length);
			const tmpStreet = match_st_number[0];
			const [apartmentNumber, streetNumber] = tmpStreet.indexOf('-') > 0 ?
				tmpStreet.split('-') : [,tmpStreet];

			return {
				apartmentNumber,
				streetNumber: streetNumber && streetNumber.trim(),
				streetName
			};
		}
	},
	[2]: part => {
		const match_postal_code = part.match(POSTALCODE_FORMAT_CA);
		const postalCode = match_postal_code.length > 0 ? match_postal_code[0] : '';
		const provinceState = postalCode === '' ? part : part.slice(0, match_postal_code.index).trim();
		return {
			postalCode,
			provinceState
		};
	}
}

export function parseAddress(place_name) {
	if (!place_name || place_name.length === 0) return null;
	return place_name
		.split(',')
		.reduce((acc, cur, idx) => {
			const objMerge = parserHelper[idx] ? parserHelper[idx](cur) : {
				[ADDRESS_FORMAT_CA[idx]]: cur.trim()
			};
			return {
				...acc,
				...objMerge
			};
		}, {});
}