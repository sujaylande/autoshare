import express from 'express';
import dotenv from 'dotenv';
import post from './routes/post.js';
import user from './routes/user.js';
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config({
    path: 'config/config.env' // Path to the config file
});
//console.log(`MONGO_URI: ${process.env.MONGO_URI}`); // Debug line
//console.log(`PORT: ${process.env.PORT}`); // Debug line

//using middlewares
app.use(express.json());
app.use(cookieParser());

//using routes
app.use('/api/v1', post);
app.use('/api/v1', user);

export default app;