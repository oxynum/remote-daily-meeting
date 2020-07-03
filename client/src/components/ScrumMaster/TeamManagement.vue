<template>
  <div id="teammanagement">
    <div v-if="currentTeam">
        <v-card flat>
          <v-card-text>
            <v-card flat>
                <v-card-text>
                    <v-simple-table v-if="team.length" fixed-header height="300px">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-left">Name</th>
                            <th class="text-left">Numéro</th>
                            <th class="text-left">E-mail</th>
                            <th class="text-left">Numéro confirmé</th>
                            <th class="text-left">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in team" :key="item.name">
                            <td>{{ item.name }}</td>
                            <td>{{ item.number }}</td>
                            <td>{{ item.email }}</td>
                            <td>
                            <v-icon v-if="item.numberConfirmed" color="primary">mdi-hand-okay</v-icon>
                            <v-icon v-else color="warning">mdi-alert-octagram</v-icon>
                            </td>
                            <td>
                            <v-btn color="primary" icon><v-icon>mdi-pencil</v-icon></v-btn>
                            -
                            <v-dialog
                                v-model="confirmDeleteDialog"
                                width="500"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    color="error"
                                    icon
                                    @click="deleteMemberButton(item)"
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                                </template>
                                <v-card>
                                <v-card-title
                                    class="headline grey lighten-2"
                                    primary-title
                                >
                                    Confirmation
                                </v-card-title>
                                <v-card-text>
                                    <br/>
                                    Êtes vous sûr de vouloir supprimer {{ item.name }} ?
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                    color="error"
                                    @click="deleteMember"
                                    >
                                    Supprimer
                                    </v-btn>
                                </v-card-actions>
                                </v-card>
                            </v-dialog>
                            </td>
                        </tr>
                        </tbody>
                    </template>
                    </v-simple-table>
                    <div v-else class="text-center">
                    <h3>Cette équipe est vide pour le moment. Vous pouvez désormais y ajouter des membres.</h3>
                    <br/>
                    </div>
                    <v-card-actions class="justify-center">
                        <v-dialog v-model="addMemberDialog" persistent max-width="600px">
                        <v-card>
                            <v-card-title>
                            <span class="headline">Ajout d'un membre d'équipe</span>
                            </v-card-title>
                            <v-card-text>
                            <v-container>
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
                                    <v-col cols="3">
                                    <v-select
                                        v-model="prefix"
                                        :items="prefixes"
                                        :rules="[v => !!v || 'Le préfixe est obligatoire']"
                                        label="Préfixe"
                                        required
                                    ></v-select>
                                    </v-col>
                                    <v-col cols="9">
                                    <v-text-field
                                        v-model="number"
                                        :counter="9"
                                        :rules="numberRules"
                                        label="Numéro de téléphone"
                                        required
                                    ></v-text-field>
                                    </v-col>
                                </v-row>
                                </v-form>
                            </v-container>
                            </v-card-text>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="addMemberDialog = false">Fermer</v-btn>
                            <v-btn :disabled="!valid" color="blue darken-1" text @click="addTeamMember">Ajouter</v-btn>
                            </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-card-actions>
                </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
    </div>
      <div v-else>
        <p>Selectionner une team</p>
      </div>
      <div>
        <v-speed-dial
          v-model="fab"
          absolute
          bottom
          right
          :direction="direction"
          :transition="transition"
        >
          <template v-slot:activator>
            <v-btn
              v-model="fab"
              color="blue darken-2"
              dark
              fab
            >
              <v-icon v-if="fab">mdi-close</v-icon>
              <v-icon v-else>mdi-cogs</v-icon>
            </v-btn>
          </template>
          <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            dark
            small
            color="primary"
            @click="addMemberDialog = true"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-account-plus</v-icon>
          </v-btn>
          </template>
          <span>Ajouter un membre d'équipe</span>
          </v-tooltip>
          <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            dark
            small
            color="indigo"
            @click="addTeamDialog = true"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-account-multiple-plus</v-icon>
          </v-btn>
          </template>
          <span>Ajouter une équipe</span>
          </v-tooltip>
          <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            dark
            small
            color="green"
            v-if="currentTeam"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          </template>
          <span>Modifier l'équipe</span>
          </v-tooltip>
          <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            dark
            small
            color="red"
            @click="deleteTeam(currentTeam)"
            v-if="currentTeam"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          </template>
          <span>Supprimer l'équipe</span>
          </v-tooltip>
        </v-speed-dial>
      </div>
      <v-dialog v-model="addTeamDialog" persistent max-width="600px">
      <v-card>
          <v-card-title>
          <span class="headline">Ajout d'une équipe</span>
          </v-card-title>
          <v-card-text>
          <v-container>
              <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              >
              <v-text-field
                  v-model="teamName"
                  :counter="20"
                  :rules="nameRules"
                  label="Nom"
                  required
              ></v-text-field>
              </v-form>
          </v-container>
          </v-card-text>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="addTeamDialog = false">Fermer</v-btn>
          <v-btn :disabled="!valid" color="blue darken-1" text @click="addTeam">Ajouter</v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import firebase from 'firebase'

