const cors = require('cors')
const express = require('express')
const bodyParser = require("body-parser");
const FirebaseConnection = require('./firebase.js');

fbCon = new FirebaseConnection();

var app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.get('/user/list', async function (req, res) {
  fbCon.printAllUsers();
})

app.post('/user/new',(request,response) => {
  console.log(request.body);
  fbCon.registerUser(request.body);
});


app.listen(3000, function () {
  console.log('Web server listening on port 3000')
})