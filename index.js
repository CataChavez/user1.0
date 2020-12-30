const http = require('http')
const fs = require('fs')
const url = require('url')
const db = require('./db')

const server = http.createServer(async (req, res) => {
  if (req.url == '/' && req.method == 'GET') {
    fs.readFile('./views/index.html', (err, file) => {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(file, 'utf8')
      res.end()
    })
  }

  if (req.url == '/usuario' && req.method == 'POST') {
    let params = null;
    req.on('data', body => {
      params = body
    });
    req.on('end', async () => {
      const paramsArray = Object.values(JSON.parse(params));
      const result = await db.createUser(paramsArray);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(result));
      res.end();
    });
  }

  if (req.url == '/usuarios' && req.method == 'GET') {
    const result = await db.getUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(result.rows));
    res.end();
  }

  if (req.url == '/login' && req.method == 'POST') {
    let params, statusCode
    req.on('data', body => {
      params = body
    });
    req.on('end', async () => {
      const paramsArray = Object.values(JSON.parse(params));
      const result = await db.login(paramsArray);
      if (result.rows.length > 0){
        statusCode = 200
      }else{
        statusCode = 403
      }
      res.writeHead(statusCode, { 'Content-Type':'application/json' });
      res.write(JSON.stringify(result));
      res.end();
    });
  }

})
server.listen(3000, () => console.log('escuchando el puerto 3000'))
