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

export function mutableRemoveElement(list, element) {
	const idx = list.indexOf(element);
	if (idx > -1) {
		list.splice(idx, 1);
	} else {
		list.push(element);
	}
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
