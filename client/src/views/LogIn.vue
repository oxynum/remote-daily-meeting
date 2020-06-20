<template>
  <div class="login">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordRules"
        :type="show ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        hint="At least 8 characters"
        counter
        @click:append="show = !show"
      ></v-text-field>
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
      >
        Valider
      </v-btn>
    </v-form>
    <v-dialog v-model="activationDialog" persistent max-width="400">
        <v-card>
          <v-card-title class="headline">Réactiver votre compte ?</v-card-title>
          <v-card-text>Votre compte est actuellement désactivé. Souhaitez-vous le réactiver ?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="activationDialog = false">Non</v-btn>
            <v-btn color="green darken-1" text @click="signIn(true)">Oui</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    <br />
  </div>
</template>

<script>
import firebase from 'firebase'

export default {

  data: () => ({
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'Veuillez rentrer votre adresse e-mail afin de vous connecter.',
      v => /.+@.+\..+/.test(v) || 'L\'adresse que vous avez rentrée n\'est pas valide'
    ],
    show: false,
    password: '',
    passwordRules: [
      value => !!value || 'Required.'
    ],
    activationDialog: false
  }),
  mounted () {
  },
  methods: {
    validate () {
      if (this.valid) {
        this.signIn()
      }
    },
    signIn (bypassCheck = false) {
      if (!bypassCheck) {
        // We check if the user's account is active
        firebase.firestore().collection('users')
          .where('email', '==', this.email)
          .where('password', '==', this.password)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (!doc.data().active) {
                this.activationDialog = true
              } else {
                firebase.auth()
                  .signInWithEmailAndPassword(this.email, this.password)
                  .then(() => {
                    this.$router.push('/')
                  }).catch((err) => {
                    console.log(err)
                  })
              }
            })
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        // We have to activate the account after we logged in
        firebase.auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$secondaryApp.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
              active: true
            }).then(() => {
              console.log('Le compte ' + firebase.auth().currentUser.uid + ' a été réactivé')
            }).catch((error) => {
              console.error('Error updating document: ', error)
            })
            this.$router.push('/')
          }).catch((err) => {
            console.log(err)
          })
      }
    }
  }
}
</script>
