const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
//const cors = require('cors');

//app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./OEA_System.db', err =>
{
    if (err) {console.log(err.message);}
    else {console.log("Connected to OEA_System database");}
});

app.listen(3001, () =>
{
    console.log("Server running on port 3001")
});


app.get('/test', (req, res) =>
{
    db.all("SELECT * FROM test", (err, result) =>
    {
        if (err) {console.log(err.message);}

        else{res.send(result);}
    });
});

