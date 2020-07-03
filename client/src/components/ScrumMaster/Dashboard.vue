<template>
  <div class="scrummasterdashboard">
      <v-tabs vertical>
        <v-tab>
          <v-icon left>mdi-account-group</v-icon>
          équipes
        </v-tab>
        <v-tab>
          <v-icon left>mdi-calendar-month</v-icon>
          Réunions
        </v-tab>
        <v-tab-item class="full-height-tab">
          <TeamManagement/>
        </v-tab-item>
        <v-tab-item class="full-height-tab">
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
    currentTeam: null
  }),

  mounted () {
  }
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
.full-height-tab {
  height: calc(100vh - 100px); /* Adjust 270px to suits your needs */
  overflow-y: auto;
}
</style>
