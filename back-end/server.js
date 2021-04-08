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
                    const accessToken = sign( {id:user.id}, "secret" )
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
                
                db.all(`SELECT id, fname, lname, email, accountType FROM user where id=${decodedToken.payload.id}`, (err, row) =>
                {
                    if (err){console.log(err.message); res.status(500).json({message: err.message})}
                    
                    else if (row.length === 0) {res.status(401).json({message: "invalid id"})}
            
                    else {res.status(200).json({message: row[0]})}
                });
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

app.post("/checkAccessKey", (req, res) =>
{
    const {accessKey} = req.body
    const id = parseInt(accessKey.substring(0, accessKey.indexOf('-')))
    const accessKeyInDB = accessKey.substring(accessKey.indexOf('-')+1)

    db.all(`SELECT * FROM user where id=${id}`, (err, row) =>
    {
        if (err){console.log(err.message); res.status(500).json({message: err.message})}
        
        else if (row.length === 0) {res.status(401).json({message: "invalid access key"})}

        else
        {
            const dbAccessKey = row[0].accessKey
            
            if (dbAccessKey === null) {res.status(401).json({message: "invalid access key"})}
            
            else
            {
                bcrypt.compare(accessKeyInDB, dbAccessKey).then( (match) =>
                {
                    if (!match) {res.status(401).json({message: "invalid access key"})}
                    
                    else {res.status(200).json({message: "valid access key"})}
                })
            }
        }
    });
})


app.post("/getUserDetails", (req, res) =>
{
    const {id} = req.body

    db.all(`SELECT id, fname, lname, email, accountType FROM user where id=${id}`, (err, row) =>
    {
        if (err){console.log(err.message); res.status(500).json({message: err.message})}
        
        else if (row.length === 0) {res.status(401).json({message: "invalid id"})}

        else {res.status(200).json({message: row[0]})}
    });
})


app.put("/submitUser", (req, res) =>
{
    const {email, password, accessKey} = req.body
    const id = parseInt(accessKey.substring(0, accessKey.indexOf('-')))
    const accessKeyInDB = accessKey.substring(accessKey.indexOf('-')+1)

    db.all(`SELECT * FROM user where id=${id}`, (err, row) =>
    {
        if (err){console.log(err.message); res.status(500).json({message: err.message})}
        
        else if (row.length === 0) {res.status(401).json({message: "invalid access key"})}

        else
        {
            const dbAccessKey = row[0].accessKey

            bcrypt.compare(accessKeyInDB, dbAccessKey).then( (match) =>
            {
                if (!match) {res.status(401).json({message: "invalid access key"})}
                
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

app.put("/editUserDetails", (req, res) =>
{
    const {id, email, password} = req.body
    
    bcrypt.hash(password, 10).then ( (hash) => 
    {
        db.run(`UPDATE user SET email='${email}', password='${hash}' WHERE id=${id}`, (err) =>
        {
            if (err){console.log(err.message); res.status(500).json({message: err.message})}
            else {res.status(200).json({message: "user details successfully changed"})}
        })
    })
})


app.put("/addAccessKey", (req, res) =>
{
    const {id, accessKey} = req.body
    
    bcrypt.hash(accessKey, 10).then ( (hash) =>
    {
        db.run(`UPDATE user SET accessKey='${hash}' WHERE id=${id}`, (err) =>
        {
            if (err) {console.log(err.message); res.status(500).json({message: err.message})}
            else {res.status(200).json({message: id})}
        })
    })
})

app.put("/editUser", (req, res) =>
{
    const {id, email, fname, lname, accountType} = req.body
    
    db.run(`UPDATE user SET email='${email}', fname='${fname}', lname='${lname}', accountType='${accountType}' WHERE id=${id}`, (err) =>
    {
        if (err) {console.log(err.message); res.status(500).json({message: err.message})}
        else {res.status(200).json({message: "user successfully edited"})}
    })
})

app.post("/deleteUser", (req, res) =>
{
    const {id} = req.body
    
    db.run(`DELETE from user WHERE id=${id}`, (err) =>
    {
        if (err) {console.log(err.message); res.status(500).json({message: err.message})}
        else {res.status(200).json({message: "user successfully deleted"})}
    })
})


app.get('/getUsers', (req, res) =>
{
    db.all(`SELECT id, fname, lname, email, accountType FROM user`, (err, row) =>
    {
        if (err) { console.log(err.message); res.status(500).json({message: err.message}) }

        else { res.status(200).json(row) }
    })
})







app.post("/createAnswer", (req, res) =>
{
    const {questionid, answerText} = req.body
    
    
        db.run(`INSERT INTO answers (questionid, answerText) VALUES ('${questionid}', '${answerText}')`, (err) =>
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


app.get('/getAnswer', (req, res) =>
{
    db.all(`SELECT id, questionid, answerText FROM answers`, (err, row) =>
    {
        if (err) { console.log(err.message); res.status(500).json({message: err.message}) }

        else { res.status(200).json(row) }
    })
})


app.post("/createQuestion", (req, res) =>
{
    const {examid, questionText} = req.body
    {
        db.run(`INSERT into question(id, examid, questionText) VALUES ('${examid}', '${questionText}')`, (err) =>
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
    }
})


app.get('/getQuestion', (req, res) =>
{
    db.all(`SELECT id, examid, questionText, FROM question`, (err, row) =>
    {
        if (err) { console.log(err.message); res.status(500).json({message: err.message}) }

        else { res.status(200).json(row) }
    })
})

app.get('/getUserExams', (req, res) =>
{
    const {userid} = req.body
    db.all(`SELECT userid, examid FROM examTakers where userid= ${userid}`, (err, row) =>
    {
        if (err) { console.log(err.message); res.status(500).json({message: err.message}) }

        else { res.status(200).json(row) }
    })
})