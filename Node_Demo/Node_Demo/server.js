//get dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config.js');
const app = express();
//parse request
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
require('./user.routes.js')(app);

//CROS
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.listen(config.serverport, () => {
    console.log("Server is listening on port 3000");
});

//default route
app.get('/',(req,res)=>{
  res.json({"message":" Welcome to CRUD api App"})
});
