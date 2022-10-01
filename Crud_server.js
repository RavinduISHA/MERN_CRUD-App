const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//route import
const postRoutes = require('./routes/posts');

app.use(bodyParser.json()); //middle in app
app.use(cors());

app.use(postRoutes); // to route middle

const PORT = 8000;
const DB_URL = 'mongodb+srv://ravindu123:ravindu123@crudapp.thcoxwk.mongodb.net/crudapp?retryWrites=true&w=majority';

mongoose.connect(DB_URL)
.then(()=>{
    console.log('Database is connected...!');
})
.catch((err) => console.log('Database not connected',err));

app.listen(PORT, () =>{
    console.log('app is running on ');
});