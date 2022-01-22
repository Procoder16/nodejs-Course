const express = require('express');

const app = express();

app.get('/users',(req, res, next) => {
    res.send('<h1>The Users Page</h1>');
});

app.get('/', (req, res, next) => {
    res.send('<h1>The Default Page</h1>');
});

app.use((req, res, next) => {
    res.send('<h1>Error 404. PAGE NOT FOUND!!!</h1>');
});

app.listen(8008);