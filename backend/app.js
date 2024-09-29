import express from 'express';
import main from './db.js';
import taskRouter from './routers/task.router.js';
import userRouter from './routers/user.router.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();


const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true, 
};

app.use(cors(corsOptions)); 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = process.env.PORT || 4000;

app.use('/Task', taskRouter);
app.use('/User', userRouter);

app.get('*', (req, res) => {
    res.send("hello");
});

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
    main();
});
