<template>
  <div>
    <a-collapse :bordered="false">
      <a-collapse-item :header="chrome.i18n.getMessage('risk_list')">
        <a-list :max-height="250" :bordered="false">
          <a-list-item v-for="(item, index) in orderBy(props.data,['risk'],['desc'])"
                       :key="index">
            <div class="flex items-center">
              <icon-check v-if="item.risk === 1" style="color: #00B42A;font-size: 25px"/>
              <icon-exclamation v-if="item.risk === 2" style="color: #F7BA1E;font-size: 25px"/>
              <icon-close v-if="item.risk === 3" style="color: #F53F3F;font-size: 25px"/>
              <div class="text-base font-bold ml-2 text-white w-10/12">{{ item.title }}</div>
            </div>
          </a-list-item>
        </a-list>
      </a-collapse-item>
    </a-collapse>
  </div>
</template>

<script setup>
import {orderBy} from "lodash-es";
import {IconCheck, IconClose, IconExclamation} from "@arco-design/web-vue/es/icon";

const chrome = window.chrome
const props = defineProps({
  data: {
    type: Array
  }
})
</script>

<style scoped>

</style>
