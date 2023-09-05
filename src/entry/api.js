function recognize(url, params, uuid, chainId) {
    const controller = new AbortController();
    const signal = controller.signal;

    let requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: params,
        signal: signal,
    };

    // 防止第一次请求未结束，第二次请求开始，这样保证了关闭插件时第一次请求结束
    chrome.runtime.onMessage.addListener(msg => {
        if (msg === 'ByteHunterExtensionContinue' || msg === 'ByteHunterExtensionReject') {
            controller.abort();
        }
    })

    fetch(url, requestOptions)
        .then(async response => {
            let responseObj = await response.json()
            if (responseObj.code === 200) {
                responseObj.data.network = chainId.toString()
            }
            const text = JSON.stringify(responseObj)
            console.log("responseObj", responseObj)
            chrome.storage.local.set({'params': text, 'type': uuid})
            setTimeout(() => {
                chrome.storage.local.remove(['params', 'type'])
            }, 500)
        })
        .catch(error => console.log("Fetch Err", error))
}

export {recognize}
