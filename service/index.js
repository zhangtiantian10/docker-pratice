const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'my-db',
  user: 'user',
  password: 'password',
  database: 'db'
});

connection.connect();

app.get('/api/user', (req, res) => {
  connection.query('SELECT * from user', (err, users, fields) => {
    if (err) throw err;
    console.log('Get all the users: ', users);

    res.json(users)
  });
});

app.post('/api/user', (req, res) => {
  const { name, age } = req.body;
  console.log('Request body:', req.body);
  connection.query('INSERT INTO user SET ?', {name, age}, (err, rows) => {
    if (err) throw err;

    res.sendStatus(200)
  });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
