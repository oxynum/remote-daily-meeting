<template>
  <div class="scrummasterdashboard">
      <v-tabs vertical class="scrollable">
        <v-tab>
          <v-icon left>mdi-account-group</v-icon>
          équipe
        </v-tab>
        <v-tab>
          <v-icon left>mdi-calendar-month</v-icon>
          Réunions
        </v-tab>
        <v-tab-item>
          <TeamManagement/>
        </v-tab-item>
        <v-tab-item>
          <TimeSettings/>
        </v-tab-item>
      </v-tabs>
  </div>
</template>

<script>

import TeamManagement from './TeamManagement.vue'
import TimeSettings from './TimeSettings.vue'

export default {

  components: {
    TeamManagement,
    TimeSettings
  },

  data: () => ({
  })
}
</script>

<style>

.flex-container {
  display: flex;
  flex-direction: column;
}

.flex-container > :not(.scrollable):not(.non-scrollable) {
  flex-shrink: 0;
}

.flex-container > .scrollable, .non-scrollable {
  flex-grow: 1;
}

.non-scrollable {
  overflow: hidden;
}

.scrollable {
  overflow: auto !important;
}

</style>
