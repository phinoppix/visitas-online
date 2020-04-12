import { ITerritoryLoader } from './ITerritoryLoader';

let territoryLoader: ITerritoryLoader;

if (process.env.DATASRC === 'memo') {
  territoryLoader = require('./mockDataSource/territoryLoader').default;
} else {
  territoryLoader = require('./src-postgres').default;
}

export {
  territoryLoader
};