<template>
<div>
  Light
  <CloseButton @onClick="close"></CloseButton>
</div>
</template>

<script>
import CloseButton from "@/components/CloseButton";
export default {
  name: "LightView",
  components: {
    CloseButton
  },
  methods: {
    close() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>

</style>