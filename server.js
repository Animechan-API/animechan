require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./data/data.japanese.json');

app.get('/', (req, res) => {
    res.send('quality anime quotes coming soon 🚀')
})



/** primary routes */


app.get('/api/quotes', (req, res) => {
    const page = req.query.page;

    let quotes = null;

    /** if pagination is not specified return 10 quotes
     * as default
     */
    if (page == '') {
        quotes = db.slice(0, 10);
        res.json(quotes)
    }

    /** pagination limit is up to 10 
     * request up than 10 will send a warning
    */
    if (page <= 10) {
        const startIndex = (page - 1) * 10;
        const endIndex = page * 10;

        quotes = db.slice(startIndex, endIndex);
        res.json(quotes);
    } else if (page > 10) {
        res.send('page request limit is only up to 10!');
    };
});

/** get 1 random quote*/
app.get('/api/quotes/random', (req, res) => {
    const quote = db[Math.floor(Math.random() * db.length)]
    res.json(quote)
});

/** TODO
 *  Get quotes by the anime name 
*/


app.listen(process.env.PORT, () => {
    console.log(`server is connected at ${process.env.PORT}`);
})