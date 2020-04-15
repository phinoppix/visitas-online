import { MutationResponse } from '../schema/mutation-types';
import { SqlConnection } from '../utils/sqlClient';
import { connectionConfig } from '../settings';

export const voidMutationHandler = async (cb: () => void): Promise<MutationResponse> => {
  try {
    await cb();
    return {
      status: 'OK'
    };
  } catch(e) {
    return {
      status: 'KO',
      error: e
    };
  }
}

export const createConnection = async () => {
  const con = new SqlConnection(connectionConfig);

  try {
    console.log('Opening connection');
    await con.open();
    return con;
  } catch (e) {
    console.error('Connection error', e);
    throw e;
  }
}