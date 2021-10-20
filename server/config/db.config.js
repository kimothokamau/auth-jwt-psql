module.exports = {
  HOST: "localhost",
  USER: "ethdev",
  PASSWORD: "ethdev100x",
  DB: "userauthdb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};