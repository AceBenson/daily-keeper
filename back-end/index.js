const path = require('path')
const express = require("express");
var mongoose = require('mongoose')

var apiRouter = require('./routes/api');

const PORT = process.env.PORT || 3001;

const app = express();

var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../front-end/build')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
