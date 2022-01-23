const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const expressHbs = require('express-handlebars');  -> was used for handlebars

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

// <--Way we initialise handlebars-->
// Handlebars are not built in and hence we need to import its dependency
// app.engine is used for creating an engine and 'handlebars' here is just a name we have given and initialised with expressHbs
//layoutsDir and defaultLayout are parameters passed to configure the layout of the handlebars

// app.engine('hbs', expressHbs({layoutsDir:'views/layouts/', defaultLayout: 'main-layout', extname:'hbs'}));
// app.set('view engine', 'hbs');
// app.set('views', 'views');

// <-- Way we initialise pug engine -->
// Pug is a built-in kind of an engine and hence we don't need to import it, we can directly use it

// app.set('view engine', 'pug');
// app.set('views', 'views');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle:"Page not found!"});
});

app.listen(3000);