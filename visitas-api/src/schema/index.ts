import { dataSchema } from './data-schema';
import { querySchema } from './query-schema';
import { mutationSchema } from './mutation-schema';

export const typeDefs = [
  dataSchema,
  querySchema,
  mutationSchema
];
