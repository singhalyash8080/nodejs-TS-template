import express,{Request,Response,NextFunction} from 'express'

import todoRoutes from './routes/todos'

import path from 'path'

require('dotenv').config({path:path.resolve(__dirname, '../.env') })

require('./db/mongoose.js')

const app = express()

app.use(express.json())

app.use('/todos',todoRoutes)

app.use((err: Error,req:Request,res: Response,next: NextFunction) => {
    res.status(500).json({message: err.message})
})

export const App = app