<template>
  <div :class="loading ? 'bg-gray-800' : 'bg-gray-800'">
    <div class="gradient" v-if="!loading && !showTimeout"></div>
    <div style="min-height: 100vh;z-index: 10" class="flex items-center justify-center"
         v-if="loading && !showTimeout">
      <div class="flex flex-col items-center">
        <div class="loader">
          <span></span>
        </div>
        <div class="text-lg text-white mt-2 font-bold">{{ chrome.i18n.getMessage("analyzing") }}</div>
      </div>
    </div>
    <div style="min-height: 100vh;z-index: 10" class="flex items-center justify-center" v-if="showTimeout">
      <a-result status="500" :subtitle="chrome.i18n.getMessage('timeout')">
      </a-result>
    </div>
    <div class="h-full text-white" v-if="!loading && !showTimeout" style="min-height: 100vh;">
      <nav
          class="relative flex w-full flex-wrap items-center justify-between bg-transparent py-3 text-neutral-500 shadow hover:text-neutral-700">
        <div class="flex w-full flex-wrap items-center justify-between px-6" style="z-index: 10">
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center">
              <img src="src/assets/logo.png" width="25"/>
              <a
                  class="text-lg font-semibold text-white ml-1"
              >ByteHunter</a
              >
            </div>
            <div class="flex items-center">
              <div class="cursor-pointer" @click="openUrl('https://twitter.com/ByteHunter_team')">
                <img src="/src/assets/twitter.svg" width="25"/>
              </div>
              <div class="cursor-pointer ml-2" @click="openUrl('https://t.me/bytehunter_space')">
                <img src="/src/assets/telegram.svg" width="25"/>
              </div>
              <div class="cursor-pointer ml-2" @click="openUrl('https://discord.gg/Ds8Jxm95G9')">
                <img src="/src/assets/discord-1.svg" width="25"/>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div class="w-full p-4 h-full relative select-none" style="z-index: 10">
        <div class="flex flex-col items-center justify-center" v-if="params.risk_level">
          <div v-if="params.risk_level === 1">
            <Vue3Lottie :animationData="successJson" :height="180" :width="180" :loop="false"/>
          </div>
          <div v-if="params.risk_level === 2">
            <Vue3Lottie :animationData="warningJson" :height="180" :width="180"/>
          </div>
          <div v-if="params.risk_level === 3">
            <Vue3Lottie :animationData="errorJson" :height="180" :width="180"/>
          </div>
          <div v-if="params.risk_level === 4">
            <Vue3Lottie :animationData="unknownJson" :height="180" :width="180" :loop="false"/>
          </div>
          <div class="text-2xl my-2 font-bold relative">
            {{ riskTitle[params.risk_level] }}
            <a-tooltip :content="chrome.i18n.getMessage('feedback')">
              <icon-question-circle-fill class="relative-svg cursor-pointer" size="25"
                                         @click="showFeedback=true"></icon-question-circle-fill>
            </a-tooltip>
          </div>
        </div>
        <div class="flex justify-center items-center">
          <a-tag color="#0DA5AA" v-if="netMap.hasOwnProperty(params.network)">
            <img :src="netMap[params.network].icon" width="16"/>
            <span class="font-bold pl-1">{{ netMap[params.network].name }} Chain</span></a-tag>
          <a-tag color="#165dff" class="mx-2" v-if="![5,6].includes(params.type) && params.method">{{ params.method }}</a-tag>
          <a-tooltip content="gas" v-if="params.gas_fee">
            <a-tag color="#ff5722" class="mt-1">
              <template #icon>
                <img src="/src/assets/gas.svg" width="16"/>
              </template>
              ≈ ${{ params.gas_fee }}
            </a-tag>
          </a-tooltip>
        </div>

        <div class="content">
          <!--                    Alert-->

          <div v-for="(item,index) in params.components" :key="index">
            <tip :data="item.data" v-if="item.module === 'tip'" class="my-1"></tip>
            <operation :data="item.data" v-if="item.module === 'operation'" :network="params.network"
                       class="my-1"></operation>
            <risk-list :data="item.data" v-if="item.module === 'risk_list'" class="my-1"></risk-list>
            <msg :data="item.data" v-if="item.module === 'message'" class="my-1"></msg>
            <describe :data="item.data" v-if="item.module === 'desc'" class="my-1"></describe>
            <contract-info :data="item.data" v-if="item.module === 'contract_info'" class="my-1"
                           :network="params.network"></contract-info>
            <list :data="item.data" v-if="item.module === 'list'" class="my-1"></list>
          </div>

        </div>
      </div>
    </div>
  </div>

  <a-drawer placement="top" :ok-text="chrome.i18n.getMessage('submit')"
            :cancel-text="chrome.i18n.getMessage('cancel')" :visible="showFeedback"
            @cancel="showFeedback=false" unmountOnClose @ok="submitFeedback">
    <template #title>
      {{ chrome.i18n.getMessage('feedback_title') }}
    </template>
    <a-textarea style="height: 100px" :placeholder="chrome.i18n.getMessage('feedback_placeholder')"
                v-model="feedback" auto-size/>
  </a-drawer>

  <div class="btn-group flex items-center justify-evenly p-4 bg-white btn-group-open" style="z-index: 100"
  >
    <div class="button-reject" style="width: 40%;border-radius: 10px;color: #0b0b0b" @click="cancel">
      {{ chrome.i18n.getMessage("reject") }}
    </div>
    <div class="button-confirm" style="width: 40%;border-radius: 10px" @click="confirm"
         v-if="params.risk_level === 1 || params.risk_level === 4">
      {{ chrome.i18n.getMessage("continue") }}
    </div>
    <div class="button-confirm-warn" style="width: 40%;border-radius: 10px" @click="confirm"
         v-if="params.risk_level === 2">
      {{ chrome.i18n.getMessage("continue") }}
    </div>
    <div class="button-confirm" style="width: 40%;border-radius: 10px" @click="confirm" v-if="isEmpty(params)">
      {{ chrome.i18n.getMessage("continue") }}
    </div>
    <a-popconfirm :content="chrome.i18n.getMessage('high_risk_tip')" @ok="confirm" ok-text="confirm"
                  cancel-text="cancel">
      <div class="button-confirm-risk" style="width: 40%;border-radius: 10px"
           v-if="params.risk_level === 3">
        {{ chrome.i18n.getMessage("continue") }}
      </div>
    </a-popconfirm>
  </div>
