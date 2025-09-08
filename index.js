import 'dotenv/config'
import express from 'express'
import { clerkMiddleware, requireAuth } from '@clerk/express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = 3000

app.set('trust proxy' , 1)
app.use(cors({
    origin: ['https://clerk-fro.vercel.app'],
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(clerkMiddleware())

app.get('/' , (req,res)=> {
    console.log("Hello")
    res.send("Hello world")
})

app.get('/protected' , requireAuth , (req,res)=>{
    res.send({status:1})
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})