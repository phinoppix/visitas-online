import { Connection, Request, TYPES, TediousType } from 'tedious';
import { mergeDeepRight } from 'ramda';
import { RowData, RequestParameter, isFloat, isInteger, isBool, RequestParameterDirection } from './misc';

const DEFAULT_CONFIG = {
  server: 'localhost',
  authentication: {
    type: 'default',
  },
  options: {
    trustServerCertificate: false,
    encrypt: false,
    rowCollectionOnRequestCompletion: true,
    useColumnNames: true
  }
};

function jsTypeToTediousType(value: any): TediousType {
  if (isFloat(value))
    return TYPES.Decimal;
  else if (isInteger(value))
    return TYPES.Int;
  else if (isBool(value))
    return TYPES.Bit;
  else
    return TYPES.NVarChar;
}

export default class SqlClient {
  connection: Connection;

  constructor(config: any = DEFAULT_CONFIG) {
    const merged_config = config != DEFAULT_CONFIG ? mergeDeepRight(DEFAULT_CONFIG, config) : config;
    this.connection = new Connection(merged_config);
  }

  connect(): Promise<SqlClient> {
    return new Promise((res, rej) => {
      this.connection.on('connect', (err: any) => {
        if (err) {
          rej(err);
        } else {
          res(this);
        }
      });
    });
  }

  execQuery(query: string, parameters?: RequestParameter[]): Promise<RowData[]> {
    return new Promise((res, rej) => {
      const request = new Request(query, (err, _, rows) => {
        if (err) {
          rej(err);
        }
        res(rows as RowData[]);
      });

      parameters && parameters.forEach(par => {
        let type = par.type || jsTypeToTediousType(par.value);

        request[par.direction === RequestParameterDirection.Output ?
          'addOutputParameter' :
          'addParameter'](par.name, type, par.value);
      });

      this.connection.execSql(request);
    });
  }
}