<template>
  <div>
    <a-collapse accordion class="rounded-lg">
      <a-collapse-item key="1">
        <template #header>
          <div class="flex items-center w-full">
            <div class="text-base text-white ml-1">
              <div v-if="navigator.language === 'zh-CN'">
                <div class="flex items-center flex-wrap">
                  <div>正在向地址</div>
                  <div class="flex items-center mx-1">
                    <a-avatar v-if="props.data.recipient_info.logo" :size="25"
                              style="background-color: whitesmoke;">
                      <img
                          :src="props.data.recipient_info.logo"
                      />
                    </a-avatar>
                    <div class="text-blue-400 hover:text-blue-300 hover:underline"
                         @click.stop="checkAddr(props.network,props.data.recipient_info.address)">
                      {{
                        props.data.recipient_info.name || handleAddr(props.data.recipient_info.address)
                      }}
                    </div>
                  </div>
                  <div>{{ props.data.type === 0 ? '授权' : '转移' }}</div>
                  <div class="flex items-center ml-1">
                    <div>{{
                        props.data.asset_info.amount ? handleBigNumber(props.data.asset_info.amount) : ''
                      }}
                    </div>
                    <div class="ml-1">
                      <a-avatar v-if="props.data.asset_info.image_url" :size="25">
                        <img
                            :src="props.data.asset_info.image_url"
                        />
                      </a-avatar>
                    </div>
                    <div class="text-blue-400 hover:text-blue-300 hover:underline"
                         @click.stop="checkAddr(props.network,props.props.data.asset_info.contract_address)">
                      {{ props.data.asset_info.name }}
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="navigator.language.toLowerCase() === 'en'">
                <div class="flex items-center flex-wrap">
                  <div>{{ props.data.type === 0 ? 'Approving' : 'Transferring' }}</div>
                  <div class="flex items-center ml-1">
                    <div>{{
                        props.data.asset_info.amount ? handleBigNumber(props.data.asset_info.amount) : ''
                      }}
                    </div>
                    <div class="ml-1">
                      <a-avatar v-if="props.data.asset_info.image_url" :size="25">
                        <img
                            :src="props.data.asset_info.image_url"
                            @error.once="useDefaultImage"
                        />
                      </a-avatar>
                    </div>
                    <div class="text-blue-400 ml-1 hover:text-blue-300 hover:underline"
                         @click.stop="checkAddr(props.network,props.data.asset_info.contract_address)">
                      {{ props.data.asset_info.name }}
                    </div>
                  </div>
                  <div class="mx-1">To</div>
                  <div class="flex items-center mx-1">
                    <a-avatar v-if="props.data.recipient_info.logo" :size="25"
                              style="background-color: whitesmoke;">
                      <img
                          :src="props.data.recipient_info.logo"
                      />
                    </a-avatar>
                    <div class="text-blue-400 ml-1 hover:text-blue-300 hover:underline"
                         @click.stop="checkAddr(props.network,props.data.recipient_info.address)">
                      {{
                        props.data.recipient_info.name || handleAddr(props.data.recipient_info.address)
                      }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div class="flex items-center">
          <div class="text-base">{{ chrome.i18n.getMessage("total_price") }}:</div>
          <div class="ml-1 text-base font-bold">{{
              props.data.asset_info.price ? '$' + parseFloat(props.data.asset_info.price) : chrome.i18n.getMessage("unknown_price")
            }}
          </div>
        </div>
      </a-collapse-item>
    </a-collapse>
  </div>
</template>

<script setup>
import {checkAddr, useDefaultImage, handleAddr, handleBigNumber} from "@/view/utils/main";
const chrome = window.chrome
const navigator = window.navigator
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