</template>

<script setup>
import {onMounted, ref, computed, defineAsyncComponent} from "vue"
import {
  IconQuestionCircleFill,
} from '@arco-design/web-vue/es/icon';
import {isEmpty} from "lodash-es"
import axios from "axios"
import {Message} from "@arco-design/web-vue";
import successJson from "/src/assets/lottie/success.json"
import warningJson from "/src/assets/lottie/warning.json"
import errorJson from "/src/assets/lottie/error.json"
import unknownJson from "/src/assets/lottie/unknown.json"
import {Vue3Lottie} from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import {netMap} from "@/view/utils/main";

const Tip = defineAsyncComponent(() => import("./components/tip.vue"))
const Operation = defineAsyncComponent(() => import("./components/operation.vue"))
const RiskList = defineAsyncComponent(() => import("./components/riskList.vue"))
const Msg = defineAsyncComponent(() => import("./components/message.vue"))
const Describe = defineAsyncComponent(() => import("./components/desc.vue"))
const ContractInfo = defineAsyncComponent(() => import("./components/contractInfo.vue"))
const List = defineAsyncComponent(() => import("./components/list.vue"))


const params = ref({})
const loading = ref(true)

const chrome = window.chrome

const timeout = ref();
const showTimeout = ref(false);
const showFeedback = ref(false);
const feedback = ref('');


const riskTitle = Object.freeze({
  1: chrome.i18n.getMessage("lowLevel"),
  2: chrome.i18n.getMessage("midLevel"),
  3: chrome.i18n.getMessage("highLevel"),
  4: chrome.i18n.getMessage("unknownLevel")
})


