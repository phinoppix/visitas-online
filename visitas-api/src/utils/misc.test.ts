import { jsonStreamAsJson, tagsColumnPredicate } from './misc';
import { Contact } from '../schema/data-types';

describe('misc', () => {
	it('jsonStreamAsJson should return array of T', () => {
		const sample = [
			{
				'JSON_xxxx': {
					value: '[{"id":"9249433E-F36B-1410-8781-00139EC81364","name":"Aristotle Tiru","address_migration":"This is the migration address","contact_info:email":"aris.tiru@rangle.io","contact_info:phoneNumber":"827182781","remarks":"This is the latest usp","tags":"[\\"new\\"]","division:id":"8508433E-F36B-1410-877F-00139EC81364","territory:id":"AFB6433E-F36B-1410-8780-00139EC81364","territory:code":"1002","territory:name":"Test 1002"},{"id":"9549433E-F36B-1410-8781-00139EC81364","name":"Mary","address_migration":"123 Kenpark","remarks":"newly added","tags":"[]","division:id":"8508433E-F36B-1410-877F-00139EC81364","territory:id":"AFB6433E-F36B-1410-8780-00139EC81364","territory:code":"1002","territory:name":"Test 1002"}]',
					metadata: null
				}
			}
		];
		const output = [{
			"id": "9249433E-F36B-1410-8781-00139EC81364",
			"name": "Aristotle Tiru",
			"address_migration": "This is the migration address",
			"contact_info": {
				"email": "aris.tiru@rangle.io",
				"phoneNumber":"827182781"
			},
			"remarks": "This is the latest usp",
			"tags": ["new"],
			"division": {
				"id": "8508433E-F36B-1410-877F-00139EC81364"
			},
			"territory": {
				"id": "AFB6433E-F36B-1410-8780-00139EC81364",
				"code": "1002",
				"name": "Test 1002",
			},
		}, {
			"id": "9549433E-F36B-1410-8781-00139EC81364",
			"name": "Mary",
			"address_migration": "123 Kenpark",
			"remarks": "newly added",
			"tags": [],
			"division": {
				"id": "8508433E-F36B-1410-877F-00139EC81364"
			},
			"territory": {
				"id": "AFB6433E-F36B-1410-8780-00139EC81364",
				"code": "1002",
				"name": "Test 1002",
			}
		}];
		expect(jsonStreamAsJson<Contact>(sample, tagsColumnPredicate)).toEqual(output);
	});
})