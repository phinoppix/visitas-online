import { ColumnMetaData, ColumnValue, Request, TediousType, TYPES } from 'tedious';
import * as R from 'ramda';

import SqlConnection from './SqlConnection';
import SqlParameter, { ParameterDirection } from './SqlParameter';
import { CommandType, RowData } from './types';
import { isBool, isFloat, isInteger } from '../misc';

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

export default class SqlCommand {
	connection?: SqlConnection;
	commandText: string;
	commandType?: CommandType;
	parameters?: SqlParameter[];

	constructor({
								connection,
								commandText,
								commandType,
								parameters
							}: {
		connection?: SqlConnection,
		commandText: string,
		commandType?: CommandType,
		parameters?: SqlParameter[]
	}) {
		this.connection = connection;
		this.commandText = commandText;
		this.commandType = commandType || CommandType.Text;
		this.parameters = parameters || [];
	}

	// TODO: Fix return type to either any[][] or any[] depending on firstDatabaseOnly
	executeReader<T extends boolean>(firstDatasetOnly: T): Promise<T extends true ? RowData[] : RowData[][]> {
		return new Promise((res, rej) => {
			let buffer: any[] | any[][] = [];
			const request = new Request(this.commandText, err => {
				if (err) {
					rej(err);
				}
			});

			request.on('done', (rowCount: number, more: boolean, rows: any[]) => {
				console.log('Request.done', {
					rowCount,
					more,
					rows
				});
			});

			request.on('doneInProc', (rowCount: number, more: boolean, rows: any[]) => {
				// triggered by execSql
				console.log('Request.doneInProc', {
					rowCount,
					more,
					rows,
				});
				if (more) {
					buffer = R.append(rows, buffer);
					console.log('Request.doneInProc new dataset', {
						buffer
					});
				}
			});

			request.on('doneProc', (rowCount: number, more: boolean, returnStatus: any, rows: any[]) => {
				console.log('Request.doneInProc', {
					rowCount,
					more,
					returnStatus,
					rows
				});
			});

			request.on('returnValue', (parameterName: string, value: any, metadata: ColumnMetaData) => {
				console.log('Request.doneInProc', {
					parameterName,
					value,
					metadata
				});
			});

			request.on('requestCompleted', () => {
				const datasets = buffer.filter(ds => ds.length > 0);
				console.log('Request.requestCompleted', {
					buffer,
					firstDatasetOnly,
					datasets,
					datasetsEmpty: R.isEmpty(datasets)
				});
				res(R.isEmpty(datasets) ? buffer[0] : firstDatasetOnly ? datasets[0] : datasets);
			});

			this.setupParameters(request);
			this.executeRequest(request);
		});
	}

	executeNonQuery(): Promise<number> {
		return new Promise((res, rej) => {
			const request = new Request(this.commandText, err => {
				if (err) {
					rej(err);
				}
			});

			request.on('done', (rowCount: number, more: boolean, rows: any[]) => {
				console.log('Request.done', {
					rowCount,
					more,
					rows
				});
			});

			request.on('doneInProc', (rowCount: number, more: boolean, rows: any[]) => {
				// triggered by execSql
				console.log('Request.doneInProc', {
					rowCount,
					more,
					rows,
				});
			});

			request.on('doneProc', (rowCount: number, more: boolean, returnStatus: any, rows: any[]) => {
				console.log('Request.doneInProc', {
					rowCount,
					more,
					returnStatus,
					rows
				});
			});

			request.on('returnValue', (parameterName: string, value: any, metadata: ColumnMetaData) => {
				console.log('Request.doneInProc', {
					parameterName,
					value,
					metadata
				});
			});

			request.on('requestCompleted', () => {
				console.log('Request.requestCompleted');
				res(0);
			});

			this.setupParameters(request);
			this.executeRequest(request);
		});
	}

	private setupParameters(request: Request) {
		this.parameters && this.parameters.forEach(par => {
			let type = par.type || jsTypeToTediousType(par.value);
			request[par.direction === ParameterDirection.Output ?
				'addOutputParameter' :
				'addParameter'](par.name, type, par.value === undefined ? null : par.value);
		});
	}

	private executeRequest(request: Request) {
		if (this.commandType === CommandType.StoredProcedure)
			this.connection?.driver?.callProcedure(request);
		else
			this.connection?.driver?.execSql(request);
	}
}