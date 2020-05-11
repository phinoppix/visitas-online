import {parseAddress} from './util-address';

/*
  NOTE: Tests currently only covers permutations for the street number because Mapbox GL does not provide
  the breakdown out-of-the-box, unlike GoogleMaps.
  Also, I only need to extract the street name for sorting requirements.
 */

const partial_address = "Redbrick Court, Brampton, Ontario A8B 7C6, Canada";
const expectedPartial = {
	streetName: 'Redbrick Court',
	cityTown: 'Brampton',
	provinceState: 'Ontario',
	postalCode: 'A8B 7C6',
	country: 'Canada'
};

describe("parseAddress", () => {
	it("should correctly break address parts with street number", () => {
		const parsed = parseAddress('90 ' + partial_address);
		expect(parsed).toEqual({
			streetNumber: '90',
			...expectedPartial
		});
	});

	it("should correctly break address parts with alphanum street number", () => {
		const parsed = parseAddress('90A ' + partial_address);
		expect(parsed).toEqual({
			streetNumber: '90A',
			...expectedPartial
		});
	});

	it("should correctly break address parts with apartment number", () => {
		const parsed = parseAddress('90A-200 ' + partial_address);
		expect(parsed).toEqual({
			apartmentNumber: '90A',
			streetNumber: '200',
			...expectedPartial
		});
	});

	it("should correctly break address parts with no street/apartment number", () => {
		const parsed = parseAddress(partial_address);
		expect(parsed).toEqual(expectedPartial);
	});

	it('should return null if input is empty or null', () => {
		expect(parseAddress('')).toBeNull();
	});
});