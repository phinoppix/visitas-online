import { MutationResponse } from '../schema/mutation-types';

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

