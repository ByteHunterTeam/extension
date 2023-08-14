<template>

  <div class="main_app">
    <!--  AI页面-->
    <div class="flex-1 p:2 sm:p-6 justify-between flex flex-col" id="showAI">
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
          <button type="button" class="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none" @click="hideAI">
            <svg t="1690163760291" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16917" width="20" height="20"><path d="M900.4 424.87c19.47 0 37.03-11.73 44.49-29.73 7.46-17.98 3.33-38.7-10.43-52.48L713.97 122.19c-7.3-7.3-19.12-7.3-26.42 0l-41.69 41.69c-7.3 7.3-7.3 19.13 0 26.42l138.28 138.27H86.32c-10.19 0-18.46 8.26-18.46 18.46v59.39c0 10.19 8.26 18.46 18.46 18.46H900.4zM937.65 598.72H123.8c-19.47 0-37.03 11.73-44.49 29.73-7.46 17.98-3.33 38.7 10.43 52.48l220.49 220.48c7.3 7.3 19.12 7.3 26.42 0l41.69-41.69c7.3-7.3 7.3-19.13 0-26.42L240.06 695.02h697.59c10.32 0 18.68-8.37 18.68-18.68v-58.93c0-10.32-8.36-18.69-18.68-18.69z" p-id="16918" fill="#515151"></path></svg>
          </button>
        </div>
      </div>
      <div id="messages" class="flex flex-col space-y-4 p-3 scrolling-touch overflow-y-auto">
        <div class="flex items-end">
          <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            <div><span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-100 text-gray-600">{{chrome.i18n.getMessage("ai_tips")}}</span></div>
          </div>
          <img src="/src/assets/logo.png" alt="My profile" class="w-6 h-6 rounded-full order-1">
        </div>
        <div v-for="(v, k) in AIChatList" :key="k" class="chatMessage">
          <div v-if="v.role === 'AI'" class="flex items-end">
            <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
              <a-spin v-if="v.loading" dot />
              <div v-else class="flex flex-col max-w-xs break-all items-end px-4 py-2 rounded-lg rounded-bl-none bg-gray-100 text-gray-600">
                <span :style="v.msgStyle">{{ v.msg }}</span>
                <a-tooltip :content="chrome.i18n.getMessage('regenerate')">
                  <a-button v-if="!isGenerating && AIChatList.length !== 0 && k === AIChatList.length - 1" type="text" @click="regenerate">
                    <svg
                        viewBox="0 0 16 16"
                        class="bi bi-arrow-repeat"
                        fill="currentColor"
                        height="16"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                          d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"
                      ></path>
                      <path
                          d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                          fill-rule="evenodd"
                      ></path>
                    </svg>
                  </a-button>
                </a-tooltip>
              </div>
            </div>
            <img src="/src/assets/logo.png" alt="My profile" class="w-6 h-6 rounded-full order-1">
          </div>
          <div v-if="v.role === 'user'" class="flex items-end justify-end">
            <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
              <span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">{{ v.msg }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div class="relative flex items-center">
          <input v-model="chatInput" type="text" @keydown.enter="handleEnter" :placeholder="chrome.i18n.getMessage('ai_placeholder')" class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 bg-gray-200 rounded-l-md pl-2 py-3">
          <div class="items-center">
            <button
                v-if="isGenerating"
                class="unsend-button inline-flex items-center justify-center rounded-r-md px-4 py-2 focus:outline-none"
                :disabled="last(AIChatList).msg === ''"
                @click="stopAI"
            >
              <svg t="1690184524129" fill="currentColor" class="h-6 w-6 transform rotate-90" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16779" width="200" height="200"><path d="M512 149.333333c200.298667 0 362.666667 162.368 362.666667 362.666667s-162.368 362.666667-362.666667 362.666667S149.333333 712.298667 149.333333 512 311.701333 149.333333 512 149.333333z m53.333333 256h-106.666666a53.333333 53.333333 0 0 0-53.333334 53.333334v106.666666a53.333333 53.333333 0 0 0 53.333334 53.333334h106.666666a53.333333 53.333333 0 0 0 53.333334-53.333334v-106.666666a53.333333 53.333333 0 0 0-53.333334-53.333334z" p-id="16780" fill="#ffffff"></path></svg>            </button>
            <button v-else @click="sendMsgToAI(chatInput)" type="button" class="inline-flex items-center justify-center rounded-r-md px-4 py-2 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6 transform rotate-90">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

