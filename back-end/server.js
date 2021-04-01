const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt')


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

app.post("/createUser", (req, res) =>
{
    var fname1 = "Rikhil"
    var sname1 = "Shah"
    var email1 = "ec19148atqmul.ac.uk"
    var accountType1 = "sysadmin"
    bcrypt.hash("password", 10).then ( (hash) => 
    {
        db.run(`INSERT INTO user (fname, sname, email, password, accountType) VALUES ('Rikhil', 'Shah', 'email', '${hash}', 'sysadmin')`, (err) =>
        {
            if (err)
            {
                console.log(err.message)
            }
        })
    })
})

// app.post("/submitUser")

app.post('/login', (req, res) =>
{
    const {email, password} = req.body;

    db.all(`SELECT password FROM user where email = '${email}'`, (err, row) =>
    {
        if (row.length === 0) {res.status(401).json({message: "Invalid email address or password"})}

        else
        {
            const dbPassword = row[0].password

            bcrypt.compare(password, dbPassword).then( (match) =>
            {
                if (!match)
                {
                    res.status(401).json({message: "Invalid email address or password"})
                }
                else
                {
                    res.status(200).json({message: "login successful"})
                }
            })
        }

    });
});
