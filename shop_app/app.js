const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
//onDelete: 'CASCADE' makes sure, if User is deleted, all the Product related to it also gets deleted
User.hasMany(Product);

//force true is done inorder to override the previously created table with a new relation
sequelize.sync({force: true})
.then(
    result => {
        // console.log(result);
        app.listen(3000);
    }
).catch(err => {
    console.log(err);
});