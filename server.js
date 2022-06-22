import express from "express"
import { config } from "dotenv"
import cors from 'cors'
import apiv1 from './routes/apiv1.js'

// config 
config()

// variable 
const PORT = process.env.PORT
const app = express()

// middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'PATCH']
}))

app.use(express.json())

// endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Hi!'
    })
})

app.use('/api/v1', apiv1)

// run app
app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`)
})