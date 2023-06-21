<template>
    <div>
        <div v-if="props.params.data.type === 0">
            <div>
                <div v-if="props.params.data.logs" class="mt-3">
                    <div>
                        <a-collapse accordion>
                            <a-collapse-item v-for="(item,index) in props.params.data.logs" :key="index"
                                             style="background-color: transparent">
                                <template #header>
                                    <div class="flex items-center">
                                        <div>
                                            <svg t="1677762809426" class="icon" viewBox="0 0 1024 1024"
                                                 version="1.1"
                                                 xmlns="http://www.w3.org/2000/svg" p-id="16764" width="20"
                                                 height="20">
                                                <path
                                                        d="M812.138 1024H211.862c-39.002 0-70.62-31.618-70.62-70.62V141.242c0-39.002 31.618-70.62 70.62-70.62h600.276c39.002 0 70.62 31.618 70.62 70.62V953.38c0 39.002-31.618 70.62-70.62 70.62z"
                                                        fill="#E1C3A0" p-id="16765"></path>
                                                <path
                                                        d="M812.138 123.586H211.862a17.658 17.658 0 0 0-17.656 17.656V953.38a17.658 17.658 0 0 0 17.656 17.656h476.69l141.242-141.242V141.242a17.658 17.658 0 0 0-17.656-17.656z"
                                                        fill="#EFF2FA" p-id="16766"></path>
                                                <path
                                                        d="M617.932 70.62h-52.966v-17.656C564.966 23.714 541.252 0 512 0s-52.966 23.714-52.966 52.966v17.656h-52.966c-19.5 0-35.31 15.808-35.31 35.31v35.31H653.24V105.932c0.002-19.504-15.808-35.312-35.308-35.312z m-105.932 0a17.658 17.658 0 1 1 0.002-35.314A17.658 17.658 0 0 1 512 70.62z"
                                                        fill="#C7CFE2" p-id="16767"></path>
                                                <path
                                                        d="M653.242 158.896H370.758a17.658 17.658 0 0 1 0-35.312H653.24a17.658 17.658 0 0 1 17.656 17.656 17.654 17.654 0 0 1-17.654 17.656z"
                                                        fill="#AFB9D2" p-id="16768"></path>
                                                <path
                                                        d="M388.414 706.206h-105.932a17.658 17.658 0 0 1 0-35.312h105.932a17.658 17.658 0 0 1 0 35.312z"
                                                        fill="#C7CFE2" p-id="16769"></path>
                                                <path
                                                        d="M741.518 706.206H459.034a17.658 17.658 0 0 1 0-35.312h282.482a17.658 17.658 0 0 1 17.656 17.656 17.654 17.654 0 0 1-17.654 17.656zM564.966 812.138h-105.932a17.658 17.658 0 0 1 0-35.312h105.932a17.658 17.658 0 0 1 17.656 17.656 17.66 17.66 0 0 1-17.656 17.656zM600.276 882.758h-141.242a17.658 17.658 0 0 1 0-35.312h141.242a17.656 17.656 0 0 1 0 35.312z"
                                                        fill="#D7DEED" p-id="16770"></path>
                                                <path
                                                        d="M388.414 423.724h-105.932a17.658 17.658 0 0 1 0-35.312h105.932a17.658 17.658 0 0 1 0 35.312zM600.276 494.344h-52.966a17.658 17.658 0 0 1 0-35.312h52.966a17.656 17.656 0 0 1 0 35.312z"
                                                        fill="#C7CFE2" p-id="16771"></path>
                                                <path
                                                        d="M741.518 494.344h-70.62a17.658 17.658 0 0 1 0-35.312h70.62a17.658 17.658 0 0 1 0 35.312zM741.518 423.724H459.034a17.658 17.658 0 0 1 0-35.312h282.482a17.658 17.658 0 0 1 17.656 17.656 17.654 17.654 0 0 1-17.654 17.656z"
                                                        fill="#D7DEED" p-id="16772"></path>
                                                <path
                                                        d="M741.518 317.794h-141.242a17.658 17.658 0 0 1 0-35.312h141.242a17.658 17.658 0 0 1 17.656 17.656 17.66 17.66 0 0 1-17.656 17.656z"
                                                        fill="#C7CFE2" p-id="16773"></path>
                                                <path
                                                        d="M529.656 317.794h-35.31a17.658 17.658 0 0 1 0-35.312h35.31a17.658 17.658 0 0 1 17.656 17.656 17.66 17.66 0 0 1-17.656 17.656z"
                                                        fill="#D7DEED" p-id="16774"></path>
                                                <path
                                                        d="M741.518 247.172h-105.932a17.658 17.658 0 0 1 0-35.312h105.932a17.658 17.658 0 0 1 0 35.312zM459.034 564.966h-176.552a17.658 17.658 0 0 1 0-35.312h176.552a17.658 17.658 0 0 1 0 35.312z"
                                                        fill="#C7CFE2" p-id="16775"></path>
                                                <path
                                                        d="M741.518 564.966H529.656a17.658 17.658 0 0 1 0-35.312h211.862a17.658 17.658 0 0 1 17.656 17.656 17.66 17.66 0 0 1-17.656 17.656zM476.69 494.344h-194.206a17.658 17.658 0 0 1 0-35.312h194.206a17.658 17.658 0 0 1 0 35.312z"
                                                        fill="#D7DEED" p-id="16776"></path>
                                                <path
                                                        d="M564.966 635.586h-141.242a17.658 17.658 0 0 1 0-35.312h141.242a17.658 17.658 0 0 1 0 35.312z"
                                                        fill="#C7CFE2" p-id="16777"></path>
                                                <path
                                                        d="M741.518 635.586h-105.932a17.658 17.658 0 0 1 0-35.312h105.932a17.658 17.658 0 0 1 0 35.312zM353.104 635.586h-70.62a17.658 17.658 0 0 1 0-35.312h70.62a17.658 17.658 0 0 1 0 35.312z"
                                                        fill="#D7DEED" p-id="16778"></path>
                                                <path
                                                        d="M335.448 900.414c-38.94 0-70.62-31.68-70.62-70.62s31.68-70.62 70.62-70.62 70.62 31.68 70.62 70.62-31.682 70.62-70.62 70.62z m0-105.932c-19.474 0-35.31 15.836-35.31 35.31 0 19.474 15.836 35.31 35.31 35.31s35.31-15.836 35.31-35.31c0-19.472-15.836-35.31-35.31-35.31z"
                                                        fill="#B4E1FA" p-id="16779"></path>
                                                <path
                                                        d="M688.552 971.034v-123.586a17.658 17.658 0 0 1 17.656-17.656h123.586l-141.242 141.242z"
                                                        fill="#D7DEED" p-id="16780"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            {{ item.decoded.eventName }}
                                        </div>
                                    </div>
                                </template>
                                <div>
                                    <div v-for="(v,k) in item.decoded.inputs" :key="k"
                                         class="text-left truncate">🔹{{ v.name }} :
                                        <b>{{
                                            v.value
                                            }}</b>
                                    </div>
                                </div>
                            </a-collapse-item>
                        </a-collapse>
                    </div>
                </div>
            </div>
            <div class="mt-2 bg-white rounded-lg p-4">
                <div class="flex items-center">
                    <div class="atom-spinner">
                        <div class="spinner-inner">
                            <div class="spinner-line"></div>
                            <div class="spinner-line"></div>
                            <div class="spinner-line"></div>
                            <div class="spinner-circle">
                                &#9679;
                            </div>
                        </div>
                    </div>
                    <div class="text-black text-base">{{ chrome.i18n.getMessage("aiAnalysis") }}</div>
                    <div class="ml-1">
                        <a-tag type="primary" size="mini">{{
                            chrome.i18n.getMessage("resultReference")
                            }}
                        </a-tag>
                    </div>
                </div>

                <div v-if="AILoading" class="w-full h-full flex items-center justify-center">
                    <div class="dot-spinner mt-2">
                        <div class="dot-spinner__dot"></div>
                        <div class="dot-spinner__dot"></div>
                        <div class="dot-spinner__dot"></div>
                        <div class="dot-spinner__dot"></div>
                        <div class="dot-spinner__dot"></div>
                        <div class="dot-spinner__dot"></div>
                        <div class="dot-spinner__dot"></div>
                        <div class="dot-spinner__dot"></div>
                    </div>
                </div>
                <div class="text-gray-700 break-words mt-2" v-else>
                    <li v-html="handleAIMessage(AIContent)" @click="handleHtmlClickEvent"></li>
                </div>
            </div>
        </div>
        <div v-if="props.params.data.type === 1">
            <a-alert type="info" v-if="navigator.language.toLowerCase() === 'en'">Interacting with the
                contract <span
                        class="text-white hover:font-bold hover:underline cursor-pointer"
                        @click="checkAddr(props.params.network,props.params.data.contract_info.verifyingContract)">{{
                  props.params.data.contract_info.name || handleAddr(props.params.data.contract_info.verifyingContract)
                    }}</span>
            </a-alert>
            <a-alert type="info" v-if="navigator.language.toLowerCase() === 'zh-CN'"
                     @click="checkAddr(props.params.network,props.params.data.contract_info.verifyingContract)">正在与合约<span
                    class="text-white hover:font-bold hover:underline cursor-pointer"
                    @click="checkAddr(props.params.network,props.params.data.contract_info.verifyingContract)">{{
                props.params.data.contract_info.name || handleAddr(props.params.data.contract_info.verifyingContract)
                }}</span>交互
            </a-alert>
            <div v-if="props.params.data.sending && !isEmpty(props.params.data.sending)" class="mt-2">
                <div class="text-base text-white font-bold mt-2">{{
                    chrome.i18n.getMessage("sending")
                    }}
                </div>
                <a-list :bordered="false">
                    <a-list-item v-for="(item,index) in props.params.data.sending" :key="index">
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
                <div class="text-base text-white font-bold mt-2">{{
                    chrome.i18n.getMessage("receiving")
                    }}
                </div>
                <div v-if="props.params.data.receiving && !isEmpty(props.params.data.receiving)">
                    <a-list :bordered="false">
                        <a-list-item v-for="(item,index) in props.params.data.receiving" :key="index">
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
                <div v-else>
                    <div class="flex items-center flex-col">
                        <vue3-lottie :animation-data="emptyJson" :width="60" :loop="false"/>
                        <div>{{ chrome.i18n.getMessage("empty_receive") }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {isEmpty} from "lodash-es";
import emptyJson from "@/assets/lottie/empty.json";
import {Vue3Lottie} from "vue3-lottie";
import {checkAddr, useDefaultImage, handleAddr, handleBigNumber} from "@/view/utils/main";
import axios from "axios";
import {ref, onMounted, watch} from "vue";

const chrome = window.chrome
const navigator = window.navigator

const props = defineProps({
    params: {
        type: Object
    }
})

const AIContent = ref("")
const AILoading = ref(false)
const walletAddr = ref("")

watch(() => props.params, (val) => {
    val.data.logs = val.type === 0 && val.data.logs.filter(v => v.decoded)
    if (val.data.type === 0) {
        getAIContent(JSON.stringify(val.data.logs))
    }
})


const getAIContent = (logs) => {
    AILoading.value = true
    axios.post("https://backend.bytehunter.site/web3/v1/common/analysisLogs", {
        content: logs,
        language: navigator.language.toLowerCase() === 'en' ? 1 : 0
    }).then(res => {
        console.log(res)
        AIContent.value = res.data.choices[0].message.content
    }).finally(() => {
        AILoading.value = false
    })
}

const handleAIMessage = (content) => {
    if (!content) {
        return
    }
    const addrList = content.match(/(\b0x[a-f0-9]{40}\b)/g)
    if (addrList && addrList.length !== 0) {
        addrList.forEach(addr => {
            content = content.replace(addr, `<span class="text-blue-600 hover:text-blur-700 hover:underline" onclick="checkAddr(${addr})" data-value="${addr}">${addr.substring(0, 5) + "..." + addr.substring(38, 42)}${addr === walletAddr.value ? '[' + window.chrome.i18n.getMessage("you") + ']' : ''}</span>`)
        })
        return content
    }
    return content
}

const handleHtmlClickEvent = (e) => {
    const addr = e.target.attributes[5].nodeValue
    checkAddr(addr)
}


onMounted(() => {
    chrome.storage.sync.get(["wallet"], function (data) {
        walletAddr.value = data.wallet
    });
})
</script>

<style scoped lang="scss">

.dot-spinner {
    --uib-size: 2.8rem;
    --uib-speed: .9s;
    --uib-color: #183153;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: var(--uib-size);
    width: var(--uib-size);
}

.dot-spinner__dot {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    width: 100%;
}

.dot-spinner__dot::before {
    content: '';
    height: 20%;
    width: 20%;
    border-radius: 50%;
    background-color: var(--uib-color);
    transform: scale(0);
    opacity: 0.5;
    animation: pulse0112 calc(var(--uib-speed) * 1.111) ease-in-out infinite;
    box-shadow: 0 0 20px rgba(18, 31, 53, 0.3);
}

.dot-spinner__dot:nth-child(2) {
    transform: rotate(45deg);
}

.dot-spinner__dot:nth-child(2)::before {
    animation-delay: calc(var(--uib-speed) * -0.875);
}

.dot-spinner__dot:nth-child(3) {
    transform: rotate(90deg);
}

.dot-spinner__dot:nth-child(3)::before {
    animation-delay: calc(var(--uib-speed) * -0.75);
}

.dot-spinner__dot:nth-child(4) {
    transform: rotate(135deg);
}

.dot-spinner__dot:nth-child(4)::before {
    animation-delay: calc(var(--uib-speed) * -0.625);
}

.dot-spinner__dot:nth-child(5) {
    transform: rotate(180deg);
}

.dot-spinner__dot:nth-child(5)::before {
    animation-delay: calc(var(--uib-speed) * -0.5);
}

.dot-spinner__dot:nth-child(6) {
    transform: rotate(225deg);
}

.dot-spinner__dot:nth-child(6)::before {
    animation-delay: calc(var(--uib-speed) * -0.375);
}

.dot-spinner__dot:nth-child(7) {
    transform: rotate(270deg);
}

.dot-spinner__dot:nth-child(7)::before {
    animation-delay: calc(var(--uib-speed) * -0.25);
}

.dot-spinner__dot:nth-child(8) {
    transform: rotate(315deg);
}

.dot-spinner__dot:nth-child(8)::before {
    animation-delay: calc(var(--uib-speed) * -0.125);
}

@keyframes pulse0112 {
    0%,
    100% {
        transform: scale(0);
        opacity: 0.5;
    }

    50% {
        transform: scale(1);
        opacity: 1;
    }
}
</style>
