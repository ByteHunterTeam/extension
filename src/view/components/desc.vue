<template>
  <div>
    <a-descriptions :data="props.data.list" :title="props.data.title"
                    layout="inline-horizontal" size="small"/>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array
  }
})
</script>

<style scoped>

</style>