require('dotenv').config();

export const connectionConfig = {
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

export const authServer = {
	oktaDomain: process.env.OKTA_DOMAIN,
	cors: {
		origin: process.env.CORS_ORIGIN
	}
}