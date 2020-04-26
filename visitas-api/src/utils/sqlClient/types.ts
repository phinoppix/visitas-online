export enum CommandType {
  Text,
  StoredProcedure
}

export interface RowData {
  [key: string]: {
    value: any,
    metadata: any
  }
}

export interface DataRow {
	[key: string]: any
}