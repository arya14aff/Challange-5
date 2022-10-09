console.log('Server running');

const express = require('express');
const path = require('path');
const expressLayout = require('express-ejs-layouts');

const apis = require('./routes/api');
const webPages = require('./routes/web');
const fs = require('node:fs');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(expressLayout);

apis.apiRoutes(app);
webPages.webRoutes(app);

app.listen(3000);
