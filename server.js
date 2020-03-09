require('dotenv').config();
const express = require('express');
const app = express();

app.set('json spaces', 2);

// index routes
app.use('/', require('./routes/index'));
// api routes
app.use('/api', require('./routes/api/index'));
// not found route
app.use('*', require('./controllers/index_controllers').notFound);

app.listen(process.env.PORT, () => {
    console.log(`server is connected at ${process.env.PORT}`);
})