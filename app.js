const path = require('path');
require('dotenv').config();
const express = require('express');

const blogRoutes = require('./routes/blog');
const db = require('./scripts/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(blogRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).render('500');
});

db.connectToDatabase().then(() => {
    app.listen(process.env.PORT);
});
