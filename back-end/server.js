const express = require('express');
const app = express();
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const {sign, verify, decode} = require("jsonwebtoken")

app.use(express.json());
app.use(cors({credentials: true, origin: true}))
app.use(cookieParser())

// Connecting to db and listening on port
const db = new sqlite3.Database('./OEA_System.db', err =>
{
    if (err) {console.log(err.message); res.status(500).json({message: err.message})}

    else 
    {
        app.listen(3001, () =>
        {
            console.log("Server running on port 3001")
            console.log("Connected to OEA_System database");
        });
    }
});

// Login endpoint
app.post('/login', (req, res) =>
{
    const {email, password} = req.body;

    db.all(`SELECT * FROM user where email = '${email}'`, (err, row) =>
    {
        if (row.length === 0) {res.status(401).json({message: "invalid email address and/or password"})}

        else
        {
            const dbPassword = row[0].password

            bcrypt.compare(password, dbPassword).then( (match) =>
            {
                if (!match)
                {
                    res.status(401).json({message: "invalid email address and/or password"})
                }
                else
                {
                    const user = row[0]
                    const accessToken = sign( {id:user.id, email:user.email, fname:user.fname, lname:user.lname, accountType:user.accountType}, "secret" )
                    res.cookie("access-token", accessToken, { maxAge: 86400000, /*httpOnly: true, secure: true*/ })
                    res.status(200).json({message: "login successful"})
                }
            })
        }

    });
});

// JWT authorisation of accessToken in cookie
app.get("/loggedIn", (req, res) =>
{
    const accessToken = req.cookies["access-token"]
    if (!accessToken)
    {
        res.status(401).json( {message: "not logged in"} )
    }
    else
    {
        try
        {
            const tokenValid = verify(accessToken, "secret")
            if (tokenValid)
            {
                const decodedToken = decode(accessToken, {complete: true})
                res.status(200).json(decodedToken.payload)
            }
        }
        catch (err) { res.status(401).json( {message: "not logged in"} ) }
    }
})



app.post("/createUser", (req, res) =>
{
    const {authkey, fname, lname, accountType} = req.body
    db.run(`INSERT INTO provisional_user (authkey, fname, lname, accountType) VALUES ('${authkey}', '${fname}', '${lname}', '${accountType}')`, (err) =>
    {
        if (err){console.log(err.message); }
        else {res.status(200).json({message: "provisional user successfully created"})}
    })

})

app.post("/submitUser", (req, res) =>
{
    const {fname, lname, email, password, accountType} = req.body
    
    bcrypt.hash(password, 10).then ( (hash) => 
    {
        db.run(`INSERT INTO user (fname, lname, email, password, accountType) VALUES ('${fname}', '${lname}', '${email}', '${hash}', '${accountType}')`, (err) =>
        {
            if (err){console.log(err.message); res.status(500).json({message: err.message})}
            else {res.status(200).json({message: "user successfully created"})}
        })
    })

})


app.post('/getProvUser', (req, res) =>
{
    const {accessKey} = req.body;

    db.all(`SELECT id, fname, lname, accounType FROM provisional_user WHERE accessKey = '${accessKey}'`, (err, row) =>
    {
        if (err) { console.log(err.message); res.status(500).json({message: err.message}) }

        else if (row.length === 0) { res.status(400).json({message: "invalid access key"}) }

        else { res.status(200).json(row[0]) }
    })
})

app.post('/getUser', (req, res) =>
{
    const {id} = req.body;

    db.all(`SELECT id, fname, lname, email, accountType FROM user WHERE id = '${id}'`, (err, row) =>
    {
        if (err) { console.log(err.message); res.status(500).json({message: err.message}) }

        else if (row.length === 0) { res.status(400).json({message: "invalid ID"}) }

        else { res.status(200).json(row[0]) }
    })
})
