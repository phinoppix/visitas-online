import OktaSignIn from '@okta/okta-signin-widget';
import {navigate} from 'svelte-routing';

import {appConfig} from '../appConfig';
import {authorized} from '../store';
import {client} from '../graphqlConfig';

const signinWidget = new OktaSignIn({
	baseUrl: appConfig.auth.baseUrl,
	clientId: appConfig.auth.clientId,
	redirectUri: window.location.origin, //appConfig.auth.redirectUri,
	authParams: {
		issuer: 'https://dev-315345.okta.com/oauth2/default',
		responseType: ['id_token', 'token'],
	},
	testing: {
		disableHttpsCheck: appConfig.auth.testing.disableHttpsCheck
	},
	i18n: {
		en: {
			'primaryauth.title': 'Welcome to Visitas'
		}
	}
});

const authClient = signinWidget.authClient;

const logOut = () => {
	authClient.signOut();
	authorized.update(_ => false);
	client.resetStore();
};

export const asyncGetAuthToken = async () => await authClient.tokenManager.get('id_token');

export const asyncTryRedirectToLogin = async () => {
	const token = await asyncGetAuthToken();
	authorized.update(_ => !!token);
	if (!token) {
		navigate('/login', {replace: true});
	}
}


export {
	signinWidget,
	authClient,
	logOut
}