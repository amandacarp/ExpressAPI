const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/api')
const path = require('path')

const app = express();

app.use(cors());
app.use(express.json()); //parse json
app.use(express.urlencoded({ extended: false }));


app.use('/api', apiRouter)

app.use(express.static(path.join(__dirname, '../client')));


app.listen(3000, () => {
    console.log('Server up yo!')
});