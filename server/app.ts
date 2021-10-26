import dotenv from 'dotenv';
dotenv.config();

import './utils/schedule';

import express from 'express';
import mongoose from 'mongoose';

import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import fileUpload from 'express-fileupload';

import noteRouter from './routes/note';
import userRouter from './routes/user';
import categoryRouter from './routes/category';

const SESSION_KEY = (process.env.SESSION_KEY as string);
const MONGO_URI = (process.env.MONGO_URI as string);
const PORT = (process.env.PORT as string);

const app = express();

app.use(express.json());

// app.use(cors({}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(fileUpload());

app.use((_req, res, next) => { // This is made in order to avoid CORS error on the front-end side
    res.setHeader('Access-Control-Allow-Origin', '*'); // Second argument allows you to control whick domains should have access. In order to open it to any domain, take '*'
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // This controls which headers incoming requests may have, so that they are handled 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.use('/note', noteRouter);
app.use('/user', userRouter);
app.use('/category', categoryRouter);

mongoose.connect(MONGO_URI);

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
});