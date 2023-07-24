<template>

  <div class="main_app">
    <!--  AI页面-->
    <div class="flex-1 p:2 sm:p-6 justify-between flex flex-col" v-if="showAI">
      <div class="flex sm:items-center justify-between py-3 border-b-2 border-gray-200 p-2">
        <div class="relative flex items-center space-x-4">
          <div class="relative">
            <img src="/src/assets/logo.png" alt="" class="w-10 sm:w-16 h-10 sm:h-16 rounded-full">
          </div>
          <div class="flex flex-col leading-tight">
            <div class="text-lg mt-1 flex items-center">
              <span class="text-gray-700 mr-3">ByteHunter</span>
            </div>
            <span class="text-base text-gray-600">{{chrome.i18n.getMessage("ai_title")}}</span>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <button type="button" class="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none" @click="showAI = false">
            <svg t="1690163760291" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16917" width="20" height="20"><path d="M900.4 424.87c19.47 0 37.03-11.73 44.49-29.73 7.46-17.98 3.33-38.7-10.43-52.48L713.97 122.19c-7.3-7.3-19.12-7.3-26.42 0l-41.69 41.69c-7.3 7.3-7.3 19.13 0 26.42l138.28 138.27H86.32c-10.19 0-18.46 8.26-18.46 18.46v59.39c0 10.19 8.26 18.46 18.46 18.46H900.4zM937.65 598.72H123.8c-19.47 0-37.03 11.73-44.49 29.73-7.46 17.98-3.33 38.7 10.43 52.48l220.49 220.48c7.3 7.3 19.12 7.3 26.42 0l41.69-41.69c7.3-7.3 7.3-19.13 0-26.42L240.06 695.02h697.59c10.32 0 18.68-8.37 18.68-18.68v-58.93c0-10.32-8.36-18.69-18.68-18.69z" p-id="16918" fill="#515151"></path></svg>
          </button>
        </div>
      </div>
      <div id="messages" class="flex flex-col space-y-4 p-3 scrolling-touch overflow-y-auto">
        <div class="chat-message">
          <div class="flex items-end">
            <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
              <div><span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-100 text-gray-600">{{chrome.i18n.getMessage("ai_tips")}}</span></div>
            </div>
            <img src="/src/assets/logo.png" alt="My profile" class="w-6 h-6 rounded-full order-1">
          </div>
        </div>
        <div class="chat-message">
          <div class="flex items-end justify-end">
            <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
              <div><span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">私钥泄漏怎么办</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div class="relative flex items-center">
          <input type="text" :placeholder="chrome.i18n.getMessage('ai_placeholder')" class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 bg-gray-200 rounded-l-md pl-2 py-3">
          <div class="items-center">
            <button type="button" class="inline-flex items-center justify-center rounded-r-md px-4 py-2 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6 transform rotate-90">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

