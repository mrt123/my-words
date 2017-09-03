// These configs be used either by migrations or by backend itself.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: 'dict',
      user:     'root',
      password: '123'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: 'migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: 'words-db-box',
      database: 'dict',
      user:     'root',
      password: '123'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: 'migrations'
    }
  }
};