<!--    主页面-->
    <div id="showMain">
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
            <div class="flex items-center cursor-pointer" @click="login">
              <svg t="1677400387475" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                   p-id="15858" width="20" height="20">
                <path
                    d="M0 0m365.714286 0l292.571428 0q365.714286 0 365.714286 365.714286l0 292.571428q0 365.714286-365.714286 365.714286l-292.571428 0q-365.714286 0-365.714286-365.714286l0-292.571428q0-365.714286 365.714286-365.714286Z"
                    fill="#6386FA" opacity=".1" p-id="15859"></path>
                <path
                    d="M219.428571 274.285714m73.142858 0l438.857142 0q73.142857 0 73.142858 73.142857l0 329.142858q0 73.142857-73.142858 73.142857l-438.857142 0q-73.142857 0-73.142858-73.142857l0-329.142858q0-73.142857 73.142858-73.142857Z"
                    fill="#6386FA" p-id="15860"></path>
                <path
                    d="M493.714286 420.571429h237.714285v182.857142h-237.714285a91.428571 91.428571 0 0 1-91.428572-91.428571 91.428571 91.428571 0 0 1 91.428572-91.428571z"
                    fill="#FFFFFF" p-id="15861"></path>
                <path
                    d="M493.714286 512m-54.857143 0a54.857143 54.857143 0 1 0 109.714286 0 54.857143 54.857143 0 1 0-109.714286 0Z"
                    fill="#6386FA" p-id="15862"></path>
              </svg>
              <div class="text-gray-700" id="isLogin">
                {{ wallet.substring(0, 4) + '...' + wallet.substring(38, 42) }}
              </div>
              <div class="text-gray-700" id="needLogin">
                Connect To Wallet
              </div>
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
              @click="showAIFunc"
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
                href="https://bytehunter.xyz"
            >ByteHunter</a
            >
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import {nextTick, onMounted, onUnmounted, reactive, ref} from "vue";
import {Vue3Lottie} from "vue3-lottie";
import AIJson from "/src/assets/lottie/AI.json"
import {isEmpty} from "lodash-es";
import {findLast, last} from "lodash";
import { EventSourcePolyfill } from 'event-source-polyfill';

const chrome = window.chrome
// const showConfirm = ref(false)
const wallet = ref("")
// const lowRiskTip = ref(true)
const AIChatList = reactive([]);
const isGenerating = ref(false);
const chatInput = ref('');
let eventSource = reactive({});
let lang = chrome.i18n.getUILanguage()
const chatId = ref('')

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

const login = () => {
  if (lang === 'zh-CN') {
    lang = 'zh'
  }
  chrome.tabs.create({
    url: `https://console.bytehunter.xyz/#/extension_login?lang=${lang}`,
  })
}

const jumpToDoc = () => {
  window.open('https://doc.bytehunter.xyz/docs/guide/extension.html')
}
// const jumpToFeedback = () => {
//   window.open('https://console.bytehunter.xyz/#/feedback')
// }

const jumpToQuickStart = () => {
  window.open('https://console.bytehunter.xyz/#/quick_start')
}

