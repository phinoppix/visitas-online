export function upsertObject(list, targetData, primaryKey) {
	const tmp = [...list];
	const pk = primaryKey || "id";
	const subjectIndex = list.findIndex(t => t[pk] === targetData[pk]);
	if (subjectIndex > -1) {
		tmp[subjectIndex] = targetData;
	} else {
		tmp.push(targetData);
	}
	console.log('upsertObject', {
		list, targetData, primaryKey, subjectIndex, tmp
	});
	return tmp;
}

export function removeElement(list, element) {
	const tmp = [...list];
	const idx = list.indexOf(element);
	if (idx > -1) {
		tmp.splice(idx, 1);
	} else {
		tmp.push(element);
	}
	return tmp;
}

export function removeElementByPredicate(list, predicate) {
	const idx = list.findIndex(predicate);
	return [].concat(...list.slice(0, idx), ...list.slice(idx + 1))
}

export const isEmptyOrNil = value =>
	value === undefined || value === null || (value || '').length === 0;

const contextIdMapper = {
	postcode: 'postalCode',
	place: 'cityTown',
	region: 'stateProvince'
};

const remapContextId = contextId => contextIdMapper[contextId] || contextId

export const parseMapboxPlaceData = data => {
	const contexts = data.context.map(c => ({
			id: c.id.slice(0, c.id.indexOf('.')),
			text: c.id.startsWith('country.') ? c.short_code : c.text
		}))
		.reduce((acc, cur) => ({
			...acc,
			[remapContextId(cur.id)]: cur.text
		}), {});

	return {
		st_number: data.address,
		st_name: data.text,
		jsonData: JSON.stringify(data),
		jsonDataProvider: 'mapbox',
		...contexts
	};
}