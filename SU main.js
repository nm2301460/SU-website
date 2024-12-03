const express = require ('express')
const db_access= require('./db.js')
const db = db_access.db
const server = express()
const port = 3939
server.use(express.json())
server.post('/user/login' , (req,res) => {
    const email = req.body.email
    const password = req.body.password
    db.get(`SELECT * FROM USER WHERE EMAIL = '${email}'AND PASSWORD = '${password}'`,(err,row)=> {
        if (err|| !row)
            return res.status(401).send("invalid credentials")
        else
        return res.status(200).send("login successful")
    })
})

server.post('/user/register', (req,res)=>
    {
        const name = req.body.name
        const email= req.body.email
        const password = req.body.password
        const isAdmin= req.body.isAdmin
            db.run(`INSERT INTO USER(name,email,password,isAdmin) Values ('${name}',
                '${email}', '${password}','${isAdmin}'`), (err)=> {
                    if(err)
                        return res.status(401).send(err)
                    else
                    return res.status(200).send('registration successful')
                }
    }
)


    

server.listen(port,()=>{
    console.log(`server is running ${port}`)
})
