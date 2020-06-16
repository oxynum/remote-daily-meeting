const admin = require('firebase-admin');

class FirebaseConnection {
  constructor() {
    let serviceAccount = require('./gcloud/sak.json');

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    
    this.db = admin.firestore();
  }

  registerUser(user) {
    try {
      let collectionRef = this.db.collection('users')
    
      collectionRef.add(user).then(documentReference => {
        console.log(`Added document with name: ${documentReference.id}`);
      });
    } catch(err) {
      console.log(err);
    }
  }

  printAllUsers() {
    this.db.collection('users').get()
    .then((snapshot) => {
      console.log('--------------');
      console.log('Users : ');
      console.log('--------------');
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        console.log('-------');
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
  }
}

module.exports = FirebaseConnection;