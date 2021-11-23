import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { readdirSync } from 'fs';

// importが使えない
const morgan = require('morgan');
require('dotenv').config();
const PORT = process.env.PORT ||8000
const app = express();

// const authRouter = require('./routes/auth')


// DB

mongoose
.connect(process.env.DATABASE)
.then(() => console.log('database connected'))
.catch((err) => console.log('DB connection Error'))

//middleware
app.use(express.json({ limit: "5mb"}));

app.use(cors({
    origin:[process.env.CLIENT_URL]
}));

app.use(morgan('combined'))

const routes = readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)))

const name = readdirSync('./routes')
console.log('name', name)



// routes
// app.use('/', authRouter)


app.listen(PORT,() => console.log(`server is running ${PORT}`))
