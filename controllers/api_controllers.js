const db = require('../data/data.japanese.json');

module.exports.quotes = (req, res) => {
    const { page, anime } = req.query;
    let quotes = null, results = db;
    // regular expression to match query with "anime" ignoring case!!
    let regexMatch = new RegExp(`^${anime}$`, 'gi');
    if(anime){
        // filter results based on query
        results = db.filter(itm => regexMatch.test(itm.anime));
    }
    /** if pagination is not specified return 10 quotes
     * as default
     */
    if (!page) {
        quotes = results.slice(0, 10);
        res.json({ message: 'success', error: false, data: quotes });
    }
    /** pagination limit is up to 10 
     * request up than 10 will send a warning
    */
    if (page <= 10) {
        const startIndex = (page - 1) * 10;
        const endIndex = page * 10;

        quotes = results.slice(startIndex, endIndex);
        res.json({ message: 'success', error: false, data: quotes });
    } else {
        res.json({ 
            message: 'page request limit is only up to 10!', 
            error: true, 
            data: null 
        });
    };
}

module.exports.randomQuote = (req, res) => {
    const quote = db[Math.floor(Math.random() * db.length)]
    res.json({ message: 'success', error: false, data: quote });
}