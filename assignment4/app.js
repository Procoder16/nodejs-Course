const express = require('express');
const bodyParser = require('body-parser');

const adminData = require('./routes/admin');
const userRoutes = require('./routes/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended : true}));

app.use(adminData.routes);
app.use(userRoutes);

app.get('*',(req, res, next) => {
    res.status(404).send('<h1>404 Page not found!</h1>');
});

app.listen(3000);