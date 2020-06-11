require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const app = express();
const schema = require('./model/schema');
const { sampleDB } = require('./seeds/db_seed');
const { slugGen } = require('./util/slugGen')

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, './public')));

const db = mongoose.connection;

mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    schema.deleteMany({}).then(() => {
        sampleDB.map(i => {
            const quoteModel = {
                quote: i.quote,
                char: {
                    char_text: i.character,
                    char_slug: slugGen(i.character)
                },
                anime: {
                    anime_text: i.anime,
                    anime_slug: slugGen(i.anime)
                }
            }
            new schema(quoteModel).save();
        });
    })
    console.log('sample data seeding is complete 🚀');
});





db.once('open', () => console.log('mongodb is connected 🚀'));
db.on('error', console.error.bind(console, 'connection error:'));



app.set('json spaces', 2);

// index routes
app.use('/', require('./routes/index'));
// api routes
app.use('/api', require('./routes/api/index'));
// not found route
app.use('*', require('./controllers/index_controllers').notFound);

app.listen(process.env.PORT, () => {
    console.log(`server is connected at ${process.env.PORT} 🚀`);
})