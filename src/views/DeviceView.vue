<template>
<div>
  Vista de {{$route.params.device}} en {{$route.params.room}}
  <CloseButton @onClick="$router.go(-1)"></CloseButton>
</div>

</template>

<script>
import CloseButton from "@/components/CloseButton";
export default {
  name: "DeviceView",
  components: CloseButton
}
</script>

<style scoped>

</style>