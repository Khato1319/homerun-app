<template>
  <div>
    <RecentsView/>
  </div>
</template>


<script>
// @ is an alias to /src
import RecentsView from "@/components/RecentsView";

export default {
  name: 'HomeView',
  components: {
    RecentsView
  },
  data() {
    return {

    }
  },
  mounted() {
    this.$store.commit('setEditActionsPressed', false)
    this.$store.commit('setEditRoutinePressed', false)
    this.$store.commit('setEditRoomPressed', false)
    this.$store.commit('setEditTheRoomPressed', false)
    this.$store.commit('selectRoutine', '')
    this.$store.commit('selectRoom', '')
  },
  methods: {

  }
}
</script>
