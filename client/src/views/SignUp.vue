<template>
  <div class="home">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="name"
        :counter="20"
        :rules="nameRules"
        label="Nom"
        required
      ></v-text-field>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[passwordRules.required, passwordRules.min]"
        :type="show ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        hint="At least 8 characters"
        counter
        @click:append="show = !show"
      ></v-text-field>
      <v-row>
        <v-col cols="1">
          <v-select
            v-model="prefix"
            :items="prefixes"
            :rules="[v => !!v || 'Le préfixe est obligatoire']"
            label="Préfixe"
            required
          ></v-select>
        </v-col>
        <v-col cols="11">
          <v-text-field
            v-model="number"
            :counter="9"
            :rules="numberRules"
            label="Numéro de téléphone"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
      >
        Valider
      </v-btn>
    </v-form>
    <v-dialog
        v-model="dialog"
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">Vous êtes enregistré !</v-card-title>
          <v-card-text>
            Veuillez consulter votre adresse e-mail pour valider votre compte.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="closeDialog"
            >
              Ok
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

  </div>
</template>

<script>
import firebase from 'firebase'

export default {

  data: () => ({
    valid: true,
    dialog: false,
    name: '',
    nameRules: [
      v => !!v || 'Le nom est obligatoire',
      v => (v && v.length <= 20) || 'Le nom doit faire moins de 20 lettres'
    ],
    email: '',
    emailRules: [
      v => !!v || 'L\'adresse e-mail est obligatoire',
      v => /.+@.+\..+/.test(v) || 'L\'adresse que vous avez rentrée n\'est pas valide'
    ],
    show: false,
    password: '',
    passwordRules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Minimum 8 lettres'
    },
    numberRules: [
      v => !!v || 'Le numéro de téléphone est obligatoire',
      v => (v && v.length === 9) || 'Le numéro de téléphone doit etre composé de 9 chiffres'
    ],
    prefix: null,
    prefixes: [
      '+33'
    ]
  }),
  mounted () {
  },
  methods: {
    validate () {
      if (this.valid) {
        this.$refs.form.validate()
        this.signUp()
      }
    },
    signUp () {
      const errorHandler = (e) => {
        console.log(e)
      }

      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          firebase.auth().currentUser.updateProfile({
            displayName: this.name
          }).then(() => {
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
              name: this.name,
              email: this.email,
              number: this.prefix + this.number,
              password: this.password,
              isSM: true
            })
              .then(() => {
                console.log('Sign up successful !')
                this.$refs.form.reset()
                this.dialog = true
              })
              .catch(errorHandler)
          }).catch(errorHandler)
        })
        .catch(errorHandler)
    },
    closeDialog () {
      this.dialog = false
      this.$router.push('/')
    }
  }
}
</script>
