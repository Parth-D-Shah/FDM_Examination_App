const express = require('express');
const app = express();
const mysql = require('mysql')
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection(
{
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'OEASystem'
});

app.listen(3001, () =>
{
    console.log("Server running on port 3001")
}
);

