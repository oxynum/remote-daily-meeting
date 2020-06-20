<template>
  <v-app>
    <v-main>
      <v-card
      class="rounded-0"
      height="100%"
    >
      <AppBar :drawer.sync="drawer" :logOutBtn.sync="logOutBtn" />
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group
            v-model="group"
          >
            <v-list-item @click="$router.push('/')">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Accueil</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.push('/signup')">
              <v-list-item-icon>
                <v-icon>mdi-account-multiple-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Inscription</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.push('/login')">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Connexion</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.push('/dashboard')">
              <v-list-item-icon>
                <v-icon>mdi-cogs</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Paramètres</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-card-text>
        <div v-if="!logOutBtn">
        <v-alert
          prominent
          type="warning"
          v-if="!isEmailVerified()"
        >
          <v-row align="center">
            <v-col class="text-center grow">Votre adresse e-mail n'est pas vérifiée. Veuillez consulter vos e-mails pour le mail de vérification.</v-col>
            <v-col class="shrink">
              <v-btn>Envoyer de nouveau</v-btn>
            </v-col>
          </v-row>
        </v-alert>
        </div>
        <router-view></router-view>
      </v-card-text>
    </v-card>
    </v-main>
  </v-app>
</template>

<script>

import firebase from 'firebase'
import AppBar from './components/AppBar.vue'

export default {
  data: () => ({
    drawer: false,
    logOutBtn: false
  }),

  components: {
    AppBar
  },

  methods: {
    isConnected () {
      return firebase.auth().currentUser !== null
    },
    isEmailVerified () {
      if (this.isConnected()) {
        return firebase.auth().currentUser.emailVerified
      }
      return true
    }
  }
}
</script>
