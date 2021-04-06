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
    const {fname, lname, accountType, accessKey} = req.body
    bcrypt.hash(accessKey, 10).then ( (hash) =>
    {
        db.run(`INSERT INTO user (fname, lname, accountType, accessKey) VALUES ('${fname}', '${lname}', '${accountType}', '${hash}')`, (err) =>
        {
            if (err){console.log(err.message); res.status(500).json({message: err.message})}
            else
            {
                db.all(`select last_insert_rowid()`, (err, row) =>
                {
                    if (err){console.log(err.message); res.status(500).json({message: err.message})}
            
                    else {res.status(200).json({message: row[0]["last_insert_rowid()"]})}
                })
            }
        })
    })
})

app.put("/submitUser", (req, res) =>
{
    const {email, password, accessKey} = req.body
    const id = parseInt(accessKey.substring(0, accessKey.indexOf('-')))
    const accessKeyInDB = accessKey.substring(accessKey.indexOf('-')+1)
    //console.log(id)
    //console.log(accessKeyInDB)

    db.all(`SELECT * FROM user where id=${id}`, (err, row) =>
    {
        if (err){console.log(err.message); res.status(500).json({message: err.message})}
        
        else if (row.length === 0) {res.status(401).json({message: "invalid access key"})}

        else
        {
            const dbAccessKey = row[0].accessKey

            bcrypt.compare(accessKeyInDB, dbAccessKey).then( (match) =>
            {
                if (!match)
                {
                    res.status(401).json({message: "invalid access key"})
                }
                else
                {
                    bcrypt.hash(password, 10).then ( (hash) => 
                    {
                        db.run(`UPDATE user SET email='${email}', password='${hash}', accessKey=NULL WHERE id=${id}`, (err) =>
                        {
                            if (err){console.log(err.message); res.status(500).json({message: err.message})}
                            else {res.status(200).json({message: "user details successfully updated"})}
                        })
                    })
                }
            })
        }
    });
})

app.get('/getUsers', (req, res) =>
{
    db.all(`SELECT id, fname, lname, email, accountType FROM user`, (err, row) =>
    {
        if (err) { console.log(err.message); res.status(500).json({message: err.message}) }

        else { res.status(200).json(row) }
    })
})
