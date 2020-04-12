import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { printAppVars } from './utils/info';

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  debug: true
 });

server.listen({
  port: 4001
}).then(({url}) => {
  console.log('Server ready at ' + url);
  console.log(''.padEnd(30, '='));
  printAppVars();
  console.log(''.padEnd(30, '='));
});
