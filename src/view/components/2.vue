<template>
    <div>
        <a-alert type="info" v-if="navigator.language.toLowerCase() === 'en'">Interacting with the contract
            <span
                    class="text-white hover:font-bold hover:underline cursor-pointer"
                    @click="checkAddr(props.params.network,props.params.data.contract_info.verifyingContract)">{{
                params.data.contract_info.name + params.data.contract_info.version || handleAddr(props.params.data.contract_info.verifyingContract)
                }}</span>
        </a-alert>
        <a-alert type="info" v-if="navigator.language.toLowerCase() === 'zh-CN'"
                 @click="checkAddr(props.params.network,props.params.data.contract_info.verifyingContract)">正在与合约<span
                class="text-white hover:font-bold hover:underline cursor-pointer"
                @click="checkAddr(props.params.network,props.params.data.contract_info.verifyingContract)">{{
                props.params.data.contract_info.name + props.params.data.contract_info.version || handleAddr(props.params.data.contract_info.verifyingContract)
            }}</span>交互
        </a-alert>
        <div v-if="props.params.data.asset_list && !isEmpty(props.params.data.asset_list)" class="mt-2">
            <div class="text-base text-white font-bold mt-2">{{ chrome.i18n.getMessage("sending") }}</div>
            <a-list :bordered="false">
                <a-list-item v-for="(item,index) in props.params.data.asset_list" :key="index">
                    <a-list-item-meta
                            :title="item.name"
                            :description="item.type === 1 ? `#${item.token_id}` : `Total: $${parseFloat(item.price)}`"
                    >
                        <template #avatar>
                            <a-avatar shape="square">
                                <img
                                        alt="avatar"
                                        @error.once="useDefaultImage"
                                        :src="item.image_url"
                                />
                            </a-avatar>
                        </template>
                    </a-list-item-meta>
                    <template #actions>
                        <div class="text-xl font-bold">
                            {{ handleBigNumber(parseFloat(item.amount).toFixed(10)) }}
                        </div>
                    </template>
                </a-list-item>
            </a-list>
        </div>
        <div class="mt-2">
            <div class="text-base text-white font-bold mt-2">{{ chrome.i18n.getMessage("receiving") }}</div>
            <div v-if="props.params.data.receive_list && !isEmpty(props.params.data.receive_list)">
                <a-list :bordered="false">
                    <a-list-item v-for="(item,index) in props.params.data.receive_list" :key="index">
                        <a-list-item-meta
                                :title="item.name"
                                :description="item.type === 1 ? `#${item.token_id}` : `Total: $${parseFloat(item.price)}`"
                        >
                            <template #avatar>
                                <a-avatar shape="square">
                                    <img
                                            alt="avatar"
                                            @error.once="useDefaultImage"
                                            :src="item.image_url"
                                    />
                                </a-avatar>
                            </template>
                        </a-list-item-meta>
                        <template #actions>
                            <div class="text-xl font-bold">{{
                                handleBigNumber(parseFloat(item.amount).toFixed(10))
                                }}
                            </div>
                        </template>
                    </a-list-item>
                </a-list>
            </div>
            <div v-else>
                <div class="flex items-center flex-col">
                    <vue3-lottie :animation-data="emptyJson" :width="60" :loop="false"/>
                    <div>{{ chrome.i18n.getMessage("empty_receive") }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {isEmpty} from "lodash-es";
import emptyJson from "@/assets/lottie/empty.json";
import {Vue3Lottie} from "vue3-lottie";
import {useDefaultImage, handleAddr, checkAddr, handleBigNumber} from "@/view/utils/main";

const chrome = window.chrome
const navigator = window.navigator

const props = defineProps({
    params: {type: Object}
})
</script>

<style scoped>

</style>
