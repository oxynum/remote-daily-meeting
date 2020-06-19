const admin = require('firebase-admin');
const sendMsg = require('./message.js');

class FirebaseConnection {
  constructor() {
    let serviceAccountKey = require('./config/serviceAccountKey.json');

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountKey)
    });
    
    this.db = admin.firestore();
  }

  async getAllUsers() {
    var response = []

    await this.db.collection('users').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        response.push(doc.data());
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });

    
    return { "users" : response };
  }

  checkAuth(req, res, next) {
    if (req.headers.authtoken || req.path==='/auth') {
      admin.auth().verifyIdToken(req.headers.authtoken)
        .then(() => {
          next()
        }).catch(() => {
          res.status(403).send('Unauthorized')
        });
    } else {
      res.status(403).send('Unauthorized')
    }
  }

  newUserListener() {
    var db = this.db
    this.db.collection("users")
      .where("isSM", "==", false)
      .where("confirmationSent", "==", false)
      .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log('Envoi de message a ' + doc.data())
          let msg = 'Bonjour ' + doc.data().name + ', répondre Oui ou Non au +32460253281'
          msg = msg + ' pour confirmer (ou non) votre numéro.'
          sendMsg(doc.data().number, msg)
          db.collection("users").doc(doc.id)
            .update({
              confirmationSent: true
            })
            .then(function() {
              console.log("SMS confirmation sent!");
            })
            .catch(function(error) {
                console.error("Error updating document: ", error);
            });
        });
    });
  }

  confirmNumber(number) {
    var db = this.db
    this.db.collection("users")
    .where("number", "==", number)
    .where("numberConfirmed", "==", false)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.data())
          db.collection("users").doc(doc.id)
            .update({
              numberConfirmed: true
            })
            .then(function() {
              console.log("Number successfully confirmed!");
            })
            .catch(function(error) {
                console.error("Error updating document: ", error);
            });
        })
      })
  }

}

module.exports = FirebaseConnection;