const express = require('express');
const path = require('path');
const morgan = require('morgan');

const { mongoose } = require('./database');
const { env } = require('process');

const app = express();


//Setting
app.set('port', process.env.PORT || 4000);


//Middlewares
app.use(morgan('dev'));

app.use(express.json());


//Routes
app.use('/api/task', require('../src/routes/task-routes'));


//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Server Init

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})