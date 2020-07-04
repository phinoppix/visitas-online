import * as R from 'ramda';
import { Connection, ConnectionConfig } from 'tedious';

const DEFAULT_CONFIG: ConnectionConfig = {
  server: 'localhost',
  authentication: {
    type: 'default',
    options: {}
  },
  options: {
    database: 'master',
    trustServerCertificate: false,
    encrypt: false,
    rowCollectionOnRequestCompletion: false,
    useColumnNames: true,
    rowCollectionOnDone: true
  }
};

export enum ConnectionStatus {
  Closed,
  Opening,
  Open
}

export default class SqlConnection {
  config: ConnectionConfig;
  driver?: Connection;
  status: ConnectionStatus = ConnectionStatus.Closed;

  constructor(config: ConnectionConfig) {
    this.config = config != DEFAULT_CONFIG ? R.mergeDeepRight(DEFAULT_CONFIG, config) as ConnectionConfig : config;
  }

  open = () => new Promise((res, rej) => {
    this.status = ConnectionStatus.Opening;
    this.driver = new Connection(this.config);
    this.driver!.on('connect', (err: any) => {
      if (err) {
        this.status = ConnectionStatus.Closed;
        rej(err);
      } else {
        this.status = ConnectionStatus.Open;
        res(this);
      }
    });
  });

  close() {
    if (this.driver) {
      this.driver.close();
      this.driver = undefined;
      this.status = ConnectionStatus.Closed;
    }
  }
}
