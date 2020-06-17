<template>
  <v-app>
    <v-content>
      <v-card
      class="mx-auto overflow-hidden rounded-0"
      height="100%"
    >
      <v-app-bar
        dark
      >
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title>Remote Daily Meetings</v-toolbar-title>
      </v-app-bar>
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
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Inscription</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-card-text>
      <router-view></router-view>
      </v-card-text>
    </v-card>
    </v-content>
  </v-app>
</template>

<script>

export default {
  data: () => ({
    drawer: false
  })
}
</script>
