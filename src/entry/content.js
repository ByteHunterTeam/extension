// 注入inject脚本

var s = document.createElement('script');
s.src = chrome.runtime.getURL('inject.js');
s.onload = function () {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);

// 监听来自inject的消息
window.addEventListener('ByteHunter-Message', (event) => {
    if (event.detail.type === 0) {
        chrome.runtime.sendMessage({uuid: event.detail.uuid, type: 'popup', params: event.detail.params})
    }

    if (event.detail.type === 1) {
        let chainId = sessionStorage.getItem('network')
        chainId = parseInt(chainId, 16)
        chrome.runtime.sendMessage({uuid: event.detail.uuid, type: 'params', params: event.detail.params, chainId: chainId})
    }

}, false)

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