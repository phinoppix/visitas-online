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
      divisionId: '200F433E-F36B-1410-8B80-00A4D18A1143'
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