export default {

  data: () => ({
    tab: null,
    currentTeam: null,
    teams: [],
    team: [],
    addMemberDialog: false,
    valid: true,
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
    ],
    addTeamDialog: false,
    teamName: '',
    direction: 'top',
    fab: false,
    transition: 'slide-y-reverse-transition',
    numberOfTeams: 0
  }),
  async mounted () {
    this.loadTeam()
  },

  methods: {
    loadTeam () {
      var BreakException = {}
      var teamsRef = this.$secondaryApp.firestore().collection('teams')

      var query = teamsRef
        .where('idSM', '==', firebase.auth().currentUser.uid)
        .where('active', '==', true)

      try {
        query.orderBy('creationDate')
          .onSnapshot((snapshot) => {
            this.numberOfTeams = 0
            snapshot.forEach((doc) => {
              this.numberOfTeams = this.numberOfTeams + 1
              if (this.numberOfTeams.toString() === this.$route.params.team) {
                this.currentTeam = doc.data()
                this.currentTeam.id = doc.id
                this.updateMembers()
              }
            })
          })
      } catch (e) {
        if (e !== BreakException) throw e
      }
    },
    updateMembers () {
      if (this.currentTeam !== null) {
        var usersRef = this.$secondaryApp.firestore().collection('users')
        var query = usersRef
          .where('idTeam', '==', this.currentTeam.id)
          .where('active', '==', true)
        query
          .onSnapshot((querySnapshot) => {
            this.team = []
            querySnapshot.forEach((doc) => {
              this.team.push(doc.data())
              this.team[this.team.length - 1].id = doc.id
            })
          })
      }
    },
    addTeamMember () {
      const errorHandler = (e) => {
        console.log('erreur:', e)
      }

      var currentTeamId = this.currentTeam.id

      this.$secondaryApp.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          firebase.firestore().collection('users').doc(user.user.uid).set({
            name: this.name,
            email: this.email,
            number: this.prefix + this.number,
            password: this.password,
            isSM: false,
            idTeam: currentTeamId,
            numberConfirmed: false,
            confirmationSent: false,
            active: true
          }).then(() => {})
          this.addMemberDialog = false
          this.updateMembers()
          this.$refs.form.reset()
        })
        .catch(errorHandler)
    },
    deleteMemberButton (member) {
      this.memberToDelete = member
      this.confirmDeleteDialog = true
    },
    deleteMember () {
      this.confirmDeleteDialog = false

      this.$secondaryApp.firestore().collection('users').doc(this.memberToDelete.id).update({
        active: false
      }).then(() => {
      }).catch((error) => {
        console.error('Error removing document: ', error)
      })
    },
    reload () {
      var location = this.$route.fullPath

      this.$router.replace('/')

      this.$nextTick(() => this.$router.replace(location))
    },
    deleteTeam (team) {
      firebase.firestore().collection('teams').doc(team.id).update({
        active: false
      })
      var teamParam = parseInt(this.$route.params.team, 10)
      if (this.numberOfTeams > 1) {
        if (teamParam === 1) {
          this.reload()
        } else {
          this.$router.push('/dashboard/' + (teamParam - 1) + '/members')
        }
      } else {
        this.$router.push('/dashboard')
      }
    },
    addTeam () {
      const errorHandler = (e) => {
        console.log('error:', e)
      }

      var currentSMId = firebase.auth().currentUser.uid
      var timestamp = firebase.firestore.Timestamp.now()

      firebase.firestore().collection('teams').add({
        name: this.teamName,
        idSM: currentSMId,
        active: true,
        creationDate: ((timestamp.seconds * 1000000000) + timestamp.nanoseconds).toString()
      })
        .then(() => {})
        .catch(errorHandler)
      this.$refs.form.reset()
      this.addTeamDialog = false
    }
  },
  watch: {
    $route (to, from) {
      this.loadTeam()
    }
  }
}
</script>
