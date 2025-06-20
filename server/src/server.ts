import { Request, Response } from "express";

const express = require('express')
const app = express();

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Hello from Express'
    })
})

app.get('/feedback', (req: Request, res: Response) => {
    res.json({
        _id: Date.now(),
        name: 'test',
        email: 'test',
        content: 'test',
        category: 'test',
        status: 'test'
    })
})

app.listen(5000, () => console.log('Server is listening on port 5000...'));
