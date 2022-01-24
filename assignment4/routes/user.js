const express = require('express');

const router = express();

const users = require('../routes/admin');

router.get('/', (req, res, next) => {
    const us = users.u;
    res.render('list', {user:us, pageTitle:'Users Page'});
});

module.exports = router;