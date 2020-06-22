<template>
  <div class="timesettings">
    <v-card flat>
      <v-card-text>
        <v-switch label="Envoi des SMS" v-model="SMSPushActivated"></v-switch>
        <ul v-show="SMSPushActivated">
        <li>
          <p>Heure d'envoi des SMS : </p>
          <v-dialog class="justify-center" v-model="chooseSMSDatetimeDialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="primary">{{ SMSPushDatetime }}</v-btn>
            </template>
            <v-card>
              <v-card-title class="justify-center">
                <span class="headline">Choisir l'heure d'envoi des SMS</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <br/>
                  <v-row justify="space-around">
                  <v-time-picker v-model="SMSPushDatetime" format="24hr"></v-time-picker>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="chooseSMSDatetime">Valider</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </li>
        </ul>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

export default {

  data: () => ({
    confirmDeleteDialog: false,
    memberToDelete: null,
    SMSPushActivated: true,
    SMSPushDatetime: '12:00',
    chooseSMSDatetimeDialog: false
  }),

  methods: {
    chooseSMSDatetime () {
      this.chooseSMSDatetimeDialog = false
    }
  }
}
</script>
