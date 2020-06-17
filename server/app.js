const cors = require('cors')
const express = require('express')
const bodyParser = require("body-parser");
const FirebaseConnection = require('./firebase.js');

fbCon = new FirebaseConnection();

var app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(fbCon.checkAuth);

app.get('/user/list', async function (req, res) {
  res.send(await fbCon.getAllUsers());
})

app.listen(3000, function () {
  console.log('Web server listening on port 3000')
})