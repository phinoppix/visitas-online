import { queryResolvers } from './query-resolvers';
import { mutationResolvers } from './mutation-resolvers';

export const resolvers = {
  ...queryResolvers,
  ...mutationResolvers
};
