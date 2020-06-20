<template>
  <div class="dashboard">
      <ScrumMasterDashboard v-if="isSM"/>
      <p v-else>Il n'y a pas de dashboard pour les membres d'équipe pour le moment.</p>
      <p>{{ this.checkIfCurrentUserIsSm() }}</p>
  </div>
</template>

<script>

import firebase from 'firebase'

import ScrumMasterDashboard from '../components/ScrumMasterDashboard.vue'

export default {

  data: () => ({
    isSM: false
  }),

  components: {
    ScrumMasterDashboard
  },

  methods: {
    checkIfCurrentUserIsSm () {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
            .then((doc) => {
              if (doc.exists) {
                this.isSM = doc.data().isSM
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    }
  }
}
</script>