const lineColor = Object.freeze({
  1: {
    main: "#3fefba",
    shadow: "drop-shadow(0 0 20px #3fefef) drop-shadow(0 0 60px #3fefef)"
  },
  2: {
    main: "#F7BA1E",
    shadow: "drop-shadow(0 0 20px #FADC6D) drop-shadow(0 0 60px #FADC6D)"
  },
  3: {
    main: "#F53F3F",
    shadow: "drop-shadow(0 0 20px #F76560) drop-shadow(0 0 60px #F76560)"
  },
  4: {
    main: "#F2F3F5",
    shadow: "drop-shadow(0 0 20px #F7F8FA) drop-shadow(0 0 60px #F7F8FA)"
  }
})
const currentLineMainColor = computed(() => {
  if (params.value.risk_level) {
    return lineColor[params.value.risk_level].main
  } else {
    return lineColor["1"].main
  }
})
const currentLineShadowColor = computed(() => {
  if (params.value.risk_level) {
    return lineColor[params.value.risk_level].shadow
  } else {
    return lineColor["1"].shadow
  }
})

const confirm = () => {
  chrome.storage.local.get('window_id').then(res => {
    console.log('popup', res)
    chrome.storage.local.set({'confirm': res.window_id.uuid})
  }).catch(err => {
    console.log('popup', err)
  })
  chrome.storage.local.get('window_id').then(res => {
    chrome.storage.local.set({"params": ""})
    chrome.windows.remove(res.window_id.id)
  })
}
const cancel = () => {
  chrome.storage.local.get('window_id').then(res => {
    chrome.storage.local.set({"params": ""})
    console.log(res)
    chrome.storage.local.set({'cancel': res.window_id.uuid})
    chrome.windows.remove(res.window_id.id)
  })
}

const openUrl = (url) => {
  window.open(url)
}

const submitFeedback = async () => {
  if (feedback.value === '') {
    Message.warning(chrome.i18n.getMessage('warning_text'))
    return
  }

  const walletRes = await chrome.storage.sync.get('wallet')
  console.log('storage', walletRes)
  axios.post('https://backend.bytehunter.site/web3/v1/extensionFeedback/createExtensionFeedback', {
    record_id: params.value.record_id,
    address: walletRes.wallet,
    content: feedback.value,
  }).then(() => {
    Message.success(chrome.i18n.getMessage('success_text'))
    showFeedback.value = false;
  })
}

onMounted(() => {
  document.body.setAttribute('arco-theme', 'dark')

  chrome.storage.local.get('params').then(res => {
    if (res.params && res.params !== "") {
      params.value = JSON.parse(res.params).data
      console.log("res", params.value)
      chrome.storage.local.set({"params": ""})
      loading.value = false
    }
  })

  chrome.storage.local.get('detective_website').then(res => {
    if (res.detective_website && res.detective_website !== "") {
      params.value = res.detective_website
      console.log("res-website", params.value)
      chrome.storage.local.set({"detective_website": ""})
      loading.value = false
    }
  })

  chrome.storage.local.get('malicious_extension').then(res => {
    if (res.malicious_extension && res.malicious_extension !== "") {
      params.value = res.malicious_extension
      chrome.storage.local.set({"malicious_extension": ""})
      loading.value = false
    }
  })

  timeout.value && clearTimeout(timeout.value)
  timeout.value = setTimeout(() => {
    showTimeout.value = true;
  }, 10000)
  chrome.storage.local.onChanged.addListener(res => {
    console.log('listen==>', res)
    if (res.type) {
      chrome.storage.local.get('params').then(res => {
        if (!res.params) return;
        params.value = JSON.parse(res.params).data
        console.log("params", params.value)
        chrome.storage.local.set({"params": ""})
        loading.value = false;
      })
    }

    timeout.value && clearTimeout(timeout.value)
  })
})

</script>

<style>
.arco-list-split .arco-list-header, .arco-list-split .arco-list-item:not(:last-child) {
  border-bottom: 1px solid rgba(255, 255, 255, 0) !important;
}
</style>

<style scoped lang="scss">
.relative-svg {
  position: absolute;
  right: -30px;
  top: 5px;
}

