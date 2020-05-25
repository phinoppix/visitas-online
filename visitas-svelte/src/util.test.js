import {parseMapboxPlaceData, everyElemExistsAndViceVersa} from './util';

describe('util', () => {
	it('parseMapboxPlaceData should break data to proper view model', () => {
		var data = {"id":"address.3859482691397234","type":"Feature","place_type":["address"],"relevance":1,"properties":{"accuracy":"point"},"text_en-US":"Kenpark Avenue","place_name_en-US":"89 Kenpark Avenue, Brampton, Ontario L6Z 3K4, Canada","text":"Kenpark Avenue","place_name":"89 Kenpark Avenue, Brampton, Ontario L6Z 3K4, Canada","center":[-79.805911,43.745099],"geometry":{"type":"Point","coordinates":[-79.805911,43.745099]},"address":"89","context":[{"id":"postcode.1044348962832200","text_en-US":"L6Z 3K4","text":"L6Z 3K4"},{"id":"place.13823177056752460","wikidata":"Q44198","text_en-US":"Brampton","language_en-US":"en","text":"Brampton","language":"en"},{"id":"region.6727060277263190","short_code":"CA-ON","wikidata":"Q1904","text_en-US":"Ontario","language_en-US":"en","text":"Ontario","language":"en"},{"id":"country.10019870576587150","short_code":"ca","wikidata":"Q16","text_en-US":"Canada","language_en-US":"en","text":"Canada","language":"en"}]};
		expect(parseMapboxPlaceData(data)).toEqual(
			{
				"cityTown": "Brampton",
				"country": "ca",
				"jsonData": "{\"id\":\"address.3859482691397234\",\"type\":\"Feature\",\"place_type\":[\"address\"],\"relevance\":1,\"properties\":{\"accuracy\":\"point\"},\"text_en-US\":\"Kenpark Avenue\",\"place_name_en-US\":\"89 Kenpark Avenue, Brampton, Ontario L6Z 3K4, Canada\",\"text\":\"Kenpark Avenue\",\"place_name\":\"89 Kenpark Avenue, Brampton, Ontario L6Z 3K4, Canada\",\"center\":[-79.805911,43.745099],\"geometry\":{\"type\":\"Point\",\"coordinates\":[-79.805911,43.745099]},\"address\":\"89\",\"context\":[{\"id\":\"postcode.1044348962832200\",\"text_en-US\":\"L6Z 3K4\",\"text\":\"L6Z 3K4\"},{\"id\":\"place.13823177056752460\",\"wikidata\":\"Q44198\",\"text_en-US\":\"Brampton\",\"language_en-US\":\"en\",\"text\":\"Brampton\",\"language\":\"en\"},{\"id\":\"region.6727060277263190\",\"short_code\":\"CA-ON\",\"wikidata\":\"Q1904\",\"text_en-US\":\"Ontario\",\"language_en-US\":\"en\",\"text\":\"Ontario\",\"language\":\"en\"},{\"id\":\"country.10019870576587150\",\"short_code\":\"ca\",\"wikidata\":\"Q16\",\"text_en-US\":\"Canada\",\"language_en-US\":\"en\",\"text\":\"Canada\",\"language\":\"en\"}]}",
				"jsonDataProvider": "mapbox",
				"place_name": "89 Kenpark Avenue, Brampton, Ontario L6Z 3K4, Canada",
				"postalCode": "L6Z 3K4",
				"st_name": "Kenpark Avenue",
				"st_number": "89",
				"stateProvince": "Ontario"
			}
		)
	});

	it('everyElemExistsAndViceVersa works as expected', () => {
		const tags = ['b', 'c'];

		expect(everyElemExistsAndViceVersa(tags, ['a', 'b', 'c', 'd'])).toBeTruthy();
		expect(everyElemExistsAndViceVersa(tags, ['b'])).toBeTruthy();
		expect(everyElemExistsAndViceVersa(tags, [])).toBeTruthy();
		expect(everyElemExistsAndViceVersa(tags, ['e'])).toBeFalsy();
		expect(everyElemExistsAndViceVersa(tags, ['a', 'b'])).toBeFalsy();
	})
})