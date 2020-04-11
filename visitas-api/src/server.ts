import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  debug: true
 });

server.listen({
  port: 4001
}).then(({url}) => {
  console.log('Server ready at ' + url);
});
