module.exports = {
  development: {
    username: 'zulfikarannur',
    password: 'zoelfiekar231094',
    database: 'price_police_4',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: 'zulfikarannur',
    password: 'zoelfiekar231094',
    database: 'price_police_test',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: 'ebdb',
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    dialect: 'postgres'
  }
}
