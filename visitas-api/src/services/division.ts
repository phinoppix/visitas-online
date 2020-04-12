import { Connection, Request, TYPES } from 'tedious';
import ConnectionWrapper from '../utils/tedious-util/SqlClient';
import { Division } from '../schema/data-types';
import { rowDataToKeyValue } from '../utils/tedious-util/misc';

const config = {
  server: process.env.SQLHOST,
  authentication: {
    options: {
      userName: process.env.SQLUSER,
      password: process.env.SQLPASSWORD
    }
  },
  options: {
    appName: process.env.SQLAPPNAME,
    database: process.env.SQLINITDB
  }
};

export async function getDivision(code: string): Promise<Division | undefined> {
  const con = new ConnectionWrapper(config);

  try {
    await con.connect();
  }
  catch (e) {
    console.error('getDivision() failed due to connection problem.', e);
  }

  try {
    const result = await con.execQuery('select * from division where code=@code', [{
      name: 'code',
      type: TYPES.NVarChar,
      value: code
    }]);
    const divisions = result.map(rowDataToKeyValue);
    return divisions.length > 0 ? divisions[0] as Division : undefined;
  } catch (e) {
    console.error(e);
  }
}