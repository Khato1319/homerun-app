<template>
<div>
  {{converter(deviceName)}} Vacuum
  <CloseButton @onClick="close"></CloseButton>
</div>
</template>

<script>
import CloseButton from "@/components/CloseButton";
import slugConverter from "../../../utils/Utils";
export default {
  name: "VacuumView",
  components: {
    CloseButton
  },
  methods: {
    close() {
      this.$router.go(-1);
    }
  },
  data() {
    return {
      deviceName: this.$route.params.deviceName,
      converter: slugConverter
    }
  }
}
</script>

<style scoped>

</style>