<template>
  <div class="bg-white rounded-lg p-4 w-full break-words">
     <div class="text-black" style="white-space: pre-wrap">{{props.data}}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: String
  }
})
</script>

<style scoped>

</style>
