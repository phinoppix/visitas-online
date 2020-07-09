import { ApolloServer } from 'apollo-server';
import OktaJwtVerifier from '@okta/jwt-verifier';

import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { printAppVars } from './utils/info';
import { IServerContext } from './IServerContext';
import { authServer } from './settings';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  debug: true,
  context: async ({ req }) => {
  	const header = req.header('authorization');
  	if (!header || !header.startsWith('Bearer ')) {
  		return {};
		}
  	const token = header!.split(' ')[1];
    const tokenVerifier = new OktaJwtVerifier({
			issuer: `${authServer.oktaDomain}/oauth2/default`
		});
		const {claims: {division, roles}} = await tokenVerifier.verifyAccessToken(token, 'api://default');
		if (!division || division.length === 0) {
			throw "No division set on user's claim.";
		}
		// TODO: In future, user may be assigned to multiple divisions.
    return {
      divisionId: division[0].split('.')[1]
    } as IServerContext;
  },
	cors: {
		origin: authServer.cors.origin,
		credentials: true
	}
 });

server.listen({
	host: '0.0.0.0',
  port: 4000
}).then(({url}) => {
  console.log('Server ready at ' + url);
  console.log(''.padEnd(30, '='));
  printAppVars();
  console.log(''.padEnd(30, '='));
});
