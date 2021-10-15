module.exports = {
  development: {
    HOST: "localhost",
    PORT: "5432",
    USER: "postgres",
    PASSWORD: "123",
    DB: "userauthdb",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
    },
    production: {
      HOST: "localhost",
      PORT: "5432",
      USER: "postgres",
      PASSWORD: "123",
      DB: "userauthdb",
      dialect: "postgres",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      "use_env_variable": "DATABASE_URL"
      }
  }