.bg-main {
  background-color: #222;
  overflow: hidden;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.gradient {
  --size: 400px;
  --speed: 50s;
  --easing: cubic-bezier(0.8, 0.2, 0.2, 0.8);

  width: var(--size);
  height: var(--size);
  filter: blur(calc(var(--size) / 5));
  background-image: linear-gradient(hsl(158, 82, 57, 85%), hsl(252, 82, 57));
  animation: rotate var(--speed) var(--easing) alternate infinite;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  position: absolute;
  top: 30%;
  z-index: 0;
}

/* This is just to transition when you change the viewport size. */
* {
  transition: all 0.25s ease-out;
}

.action-card {
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

@keyframes slideUp {
  0% {
    bottom: -80px;
    opacity: 0;
  }
  25% {
    bottom: -60px;
    opacity: 0.2;
  }
  50% {
    bottom: -40px;
    opacity: 0.4;
  }
  75% {
    bottom: -20px;
    opacity: 0.8;
  }
  100% {
    bottom: 0;
    opacity: 1;
  }
}


.btn-group-open {
  animation: slideUp 0.5s ease-out;
  bottom: 0;
}


.btn-group {
  position: fixed;
  width: 100%;
  height: 80px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  border-top: solid 1px #f1ecec;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  transition: bottom 0.3s ease-out;

  /* CSS */
  .button-confirm {
    background-color: #165DFF;
    border: 1px solid #165DFF;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, .1) 0 2px 4px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    font-family: "Akzidenz Grotesk BQ Medium", -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 16px;
    font-weight: 400;
    outline: none;
    outline: 0;
    padding: 10px 25px;
    text-align: center;
    transform: translateY(0);
    transition: transform 150ms, box-shadow 150ms;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;

    &:hover {
      box-shadow: rgba(0, 0, 0, .15) 0 3px 9px 0;
      transform: translateY(-2px);
    }

    &-warn {
      @extend .button-confirm;
      background-color: #F77234;
      border: 1px solid #F77234;
    }

    &-risk {
      @extend .button-confirm;
      background-color: #F53F3F;
      border: 1px solid #F53F3F;
    }
  }

  /* CSS */
  .button-reject {
    background-color: #F7F8FA;
    border: 1px solid #F7F8FA;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, .1) 0 2px 4px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    font-family: "Akzidenz Grotesk BQ Medium", -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 16px;
    font-weight: 400;
    outline: none;
    outline: 0;
    padding: 10px 25px;
    text-align: center;
    transform: translateY(0);
    transition: transform 150ms, box-shadow 150ms;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;

    &:hover {
      box-shadow: rgba(0, 0, 0, .15) 0 3px 9px 0;
      transform: translateY(-2px);
    }
  }
}


.bg-main::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 8px;
  background: v-bind(currentLineMainColor);
  border-radius: 8px;
  filter: v-bind(currentLineShadowColor);
  animation: animate_line 2s ease-in-out;
}

@keyframes animate_line {
  0%, 100% {
    top: 0%;
  }

  50% {
    top: 100%;
  }
}


.content {

  padding-bottom: 80px;
  margin-top: 20px;

  .check-background-success {
    width: 35px;
    height: 35px;
    background: #00B42A;
    box-shadow: 0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset,
    0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
    transform: scale(0.84);
    border-radius: 50%;
    animation: animateContainer 0.2s ease-out forwards 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;

    .success {
      width: 65%;
      transform: translateY(0.25rem);
      stroke-dasharray: 80;
      stroke-dashoffset: 80;
      animation: animateCheck 0.35s forwards 1.25s ease-out;
    }
  }

  .check-background-warn {
    width: 35px;
    height: 35px;
    background: #F7BA1E;
    box-shadow: 0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset,
    0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
    transform: scale(0.84);
    border-radius: 50%;
    animation: animateContainer 0.2s ease-out forwards 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;

    .warn {
      width: 65%;
      transform: translateY(0.25rem);
      stroke-dasharray: 80;
      stroke-dashoffset: 80;
      animation: animateCheck 0.35s forwards 1.25s ease-out;
    }
  }

  .check-background-error {
    width: 35px;
    height: 35px;
    background: #F53F3F;
    box-shadow: 0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset,
    0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
    transform: scale(0.84);
    border-radius: 50%;
    animation: animateContainer 0.2s ease-out forwards 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;

    .error {
      width: 65%;
      transform: translateY(0.25rem);
      stroke-dasharray: 80;
      stroke-dashoffset: 80;
      animation: animateCheck 0.35s forwards 1.25s ease-out;
    }
  }

  .check-shadow {
    bottom: calc(-15% - 5px);
    left: 0;
    border-radius: 50%;
    background: radial-gradient(closest-side, rgba(73, 218, 131, 1), transparent);
    animation: animateShadow 0.75s ease-out forwards 0.75s;
  }

  @keyframes animateContainer {
    0% {
      opacity: 0;
      transform: scale(0);
      box-shadow: 0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset,
      0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
    }
    25% {
      opacity: 1;
      transform: scale(0.9);
      box-shadow: 0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset,
      0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
    }
    43.75% {
      transform: scale(1.15);
      box-shadow: 0px 0px 0px 43.334px rgba(255, 255, 255, 0.25) inset,
      0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
    }
    62.5% {
      transform: scale(1);
      box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset,
      0px 0px 0px 21.667px rgba(255, 255, 255, 0.25) inset;
    }
    81.25% {
      box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset,
      0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset;
    }
    100% {
      opacity: 1;
      box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset,
      0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset;
    }
  }

  @keyframes animateCheck {
    from {
      stroke-dashoffset: 80;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes animateShadow {
    0% {
      opacity: 0;
      width: 100%;
      height: 15%;
    }
    25% {
      opacity: 0.25;
    }
    43.75% {
      width: 40%;
      height: 7%;
      opacity: 0.35;
    }
    100% {
      width: 85%;
      height: 15%;
      opacity: 0.25;
    }
  }
}

.atom-spinner, .atom-spinner * {
  box-sizing: border-box;
}

.atom-spinner {
  height: 30px;
  width: 30px;
  overflow: hidden;
}

.atom-spinner .spinner-inner {
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
}

.atom-spinner .spinner-circle {
  display: block;
  position: absolute;
  color: #165DFF;
  font-size: calc(30px * 0.24);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.atom-spinner .spinner-line {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  animation-duration: 1s;
  border-left-width: calc(30px / 25);
  border-top-width: calc(30px / 25);
  border-left-color: #165DFF;
  border-left-style: solid;
  border-top-style: solid;
  border-top-color: transparent;
}

.atom-spinner .spinner-line:nth-child(1) {
  animation: atom-spinner-animation-1 1s linear infinite;
  transform: rotateZ(120deg) rotateX(66deg) rotateZ(0deg);
}

.atom-spinner .spinner-line:nth-child(2) {
  animation: atom-spinner-animation-2 1s linear infinite;
  transform: rotateZ(240deg) rotateX(66deg) rotateZ(0deg);
}

.atom-spinner .spinner-line:nth-child(3) {
  animation: atom-spinner-animation-3 1s linear infinite;
  transform: rotateZ(360deg) rotateX(66deg) rotateZ(0deg);
}

@keyframes atom-spinner-animation-1 {
  100% {
    transform: rotateZ(120deg) rotateX(66deg) rotateZ(360deg);
  }
}

@keyframes atom-spinner-animation-2 {
  100% {
    transform: rotateZ(240deg) rotateX(66deg) rotateZ(360deg);
  }
}

@keyframes atom-spinner-animation-3 {
  100% {
    transform: rotateZ(360deg) rotateX(66deg) rotateZ(360deg);
  }
}


.loader {
  position: relative;
  width: 150px;
  height: 150px;
  background: transparent;
  border-radius: 50%;
  box-shadow: 25px 25px 75px rgba(0, 0, 0, 0.55);
  border: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.loader::before {
  content: '';
  position: absolute;
  inset: 20px;
  background: transparent;
  border: 1px dashed #444;
  border-radius: 50%;
  box-shadow: inset -5px -5px 25px rgba(0, 0, 0, 0.25),
  inset 5px 5px 35px rgba(0, 0, 0, 0.25);
}

.loader::after {
  content: '';
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px dashed #444;
  box-shadow: inset -5px -5px 25px rgba(0, 0, 0, 0.25),
  inset 5px 5px 35px rgba(0, 0, 0, 0.25);
}

.loader span {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 100%;
  background: transparent;
  transform-origin: top left;
  animation: radar81 2s linear infinite;
  border-top: 1px dashed #fff;
}

.loader span::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: seagreen;
  transform-origin: top left;
  transform: rotate(-55deg);
  filter: blur(30px) drop-shadow(20px 20px 20px seagreen);
}

@keyframes radar81 {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}


</style>
