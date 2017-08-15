module.exports = {
  development: {
    username: 'zulfikarannur',
    password: 'zoelfiekar231094',
    database: 'price_police_5',
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
    username: process.env.USERNAME_RDS,
    password: process.env.PASS_RDS,
    database: process.env.DB_RDS,
    host: process.env.HOST_RDS,
    port: process.env.PORT_RDS,
    dialect: process.env.DIALECT_RDS
  }
}
