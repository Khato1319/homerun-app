<template>
<div>
  {{converter(deviceName)}} Oven
  <CloseButton @onClick="close"></CloseButton>
</div>
</template>

<script>
import CloseButton from "@/components/CloseButton";
import {slugToText} from "../../../utils/Utils";
export default {
  name: "OvenView",
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
      converter: slugToText
    }
  }
}
</script>

<style scoped>

</style>