<template>
  <div class="main_app">
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
            <div class="text-gray-700">
              {{ wallet.substring(0, 4) + '...' + wallet.substring(38, 42) }}
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
      <div id="isLogin">
        <div
            @click="jumpToFeedback"
            class="my-4 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 py-4 px-6 text-base text-white font-bold cursor-pointer hover:shadow-lg">
          {{ chrome.i18n.getMessage('popup_feedback') }} ->
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

      <div id="needLogin">
        <div class="my-4 rounded-lg bg-white py-4 px-6 text-base text-black font-bold cursor-pointer hover:shadow-lg"
             @click="login">
          <div class="flex items-center justify-center">
            <div>
              <svg t="1677221211401" class="icon" viewBox="0 0 1086 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="33968" width="25" height="25">
                <path d="M1024 31.030303l-409.6 300.993939L688.872727 155.151515 1024 31.030303z" fill="#E17726"
                      p-id="33969"></path>
                <path
                    d="M83.781818 31.030303l403.39394 304.09697L415.806061 155.151515 83.781818 31.030303zM878.157576 732.315152l-108.606061 164.460606 232.727273 65.163636 65.163636-226.521212-189.284848-3.10303zM40.339394 735.418182L105.50303 961.939394l232.727273-65.163636-108.606061-164.460606-189.284848 3.10303z"
                    fill="#E27625" p-id="33970"></path>
                <path
                    d="M325.818182 449.939394l-65.163637 96.193939 229.624243 9.309091-6.206061-248.242424-158.254545 142.739394zM781.963636 449.939394L620.606061 307.2l-6.206061 251.345455 229.624242-9.309091-62.060606-99.29697zM338.230303 896.775758l139.636364-68.266667-121.018182-93.090909-18.618182 161.357576zM629.915152 828.509091l139.636363 68.266667-18.618182-161.357576-121.018181 93.090909z"
                    fill="#E27625" p-id="33971"></path>
                <path
                    d="M769.551515 896.775758l-139.636363-68.266667 12.412121 89.987879v37.236363l127.224242-58.957575zM338.230303 896.775758l130.327273 62.060606v-37.236364l12.412121-89.987879-142.739394 65.163637z"
                    fill="#D5BFB2" p-id="33972"></path>
                <path
                    d="M468.557576 676.460606l-114.812121-34.133333 80.678787-37.236364 34.133334 71.369697zM636.121212 676.460606l34.133333-71.369697 80.678788 37.236364-114.812121 34.133333z"
                    fill="#233447" p-id="33973"></path>
                <path
                    d="M338.230303 896.775758l18.618182-164.460606-127.224243 3.10303 108.606061 161.357576zM747.830303 732.315152l18.618182 164.460606 108.60606-161.357576-127.224242-3.10303zM847.127273 549.236364l-229.624243 9.309091 21.721212 117.915151 34.133334-71.369697 80.678788 37.236364 93.090909-93.090909zM353.745455 642.327273l80.678787-37.236364 34.133334 71.369697 21.721212-117.915151-229.624243-9.309091 93.09091 93.090909z"
                    fill="#CC6228" p-id="33974"></path>
                <path
                    d="M260.654545 549.236364l96.19394 189.284848-3.10303-93.090909-93.09091-96.193939zM754.036364 642.327273l-3.103031 93.090909 96.19394-189.284849-93.090909 96.19394zM490.278788 558.545455l-21.721212 117.915151 27.927272 139.636364 6.206061-183.078788-12.412121-74.472727zM614.4 558.545455l-12.412121 74.472727 6.20606 183.078788 27.927273-139.636364-21.721212-117.915151z"
                    fill="#E27525" p-id="33975"></path>
                <path
                    d="M636.121212 676.460606l-27.927273 139.636364 18.618182 12.412121 121.018182-93.090909 3.10303-93.090909-114.812121 34.133333zM353.745455 642.327273l3.10303 93.090909 121.018182 93.090909 18.618181-12.412121-27.927272-139.636364-114.812121-34.133333z"
                    fill="#F5841F" p-id="33976"></path>
                <path
                    d="M639.224242 958.836364v-37.236364l-9.30909-9.309091h-155.151516l-9.309091 9.309091v37.236364l-127.224242-62.060606 46.545455 37.236363 89.987878 62.060606h158.254546l93.090909-62.060606 43.442424-37.236363-130.327273 62.060606z"
                    fill="#C0AC9D" p-id="33977"></path>
                <path
                    d="M629.915152 828.509091l-18.618182-12.412121H496.484848l-18.618181 12.412121-12.412122 89.987879 9.309091-9.309091h155.151516l9.30909 9.309091-9.30909-89.987879z"
                    fill="#161616" p-id="33978"></path>
                <path
                    d="M1039.515152 353.745455L1073.648485 186.181818l-52.751515-155.151515-390.981818 291.684849 152.048484 127.224242 214.109091 62.060606 46.545455-55.854545-21.721212-12.412122 34.133333-31.030303-24.824242-18.618182 34.133333-24.824242-24.824242-15.515151zM31.030303 186.181818l34.133333 167.563637-21.721212 15.515151 34.133334 24.824242-24.824243 18.618182 34.133333 31.030303-21.721212 15.515152 46.545455 55.854545 214.109091-62.060606 152.048485-127.224242L83.781818 31.030303 31.030303 186.181818z"
                    fill="#763E1A" p-id="33979"></path>
                <path
                    d="M996.072727 512l-214.109091-62.060606 65.163637 96.193939-96.19394 189.284849 127.224243-3.10303h189.284848l-71.369697-220.315152zM325.818182 449.939394l-214.109091 62.060606-71.369697 220.315152h189.284848l127.224243 3.10303-96.19394-189.284849 65.163637-96.193939zM614.4 558.545455l12.412121-235.830303 62.060606-167.563637h-276.169697l62.060606 167.563637 12.412122 235.830303 6.20606 74.472727v183.078788h114.812121v-183.078788l6.206061-74.472727z"
                    fill="#F5841F" p-id="33980"></path>
              </svg>
            </div>
            <div class="text-base font-bold ml-1">Connect To MetaMask</div>
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
</template>

<script setup>
import {onMounted, ref} from "vue";
import createMetaMaskProvider from "metamask-extension-provider"

const chrome = window.chrome
const showConfirm = ref(false)
const wallet = ref("")
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

const login = () => {
  const provider = createMetaMaskProvider()
  provider.request({
    method: 'eth_requestAccounts',
  }).then(res => {
    console.log(res)
    const account = res[0]
    document.getElementById("needLogin").style.display = "none"
    document.getElementById("isLogin").style.display = "block"
    chrome.storage.sync.set({'wallet': account}, function () {
      // 通知保存完成。
      console.log("完成")
      showConfirm.value = true
    });
  })
}

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

onMounted(async () => {
  chrome.storage.sync.get(["wallet"], function (data) {
    if (data.wallet) {
      document.getElementById("needLogin").style.display = "none"
    } else {
      document.getElementById("isLogin").style.display = "none"
    }
    wallet.value = data.wallet
  });
  // chrome.storage.sync.get(["showLowRiskPopup"], function (data) {
  //    lowRiskTip.value = data.showLowRiskPopup ? data.showLowRiskPopup : chrome.storage.sync.set({"showLowRiskPopup": true})
  // });
})
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
</style>
