export const appConfig = {
	beUrl: "API_ENDPOINT",
	map: {
		accessToken: "MAP_ACCESS_TOKEN",
		startLocation: "MAP_STARTING_LOCATION",
		country: "MAP_COUNTRY"
	},
	auth: {
		baseUrl: 'AUTH_BASEURL',
		clientId: 'AUTH_CLIENT_ID',
		redirectUri: 'AUTH_LOGIN_REDIRECT',
		testing: {
			disableHttpsCheck: true
		},
		credentials: 'AUTH_CREDENTIAL_TYPE'
	}
}