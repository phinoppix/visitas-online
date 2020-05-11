import { toContact } from './contact-utils';

it('toContact should return Contact object', () => {
	const row = {"id":"CAE6423E-F36B-1410-8787-00139EC81364","name":"Aristotle Tiru - v2","address_migration":"This is the migration address","contact_info:email":"aris.tiru@rangle.io","division:id":"8508433E-F36B-1410-877F-00139EC81364","contact_info:phoneNumber":"998989898"};
	expect(toContact(row)).toEqual({
		id: 'CAE6423E-F36B-1410-8787-00139EC81364',
		name: 'Aristotle Tiru - v2',
		address_migration: 'This is the migration address',
		contact_info: {
			phoneNumber: "998989898",
			email: "aris.tiru@rangle.io"
		},
		division: {
			id: "8508433E-F36B-1410-877F-00139EC81364"
		}
	});
})