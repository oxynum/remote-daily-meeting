function sendMsg(dest_number, msg) {
  const client = require('twilio')('AC5cdb719c14d32a3670cd198835e9f9f8', '5a37f6226acdfb761d561be85c725c20');
  const options = {
    to: dest_number,
    from: `+12036337754`,
    body: msg,
  };

  client.messages.create(options, function(err, response) {
  if (err) {
      console.error(err);
    } else {
      console.log(`Message sent to +33642127972`);
    }
    });
}