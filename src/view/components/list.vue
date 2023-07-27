<template>
  <div>
    <div class="flex items-center">
      <div class="text-base text-white font-bold mt-2">{{
          props.data.title
        }}
      </div>
      <div class="ml-1">
        <a-tag color="#0DA5AA" v-if="netMap.hasOwnProperty(props.data.chain_id)">
          <img :src="netMap[props.data.chain_id].icon" width="16"/>
          <span class="font-bold pl-1">{{ netMap[props.data.chain_id].name }} Chain</span></a-tag>
      </div>
    </div>
    <a-list :bordered="false">
      <template #empty>
        <vue3-lottie :animation-data="emptyJson" :width="60" :loop="false"/>
        <p class="text-center">Empty</p>
      </template>
      <a-list-item v-for="(item,index) in props.data.list" :key="index">
        <a-list-item-meta
            :title="item.name"
            :description="item.desc"
        >
          <template #avatar>
            <div class="cursor-pointer hover:bg-white hover:rounded-lg" @click="jump(item.link)">
              <a-avatar shape="square">
                <img
                    alt="avatar"
                    @error.once="useDefaultImage"
                    :src="item.image"
                />
              </a-avatar>
            </div>
          </template>
        </a-list-item-meta>
        <template #actions>
          <div class="text-xl font-bold" v-if="item.amount">
            {{ parseFloat(item.amount) }}
          </div>
        </template>
      </a-list-item>
    </a-list>
  </div>
</template>

<script setup>
import {netMap, useDefaultImage} from "@/view/utils/main";
import emptyJson from "@/assets/lottie/empty.json";
import {Vue3Lottie} from "vue3-lottie";

const props = defineProps({
  data: {
    type: Object
  }
})

const jump = (url) => {
  window.open(url)
}
</script>

<style scoped>

</style>