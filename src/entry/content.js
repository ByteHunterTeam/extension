// 注入inject脚本
import Browser from 'webextension-polyfill';

const addScript = (url) => {
    const container = document.head || document.documentElement;
    const scriptTag = document.createElement('script');
    scriptTag.setAttribute('async', 'false');
    scriptTag.setAttribute('src', Browser.runtime.getURL(url));
    container.appendChild(scriptTag);
    scriptTag.onload = () => scriptTag.remove();
};

addScript('inject.js');

// 监听来自inject的消息
window.addEventListener('ByteHunter-Message', (event) => {
    // console.log('popup监听', event.detail.type)
    if (event.detail.type === 0) {
        chrome.runtime.sendMessage({uuid: event.detail.uuid, type: 'popup'})
    }
    if (event.detail.type === 1) {
        let chainId = sessionStorage.getItem('network')
        chainId = parseInt(chainId, 16)
        chrome.runtime.sendMessage({uuid: event.detail.uuid, type: 'params', params: event.detail.params, chainId: chainId})
    }

}, false)

window.addEventListener('message', evt => {
    if (evt.data.from === 'ByteHunter') {
        chrome.runtime.sendMessage({'wallet': evt.data.message, 'type': 'login'})
    }
})

chrome.storage.local.onChanged.addListener(res => {
    if (res.confirm) {
        console.log("确认", res)
        let event = new CustomEvent(res.confirm.newValue, {detail: {confirm: 1, cancel: 0}})
        window.dispatchEvent(event)

        // 引导页监听用
        let confirmEvent = new CustomEvent("ByteHunterExtensionContinue")
        window.dispatchEvent(confirmEvent)
        // background监听插件关闭或继续后停止请求
        chrome.runtime.sendMessage('ByteHunterExtensionContinue')
    } else if (res.cancel) {
        console.log("取消", res)
        let event = new CustomEvent(res.cancel.newValue, {detail: {confirm: 0, cancel: 1}})
        window.dispatchEvent(event)

        // 引导页监听用
        let cancelEvent = new CustomEvent("ByteHunterExtensionReject")
        window.dispatchEvent(cancelEvent)
        // background监听插件关闭或继续后停止请求
        chrome.runtime.sendMessage('ByteHunterExtensionReject')
    }
})
