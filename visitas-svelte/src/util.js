export function upsertObject(list, targetData, primaryKey) {
	const tmp = [...list];
	const pk = primaryKey || "id";
	const subjectIndex = list.findIndex(t => t[pk] === targetData[pk]);
	if (subjectIndex > -1) {
		tmp[subjectIndex] = targetData;
	} else {
		tmp.push(targetData);
	}

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
	region: 'stateProvince',
	country: 'country'
};

export const parseMapboxPlaceData = data => {
	const contexts = data.context.map(c => ({
			id: c.id.slice(0, c.id.indexOf('.')),
			text: c.id.startsWith('country.') ? c.short_code : c.text
		}))
		.filter(ctx => contextIdMapper[ctx.id])
		.reduce((acc, cur) => ({
			...acc,
			[contextIdMapper[cur.id]]: cur.text
		}), {});

	return {
		st_number: data.address,
		st_name: data.text,
		jsonData: JSON.stringify(data),
		jsonDataProvider: 'mapbox',
		place_name: data.place_name,
		...contexts
	};
}

export const cache = {
	CONTACT_LIST_FILTER: 'visitas:CONTACT_LIST_FILTER',
	get: (key) => {
		try {
			return localStorage && JSON.parse(localStorage.getItem(key));
		} catch(e) {
			return null;
		}
	},
	set: (key, obj) => localStorage && localStorage.setItem(key, JSON.stringify(obj))
};

// Source: https://davidwalsh.name/function-debounce
export function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export const everyElemExistsAndViceVersa = x => y =>
	x.every(t => y.includes(t)) ||
	y.every(t => x.includes(t));