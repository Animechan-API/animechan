require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./data/data.japanese.json');

app.get('/', (req, res) => {
    res.send('quality anime quotes coming soon 🚀')
})



/** primary routes */


app.get('/api/quotes', (req, res) => {
    const { page, anime } = req.query;

    let quotes = null, results = db;
    // regular expression to match query with "anime" ignoring case!!
    let regexMatch = new RegExp(`^${anime}$`, 'gi');

    if (anime) {
        // filter results based on query
        results = db.filter(itm => regexMatch.test(itm.anime));
    }

    /** if pagination is not specified return 10 quotes
     * as default
     */
    if (!page) {
        quotes = results.slice(0, 10);
        return res.json(quotes)
    }

    /** pagination limit is up to 10 
     * request up than 10 will send a warning
    */
    if (page <= 10) {
        const startIndex = (page - 1) * 10;
        const endIndex = page * 10;

        quotes = results.slice(startIndex, endIndex);
        res.json(quotes);
    } else {
        res.json('page request limit is only up to 10!');
    };
});

/** get 1 random quote*/
app.get('/api/quotes/random', (req, res) => {
    const quote = db[Math.floor(Math.random() * db.length)]
    res.json(quote)
});


/**  404 page */
app.use((req, res, next) => {
    res.status(404).send(`sorry can't find it 😀`);
});

app.listen(process.env.PORT, () => {
    console.log(`server is connected at ${process.env.PORT}`);
})