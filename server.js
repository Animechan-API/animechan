require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./data/data.json');

app.get('/', (req, res) => {
    res.send('quality anime quotes coming soon 🚀')
})

// get a random quote
app.get('/api/quote', (req, res) => {
    const quote = db[Math.floor(Math.random() * db.length)]
    res.json(quote)
})

app.listen(process.env.PORT, () => {
    console.log(`server is connected at ${process.env.PORT}`);
})