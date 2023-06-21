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
                                        <a-avatar v-if="props.params.data.recipient_info.logo" :size="25"
                                                  style="background-color: whitesmoke;">
                                            <img
                                                    :src="props.params.data.recipient_info.logo"
                                            />
                                        </a-avatar>
                                        <div class="text-blue-400 hover:text-blue-300 hover:underline"
                                             @click.stop="checkAddr(props.params.network,props.params.data.recipient_info.address)">
                                            {{
                                            props.params.data.recipient_info.name || handleAddr(props.params.data.recipient_info.address)
                                            }}
                                        </div>
                                    </div>
                                    <div>{{ props.params.data.type === 0 ? '授权' : '转移' }}</div>
                                    <div class="flex items-center ml-1">
                                        <div>{{
                                            props.params.data.asset_info.amount ? handleBigNumber(props.params.data.asset_info.amount) : ''
                                            }}
                                        </div>
                                        <div class="ml-1">
                                            <a-avatar v-if="props.params.data.asset_info.image_url" :size="25">
                                                <img
                                                        :src="props.params.data.asset_info.image_url"
                                                />
                                            </a-avatar>
                                        </div>
                                        <div class="text-blue-400 hover:text-blue-300 hover:underline"
                                             @click.stop="checkAddr(props.params.network,props.params.data.asset_info.contract_address)">
                                            {{ props.params.data.asset_info.name }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="navigator.language.toLowerCase() === 'en'">
                                <div class="flex items-center flex-wrap">
                                    <div>{{ props.params.data.type === 0 ? 'Approving' : 'Transferring' }}</div>
                                    <div class="flex items-center ml-1">
                                        <div>{{
                                            props.params.data.asset_info.amount ? handleBigNumber(props.params.data.asset_info.amount) : ''
                                            }}
                                        </div>
                                        <div class="ml-1">
                                            <a-avatar v-if="props.params.data.asset_info.image_url" :size="25">
                                                <img
                                                        :src="props.params.data.asset_info.image_url"
                                                        @error.once="useDefaultImage"
                                                />
                                            </a-avatar>
                                        </div>
                                        <div class="text-blue-400 ml-1 hover:text-blue-300 hover:underline"
                                             @click.stop="checkAddr(props.params.network,props.params.data.asset_info.contract_address)">
                                            {{ props.params.data.asset_info.name }}
                                        </div>
                                    </div>
                                    <div class="mx-1">To</div>
                                    <div class="flex items-center mx-1">
                                        <a-avatar v-if="props.params.data.recipient_info.logo" :size="25"
                                                  style="background-color: whitesmoke;">
                                            <img
                                                    :src="props.params.data.recipient_info.logo"
                                            />
                                        </a-avatar>
                                        <div class="text-blue-400 ml-1 hover:text-blue-300 hover:underline"
                                             @click.stop="checkAddr(props.params.network,props.params.data.recipient_info.address)">
                                            {{
                                            props.params.data.recipient_info.name || handleAddr(props.params.data.recipient_info.address)
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
                        props.params.data.asset_info.price ? '$' + parseFloat(props.params.data.asset_info.price) : chrome.i18n.getMessage("unknown_price")
                        }}
                    </div>
                </div>
            </a-collapse-item>
        </a-collapse>
        <a-list :max-height="250" :bordered="false">
            <a-list-item v-for="(item, index) in orderBy(props.params.data.risk_list,['risk'],['desc'])"
                         :key="index">
                <div class="flex items-center">
                    <icon-check v-if="item.risk === 1" style="color: #00B42A;font-size: 25px"/>
                    <icon-exclamation v-if="item.risk === 2" style="color: #F7BA1E;font-size: 25px"/>
                    <icon-close v-if="item.risk === 3" style="color: #F53F3F;font-size: 25px"/>
                    <div class="text-base font-bold ml-2 text-white w-10/12">{{ item.title }}</div>
                </div>
            </a-list-item>
        </a-list>
    </div>
</template>

<script setup>
import {orderBy} from "lodash-es";
import {IconCheck, IconClose, IconExclamation} from "@arco-design/web-vue/es/icon";
import {checkAddr, useDefaultImage, handleAddr, handleBigNumber} from "@/view/utils/main";

const chrome = window.chrome
const navigator = window.navigator

const props = defineProps({
    params: {
        type: Object
    }
})
</script>

<style scoped>

</style>
