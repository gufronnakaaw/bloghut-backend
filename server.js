import express from "express"
import { config } from "dotenv"
import cors from 'cors'

// config 
config()

// variable 
const PORT = process.env.PORT
const app = express()

// middleware
app.use(cors({
    origin: 'http://localhost:port_client',
}))

app.get('/api/v1', (req, res) => {
    const start = Date.now()

    res.status(200).json({
        took: Date.now() - start,
        status: "OK",
        message: 'soon',
        data: null,
        errors: null
    })

})

// run app
app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`)
})