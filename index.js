import express from 'express'
import session from 'express-session'
import passport from 'passport'
import 'dotenv/config'
import cors from 'cors'
import helmet from 'helmet'
import dbConnect from './config/dbConnection.js'
const app  = express();

//Middleware
app.use(express.urlencoded({extended:true}))
const corsOptions ={
    origin: ["https://localhost:3001"],
    credentials:true
}
app.use(cors(
    corsOptions

))

app.use(passport.initialize());
app.use(passport.session());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:60000*60
    }
}))
app.use(helmet())
dbConnect()

const PORT = process.env.PORT

app.get('/',(req,res)=>{
    res.json({
        msg:`Welcome to Port no ${PORT}`
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is running on Port ${PORT}`)
})