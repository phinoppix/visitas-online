import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { printAppVars } from './utils/info';
import { IServerContext } from './IServerContext';


const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  debug: true,
  context: ({ req }) => {
    // TODO: Pull the user's identity and claims via {req.headers} var
    return {
      divisionId: process.env.DEBUG_DIVISION_ID
    } as IServerContext;
  }
 });

server.listen({
  port: 4001
}).then(({url}) => {
  console.log('Server ready at ' + url);
  console.log(''.padEnd(30, '='));
  printAppVars();
  console.log(''.padEnd(30, '='));
});
