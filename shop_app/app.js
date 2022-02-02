const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const Product = require('./models/product');
const User = require('./models/user');

const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


/*
    We are registering this middleware to store the user and that can be accessed from any part of the app.
    since we are placing above all the middlewares and without any filtering criteria, this will be executed always.
    we are making a new property for the request object, req.user = user.
    and after this middleware is executed, it moves to the other middleware through next()
*/
app.use((req, res, next) => {
    User.findByPk(1).then(
        user => {
            req.user = user;
            next();
        }
    ).catch(err => {
        console.log(err);
    });
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
//onDelete: 'CASCADE' makes sure, if User is deleted, all the Product related to it also gets deleted
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});

// the through property tells the sequelize where these connections should reside.

//force true is done inorder to override the previously created table with a new relation
sequelize
//.sync({force: true})
.sync()
    .then(
        result => {
            // console.log(result);
            return User.findByPk(1);
        }
    ).then(user => {
        if (!user) {
            return User.create({ name: 'Max', email: 'test@test.com' });
        }
        return user;
    }).then(user => {
        // console.log(user);
        user.createCart();
    }).then(cart => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });