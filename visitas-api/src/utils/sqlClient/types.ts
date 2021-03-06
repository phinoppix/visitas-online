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

export interface ColumnValuePair {
	[key: string]: any
}