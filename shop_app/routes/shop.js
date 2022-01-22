const express = require('express');
const path = require('path');

const router = express.Router();

const adminData = require('./admin');
/*
    Firstly remember sendFile function needs the absolute location with respect to the OS
    And hence we use path.join that joins all the paths given as parameter and we want to reach shop.html file
    __dirname gives us the current directory we are in, in this case, we are in route
    ../ means go up a level
    then 'views' specifies the directory to look for
    'shop.html' is the file we are looking for
*/

router.get('/',(req,res, next) => {
    // console.log('shop.js', adminData.products);
    // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
    res.render('shop');
    //here we don't need to mention the path as we have have already mentioned it while mentioning the views in app.js
});

module.exports = router;