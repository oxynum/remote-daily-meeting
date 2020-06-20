<template>
  <div class="dashboard">
      <ScrumMasterDashboard v-if="checkIfCurrentUserIsSm()"/>
      <p v-else>Il n'y a pas de dashboard pour les membres d'équipe pour le moment.</p>
  </div>
</template>

<script>

import firebase from 'firebase'

import ScrumMasterDashboard from '../components/ScrumMasterDashboard.vue'

export default {

  data: () => ({
  }),

  components: {
    ScrumMasterDashboard
  },

  methods: {
    checkIfCurrentUserIsSm () {
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
        .then((doc) => {
          if (doc.exists) {
            return doc.data().isSM
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
