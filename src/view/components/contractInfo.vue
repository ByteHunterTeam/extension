<template>
  <div>
    <div id="alert-additional-content-5"
         class="p-2 rounded-lg bg-transparent" role="alert">
      <div class="relative h-full overflow-hidden bg-cover rounded-xl p-4 border-gray-50 border"
           :style="{ backgroundImage: `url('${ContractImg}')` }">
        <span
            class="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-gray-50 to-slate-50 opacity-95"></span>
        <div class="flex items-center relative z-10">
          <img src="/src/assets/contract.svg" width="20"/>
          <h3 class="text-lg font-medium text-black ml-1">{{ chrome.i18n.getMessage("contract_info_title") }}<span
              v-if="props.data.name">({{ props.data.name }})</span></h3>
        </div>
        <div class="mt-2 mb-4 text-sm text-gray-800 dark:text-gray-300 relative z-10">
          {{ props.data.address }}
        </div>
        <div class="flex relative z-10">
          <button type="button"
                  class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-800"
                  @click="checkAddr(props.network,props.data.address)">
            <svg t="1690341605961" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="18481" width="20" height="20">
              <path
                  d="M254.6176 491.008a37.376 37.376 0 0 1 37.4784-37.376l62.208 0.2048a37.376 37.376 0 0 1 37.376 37.376v235.1616c6.9632-2.048 15.9744-4.3008 25.8048-6.6048a31.1808 31.1808 0 0 0 24.0128-30.3104V397.7728a37.376 37.376 0 0 1 37.376-37.376h62.2592a37.376 37.376 0 0 1 37.376 37.376v270.6944s15.616-6.2976 30.7712-12.6976a31.232 31.232 0 0 0 19.0464-28.7232V304.2816a37.4784 37.4784 0 0 1 37.376-37.376h62.3104a37.376 37.376 0 0 1 37.376 37.376v265.728c53.9648-39.1168 108.6976-86.1696 152.1664-142.848a62.72 62.72 0 0 0 9.5232-58.5728 439.6032 439.6032 0 0 0-409.6-296.8576C273.3568 68.4544 71.5776 267.776 71.5776 512a439.0912 439.0912 0 0 0 58.4704 220.2624 55.6544 55.6544 0 0 0 53.0944 27.4944c11.776-1.024 26.4704-2.5088 43.8784-4.5568a31.1296 31.1296 0 0 0 27.648-30.9248V491.008M254.6176 868.096a439.9616 439.9616 0 0 0 697.856-386.2016c-160.8704 239.872-457.728 352.0512-697.856 386.2016"
                  fill="#FFFFFF" p-id="18482"></path>
            </svg>
            <span class="pl-1">View more</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {checkAddr} from "@/view/utils/main";
import ContractImg from '@/assets/contract.jpg'

const chrome = window.chrome
const props = defineProps({
  data: {
    type: Object
  },
  network: {
    type: String
  }
})
</script>

<style scoped>

</style>