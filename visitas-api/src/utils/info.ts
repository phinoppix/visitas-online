export function printAppVars() {
  const APP_CONFIG_KEYS = [
    'SQLHOST',
    'SQLUSER',
    'SQLAPPNAME',
    'SQLINITDB'
  ];

  const envVars = APP_CONFIG_KEYS.reduce((a, c) => ({
    ...a,
    [c]: process.env[c]
  }), {});
  console.log('Environment:', envVars);
}