<!--    主页面-->
    <div v-else>
      <nav
          class="relative flex w-full flex-wrap items-center justify-between bg-white py-3 text-neutral-500 shadow hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600">
        <div class="flex w-full flex-wrap items-center justify-between px-6">
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center">
              <img src="src/assets/logo.png" width="20"/>
              <a
                  class="text-lg font-semibold text-neutral-800 dark:text-neutral-200 ml-1"
              >ByteHunter</a
              >
            </div>
            <div class="flex items-center">

            </div>
          </div>
        </div>
      </nav>
      <div class="p-4 bg-main">
        <div class="flex items-center justify-between">
          <div class="text-xl font-bold">🎉{{ chrome.i18n.getMessage("welcome") }}</div>
          <button class="btn-share">
  <span class="btn-text">Media</span
  ><span class="btn-icon">
    <svg
        t="1580465783605"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="9773"
        width="18"
        height="18"
    >
      <path
          d="M767.99994 585.142857q75.995429 0 129.462857 53.394286t53.394286 129.462857-53.394286 129.462857-129.462857 53.394286-129.462857-53.394286-53.394286-129.462857q0-6.875429 1.170286-19.456l-205.677714-102.838857q-52.589714 49.152-124.562286 49.152-75.995429 0-129.462857-53.394286t-53.394286-129.462857 53.394286-129.462857 129.462857-53.394286q71.972571 0 124.562286 49.152l205.677714-102.838857q-1.170286-12.580571-1.170286-19.456 0-75.995429 53.394286-129.462857t129.462857-53.394286 129.462857 53.394286 53.394286 129.462857-53.394286 129.462857-129.462857 53.394286q-71.972571 0-124.562286-49.152l-205.677714 102.838857q1.170286 12.580571 1.170286 19.456t-1.170286 19.456l205.677714 102.838857q52.589714-49.152 124.562286-49.152z"
          p-id="9774"
          fill="#ffffff"
      ></path>
    </svg>
  </span>
            <ul class="social-icons">
              <li>
                <a href="https://twitter.com/ByteHunter_team" target="_blank"
                >
                  <img src="src/assets/twitter.svg" width="25"/>
                </a>
              </li>
              <li>
                <a href="https://t.me/bytehunter_space" target="_blank"
                >
                  <img src="src/assets/telegram.svg" width="25"/>
                </a>
              </li>
              <li>
                <a href="https://discord.gg/Ds8Jxm95G9" target="_blank"
                >
                  <img src="src/assets/discord.svg" width="25"/>
                </a>
              </li>
            </ul>
          </button>
        </div>
        <div>
          <div
              @click="showAI = true"
              class="my-4 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 p-2 text-base text-white font-bold cursor-pointer hover:shadow-lg flex items-center">
            <div style="width: 50px;height: 50px">
              <vue3-lottie :animation-data="AIJson"/>
            </div>
            <div class="ml-2">
              {{ chrome.i18n.getMessage('popup_ai') }} ->
            </div>
          </div>
          <div class="flex justify-center mt-4">
            <div
                @click="jumpToQuickStart"
                class="block max-w-sm rounded-lg bg-white p-4 shadow dark:bg-neutral-700 cursor-pointer hover:shadow-lg">
              <h5
                  class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                ⚡️{{ chrome.i18n.getMessage("quickStartTitle") }}
              </h5>
              <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                {{ chrome.i18n.getMessage("quickStartDesc") }}
              </p>
            </div>
          </div>
          <div class="flex justify-center mt-4">
            <div
                @click="jumpToDoc"
                class="block max-w-sm rounded-lg bg-white p-4 shadow dark:bg-neutral-700 cursor-pointer hover:shadow-lg">
              <h5
                  class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                📋{{ chrome.i18n.getMessage("dashboardTitle") }}
              </h5>
              <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                {{ chrome.i18n.getMessage("dashboardDesc") }}
              </p>
            </div>
          </div>
          <div class="flex items-center">
            <div class="text-xl font-bold mt-4 mb-2">📌{{ chrome.i18n.getMessage('funcTitle') }}</div>
          </div>
          <div v-for="(item,index) in funcList" :key="index">
            <a-list :border="false">
              <a-list-item>
                <div>
                  <div class="text-base font-bold">{{ item.title }}</div>
                  <div class="text-gray-700">「{{ item.tag }}」</div>
                </div>
              </a-list-item>
            </a-list>
          </div>

          <div class="mt-2">
            <div class="flex items-center">
              <div class="text-xl font-bold mt-4 mb-2">🔰{{ chrome.i18n.getMessage("mainTip") }}</div>
            </div>
          </div>
        </div>


        <footer
            class="bg-transparent text-center lg:text-left">
          <div class="p-4 text-center text-neutral-700 dark:text-neutral-200">
            © 2023 Copyright:
            <a
                class="text-neutral-800 dark:text-neutral-400"
                href="https://bytehunter.site"
            >ByteHunter</a
            >
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {Vue3Lottie} from "vue3-lottie";
import AIJson from "/src/assets/lottie/AI.json"

const chrome = window.chrome
const showConfirm = ref(false)
const wallet = ref("")
const showAI = ref(false);
// const lowRiskTip = ref(true)

