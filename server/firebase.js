const admin = require('firebase-admin');

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
}

module.exports = FirebaseConnection;