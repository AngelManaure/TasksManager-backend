import express from 'express'
import morgan from 'morgan';
import cors from 'cors'

import { PORT } from "./config.js";
import taskRoutes from "./routes/tasks.routes.js";

const app  = express()

const corsOptions = {
    origin: 'http://localhost:5173/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(morgan('dev'))

app.use(taskRoutes)

app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
})

app.listen(PORT, () => {
    try {
        console.log('Server running on port', PORT);
    } catch (error) {
        console.log(error);
    }
})