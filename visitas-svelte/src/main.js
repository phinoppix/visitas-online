import mapbox from 'mapbox-gl';
import App from './App.svelte';
import {appConfig} from './appConfig';

mapbox.accessToken = appConfig.map.accessToken;

const app = new App({target: document.body});
export default app;
