const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost/mern-task-db'

mongoose.connect(
    
    DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    .then(db => console.log('Db connected'))
    .catch(err => console.log(err));


module.exports = mongoose;