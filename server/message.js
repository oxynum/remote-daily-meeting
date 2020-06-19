let twilioApiKey = require('./config/twilioApiKey.json');
const client = require('twilio')(twilioApiKey.accountSid, twilioApiKey.authToken);

function sendMsg(dest_number, msg) {
  const options = {
    to: dest_number,
    from: '+32460253281',
    body: msg,
  };

  client.messages.create(options, function(err, response) {
  if (err) {
      console.error(err);
    } else {
      console.log(`Message sent to ` + dest_number);
    }
    });
}

module.exports = sendMsg;