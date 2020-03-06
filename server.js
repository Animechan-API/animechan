require('dotenv').config();
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('quality anime quotes coming soon 🚀')
})


app.listen(process.env.PORT, () => {
    console.log(`server is connected at ${process.env.PORT}`);
})