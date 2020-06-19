const cors = require('cors')
const express = require('express')
const bodyParser = require("body-parser");
const FirebaseConnection = require('./firebase.js');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

fbCon = new FirebaseConnection();

var app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

//app.use(fbCon.checkAuth);

fbCon.newUserListener();

app.get('/user/list', async function (req, res) {
  res.send(await fbCon.getAllUsers());
})

app.post('/sms', (req, res) => {

  if(req.body.Body == 'Oui') {
    console.log('Repondu oui')
    fbCon.confirmNumber(req.body.From)
  }

  
  console.log('Reponse')

  const twiml = new MessagingResponse();

  // Add a text message.
  const msg = twiml.message('Merci, votre réponse a été prise en compte');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.listen(3000, function () {
  console.log('Web server listening on port 3000')
})