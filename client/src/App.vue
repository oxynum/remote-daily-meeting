<template>
  <v-app>
    <v-main>
      <v-card
      class="mx-auto overflow-hidden rounded-0"
      height="100%"
    >
      <AppBar :drawer.sync="drawer"/>
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
      <router-view></router-view>
      </v-card-text>
    </v-card>
    </v-main>
  </v-app>
</template>

<script>

import AppBar from './components/AppBar.vue'

export default {
  data: () => ({
    drawer: false
  }),

  components: {
    AppBar
  }
}
</script>
