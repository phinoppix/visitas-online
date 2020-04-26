import { queryOutputSchema, querySchema } from './query-schema';
import { mutationSchema } from './mutation-schema';

export const typeDefs = [
  queryOutputSchema,
  querySchema,
  mutationSchema
];