const sendMsgToAI = (msg) => {
  if (isEmpty(msg) || isGenerating.value) {
    return;
  }

  isGenerating.value = true;

  AIChatList.push({
    role: 'user',
    msg: msg,
  });

  scrollChat();

  eventSource = new EventSourcePolyfill(`https://backend.bytehunter.site/web3/v1/AI/pluginQaChat?content=${msg}&chat_id=${chatId.value}`, {
    headers: {
      Lang: lang === 'zh-CN' ? 'zh' : 'en',
    },
  });

  /*
   * open：订阅成功（和后端连接成功）
   */
  eventSource.addEventListener('open', function () {
    // console.log('open successfully');
    chatInput.value = '';
    AIChatList.push({
      role: 'AI',
      msg: '',
      loading: true,
    });
    scrollChat();
  });

  /*
   * message：后端返回信息，格式可以和后端协商
   */
  eventSource.addEventListener('message', function (e) {
    // console.log(e.data);
    if (e.data.split('_')[0] === 'dddone') {
      eventSource.close();
      chatId.value = e.data.split('_')[1]
      isGenerating.value = false;
      return;
    }
    const obj = last(AIChatList);
    obj.loading && (obj.loading = false);
    obj.msg += JSON.parse(e.data).content.replace(/\\n/g, '\n');
    obj.type = JSON.parse(e.data).type;
    // obj.msg = obj.msg.trim();
    obj.msgStyle = {
      whiteSpace: 'pre-wrap',
    };
    scrollChat();
    // console.log(AIChatList);
  });

  /*
   * error：错误（可能是断开，可能是后端返回的信息）
   */
  eventSource.addEventListener('error', function (err) {
    console.log(err);
    const obj = last(AIChatList);
    obj.loading && (obj.loading = false);
    // obj.msg = t('chat_fail');
    obj.type = '0';
    isGenerating.value = false;
    eventSource.close();
  });
};
const scrollChat = () => {
  nextTick(() => {
    const container = document.getElementById('messages');
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  });
};
const handleEnter = (event) => {
  if (!event.isComposing) {
    sendMsgToAI(chatInput.value);
  }
};
const stopAI = () => {
  const obj = last(AIChatList);
  obj.loading && (obj.loading = false);
  if (isEmpty(obj.msg)) {
    AIChatList.pop();
  }
  isGenerating.value = false;
  eventSource.close();
};
const regenerate = () => {
  const obj = findLast(AIChatList, { role: 'user' });
  sendMsgToAI(obj.msg);
};
const resetChat = () => {
  AIChatList.length = 0;
  isGenerating.value = false;
  eventSource.close();
};
const showAIFunc = () => {
  document.getElementById('showMain').style.display = 'none'
  document.getElementById('showAI').style.display = 'flex'
  scrollChat();
};
const hideAI = () => {
  document.getElementById('showAI').style.display = 'none';
  document.getElementById('showMain').style.display = ''
  chrome.storage.sync.get(["wallet"], function (data) {
    if (data.wallet) {
      document.getElementById('needLogin').style.display = 'none'
    } else {
      document.getElementById('isLogin').style.display = 'none'
    }
    wallet.value = data.wallet
  });
};

onMounted(async () => {
  document.getElementById('showAI').style.display = 'none'
  chrome.storage.sync.get(["wallet"], function (data) {
    if (data.wallet) {
      document.getElementById('needLogin').style.display = 'none'
    } else {
      document.getElementById('isLogin').style.display = 'none'
    }
    wallet.value = data.wallet
  });
})

onUnmounted(() => {
  resetChat();
})


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

.unsend-button {
  font-family: inherit;
  background: #d9d9d9;
  color: black;
  span {
    display: block;
    //margin-left: 0.3em;
    transition: all 0.3s ease-in-out;
  }
  svg {
    display: block;
    transform-origin: center center;
    transition: transform 0.3s ease-in-out;
  }
}
.unsend-button:hover {
  background: #bfbfbf;
}
</style>
<style scoped lang="scss">
/*--------------------
Mixins
--------------------*/
@mixin center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@mixin ball {
  @include center;
  content: '';
  display: block;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity));
  z-index: 2;
  margin-top: 4px;
  animation: ball 0.45s cubic-bezier(0, 0, 0.15, 1) alternate infinite;
}

