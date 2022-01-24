const express = require('express');

const router = express();

const u = [];

router.get('/add-users', (req, res, next) => {
    res.render('add-user', {pageTitle:'Add User'});
});

router.post('/add-users', (req, res, next) => {
    u.push({title:req.body.title});
    res.redirect('/');
});

exports.routes = router;
exports.u = u;