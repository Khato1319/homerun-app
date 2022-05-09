<template>
  <div>
    <AddButton @onClick="addDevice"></AddButton>
    <EditButton class='edit-button' @onClick="editDevice"></EditButton>
    <CloseButton @onClick="close"/>

      <div  class="ma-4 text-left text-caption text-md-body-1 font-weight-medium primary--text" >Rutina {{
          this.converter(routine)}}</div>

      <v-card v-for="action in actions" :key="action.name">
        <v-card-text>{{converter(action.device)}} de {{converter(action.room)}}: {{converter(action.action)}} </v-card-text>
      </v-card>

  </div>

</template>

<script>
// todo: agregar la posibiidad de editar rutinas
import AddButton from "@/components/ViewButtons/AddButton";
import CloseButton from "@/components/ViewButtons/CloseButton";
import EditButton from "@/components/ViewButtons/EditButton";
import {slugToText} from "../../utils/Utils";
import {mapGetters, mapState} from "vuex";
export default {
  name: "RoutineView",
  components: {
    AddButton,
    CloseButton,
    EditButton
  },
  data() {
    return {
      routine: this.$route.params.routine,
    }
  },
  methods: {
    converter(string) {
      return slugToText(string)
    },
    ...mapGetters(['selectedRoutine']),
    addDevice() {
      this.$router.push({ name: 'addRoutine', params: { routine:  this.routine} })
    },
    close() {
      this.$store.commit('selectRoom',"");
      this.$router.push({ path: '/'})
    },
    editDevice(){

    }
  },
  computed: {
    ...mapState(['devices']),
    actions() {
      return this.$store.getters.getRoutine(this.routine).actions
    }
  }
}
</script>

<style scoped>
.edit-button {
  top: 25px;
  right: 60px;
}
</style>