/*--------------------
Messages
--------------------*/

.chat-message {
  margin-left: 10vw;
  margin-right: 10vw;

  @media (max-width: 991px) {
    margin-right: 2vw;
  }
}
.messages {
  flex: 1 1 auto;
  color: rgba(255, 255, 255, 0.5);
  //overflow: hidden;
  position: relative;
  width: 35vw;

  @media (max-width: 991px) {
    width: auto;
  }

  & .messages-content {
    position: absolute;
    top: 0;
    left: 0;
    height: 101%;
    width: 100%;
  }

  .message {
    clear: both;
    float: left;
    padding: 12px;
    border-radius: 10px 10px 10px 0;
    background-color: white;
    margin: 8px 0 8px 35px;
    position: relative;
    //text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);

    @media (max-width: 991px) {
      margin: 0;
    }

    .timestamp {
      position: absolute;
      bottom: -15px;
      color: rgba(255, 255, 255, 0.3);
    }

    &::before {
      content: '';
      position: absolute;
      bottom: -6px;
      border-top: 6px solid white;
      left: 0;
      border-right: 7px solid transparent;
    }

    .avatar {
      position: absolute;
      z-index: 1;
      bottom: -20px;
      left: -38px;
      border-radius: 30px;
      width: 35px;
      height: 35px;
      margin: 0;
      padding: 0;
      border: 2px solid rgba(255, 255, 255, 0.24);

      img {
        width: 100%;
        height: auto;
      }
    }

    &.message-personal {
      float: right;
      color: #fff;
      text-align: right;
      //background: white;
      --tw-bg-opacity: 1;
      background-color: rgb(37 99 235 / var(--tw-bg-opacity));
      border-radius: 10px 10px 0 10px;

      &::before {
        left: auto;
        right: 0;
        border-right: none;
        border-left: 5px solid transparent;
        --tw-bg-opacity: 1;
        border-top: 4px solid rgb(37 99 235 / var(--tw-bg-opacity));
        bottom: -4px;
      }
    }

    &:last-child {
      margin-bottom: 30px;
    }

    &.new {
      transform: scale(0);
      transform-origin: 0 0;
      animation: bounce 500ms linear both;
    }

    &.loading {
      &::before {
        @include ball;
        border: none;
        animation-delay: 0.15s;
      }

      & span {
        display: block;
        font-size: 0;
        width: 20px;
        height: 10px;
        position: relative;

        &::before {
          @include ball;
          margin-left: -7px;
        }

        &::after {
          @include ball;
          margin-left: 7px;
          animation-delay: 0.3s;
        }
      }
    }
  }
}

/*--------------------
Bounce
--------------------*/
@keyframes bounce {
  0% {
    transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  4.7% {
    transform: matrix3d(0.45, 0, 0, 0, 0, 0.45, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  9.41% {
    transform: matrix3d(0.883, 0, 0, 0, 0, 0.883, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  14.11% {
    transform: matrix3d(1.141, 0, 0, 0, 0, 1.141, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  18.72% {
    transform: matrix3d(1.212, 0, 0, 0, 0, 1.212, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  24.32% {
    transform: matrix3d(1.151, 0, 0, 0, 0, 1.151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  29.93% {
    transform: matrix3d(1.048, 0, 0, 0, 0, 1.048, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  35.54% {
    transform: matrix3d(0.979, 0, 0, 0, 0, 0.979, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  41.04% {
    transform: matrix3d(0.961, 0, 0, 0, 0, 0.961, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  52.15% {
    transform: matrix3d(0.991, 0, 0, 0, 0, 0.991, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  63.26% {
    transform: matrix3d(1.007, 0, 0, 0, 0, 1.007, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  85.49% {
    transform: matrix3d(0.999, 0, 0, 0, 0, 0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  100% {
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
}

@keyframes ball {
  from {
    transform: translateY(0) scaleY(0.8);
  }
  to {
    transform: translateY(-10px);
  }
}
</style>
