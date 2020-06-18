<template>
  <div class="home">
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
    ]
  }),
  mounted () {
  },
  methods: {
    validate () {
      if (this.valid) {
        this.signIn()
      }
    },
    signIn () {
      firebase.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push('/')
        }).catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