const funcList = Object.freeze([
  {
    title: chrome.i18n.getMessage('func1'),
    tag: chrome.i18n.getMessage('func1Tag')
  },
  {
    title: chrome.i18n.getMessage('func2'),
    tag: chrome.i18n.getMessage('func2Tag')
  },
  {
    title: chrome.i18n.getMessage('func3'),
    tag: chrome.i18n.getMessage('func3tag')
  },
  {
    title: chrome.i18n.getMessage('func4'),
    tag: chrome.i18n.getMessage('func4Tag')
  },
  {
    title: chrome.i18n.getMessage('func5'),
    tag: chrome.i18n.getMessage('func5Tag')
  },
  {
    title: chrome.i18n.getMessage('func6'),
    tag: chrome.i18n.getMessage('func6Tag')
  }
])

// const login = () => {
//   const provider = createMetaMaskProvider()
//   provider.request({
//     method: 'eth_requestAccounts',
//   }).then(res => {
//     console.log(res)
//     const account = res[0]
//     document.getElementById("needLogin").style.display = "none"
//     document.getElementById("isLogin").style.display = "block"
//     chrome.storage.sync.set({'wallet': account}, function () {
//       // 通知保存完成。
//       console.log("完成")
//       showConfirm.value = true
//     });
//   })
// }

const jumpToDoc = () => {
  window.open('https://doc.bytehunter.xyz/docs/guide/extension.html')
}
const jumpToFeedback = () => {
  window.open('https://console.bytehunter.site/#/feedback')
}

const jumpToQuickStart = () => {
  window.open('https://console.bytehunter.site/#/quick_start')
}

// const changeLowRiskTip = (e) => {
//   chrome.storage.sync.set({"showLowRiskPopup": e})
// }
</script>

<style lang="scss">
.main_app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 400px;
  margin: 0;
}

.bg-main {
  background: radial-gradient(50% 142.58% at 50% 50%, #fff 0%, #e6eaf2 80.21%);
}

.btn-share {
  --btn-color: #275efe;
  position: relative;
  padding: 12px 24px;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1;
  color: white;
  background: none;
  border: none;
  outline: none;
  overflow: hidden;
  cursor: pointer;
  filter: drop-shadow(0 2px 8px rgba(#275efe, 0.32));
  transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1); //ease-out-cubic

  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background: var(--btn-color);
    border-radius: 24px;
    transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  .btn-text,
  .btn-icon {
    display: inline-flex;
    vertical-align: middle;
    transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  .btn-text {
    transition-delay: 0.05s;
  }

  .btn-icon {
    margin-left: 8px;
    transition-delay: 0.1s;
  }

  .social-icons {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    display: flex;
    margin: 0;
    padding: 0;
    list-style-type: none;
    transform: translateY(-50%);

    li {
      flex: 1;

      a {
        display: inline-flex;
        vertical-align: middle;
        transform: translateY(55px);
        transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);

        &:hover {
          opacity: 0.5;
        }
      }
    }
  }

  &:hover {
    border-radius: 24px;
    &::before {
      transform: scale(1.2);
    }

    .btn-text,
    .btn-icon {
      transform: translateY(-55px);
    }

    .social-icons li {
      a {
        transform: translateY(0);
      }

      @for $i from 1 through 3 {
        &:nth-child(#{$i}) a {
          transition-delay: 0.1s + 0.05s * $i;
        }
      }
    }
  }
}

.scrollbar-w-2::-webkit-scrollbar {
  width: 0.25rem;
  height: 0.25rem;
}

.scrollbar-track-blue-lighter::-webkit-scrollbar-track {
  --bg-opacity: 1;
  background-color: #f7fafc;
  background-color: rgba(247, 250, 252, var(--bg-opacity));
}

.scrollbar-thumb-blue::-webkit-scrollbar-thumb {
  --bg-opacity: 1;
  background-color: #edf2f7;
  background-color: rgba(237, 242, 247, var(--bg-opacity));
}

.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
  border-radius: 0.25rem;
}

#messages {
  height: 400px;
}
</style>
