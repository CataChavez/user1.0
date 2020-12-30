const { Pool } = require('pg');

const config = {
  users: 'cata',
  password: '1234',
  host: 'localhost',
  database: 'softlife',
  port: 5432
}

const pool = new Pool(config);

async function login(paramsArray) {
    const qryObj = {
      text: 'SELECT * FROM usuarios WHERE email = $1 AND password = $2',
      values: paramsArray
    }
    const result = await pool.query(qryObj);
    return result;
  } 

async function getUsers() {
  const result = await pool.query('SELECT * FROM usuarios');
  return result;
}

async function createUser(paramsArray) {
  const qryObj = {
    text: 'INSERT INTO usuarios(email, password) VALUES ($1, $2)',
    values: paramsArray
  }
  const result = await pool.query(qryObj);
  return result;
}


module.exports = {
  login,
  createUser,
  getUsers
}