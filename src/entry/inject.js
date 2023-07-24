import {RecognizeTransaction} from "@/entry/recognize";
import {ethErrors} from 'eth-rpc-errors';
import {isEmpty} from "lodash-es";

let networkId = '0x1';
let proxyInterval;
sessionStorage.setItem('network', networkId)
const method = ['eth_sendTransaction', 'eth_signTypedData_v4', 'eth_sign', 'personal_sign', 'eth_signTypedData', 'eth_signTypedData_v1', 'eth_signTypedData_v3']
const supportNetwork = ['0x1', '0x38', '0x89', '0xa4b1', '0xa', '0x5']

async function postEvent(metamaskRequest, ethereumRequestArguments, resolve, reject) {
    try {
        let uuid = crypto.randomUUID()
        const chainId = sessionStorage.getItem('network')
        let params

        RecognizeTransaction(chainId, ethereumRequestArguments, uuid).then(res => {
            if (!res) {
                return
            }
            params = res
            let event = new CustomEvent('ByteHunter-Message', {
                detail: {
                    uuid: uuid,
                    params: res,
                    type: 1
                }
            })
            window.dispatchEvent(event)
        })

        let event = new CustomEvent('ByteHunter-Message', {detail: {uuid: uuid, type: 0, params: params}})
        window.dispatchEvent(event)
        window.addEventListener(uuid, (event) => {
            if (event.detail.confirm) {
                return metamaskRequest({
                    method: ethereumRequestArguments.method,
                    params: {
                        ...(ethereumRequestArguments.params || {}),
                        fromExtension: true,
                    },
                })
                    .then((data) => resolve(data))
                    .catch((error) => reject(error));
            } else if (event.detail.cancel) {
                reject({
                    code: 4001,
                    message:
                        "MetaMask Tx Signature: User denied transaction signature.",
                });
            }
        }, {once: true})
    } catch (e) {
        console.log(e)
        continueRequest(metamaskRequest, ethereumRequestArguments, resolve, reject, 0)
    }

}

function continueRequest(metamaskRequest, ethereumRequestArguments, resolve, reject, type) {
    return metamaskRequest({ ...ethereumRequestArguments })
        .then((data) => {
            resolve(data);
            if (type === 1) {
                if (data.startsWith('0x')) {
                    networkId = data;
                } else {
                    networkId = '0x' + Number(data).toString(16);
                }
                sessionStorage.setItem('network', networkId)
            }
        })
        .catch((error) => reject(error));
}

// proxy postMessage
if (window.postMessage) {
    const postRequest = window.postMessage;
    const customRequest = (data, ...rest) => {
        if (!supportNetwork.includes(sessionStorage.getItem('network'))) {
            postRequest(data, ...rest);
            return;
        }

        if (
            typeof data === 'object' &&
            data.target === "metamask-contentscript" &&
            data.data &&
            data.data.data &&
            data.data.data.params &&
            !data.data.data.params.fromExtension
        ) {
            if (method.includes(data.data.data.method)) {
                // console.log('拦截postmessage', data.data.data.method)
                let uuid = crypto.randomUUID()
                const chainId = sessionStorage.getItem('network')
                let params

                RecognizeTransaction(chainId, data.data.data, uuid).then(res => {
                    if (!res) {
                        return
                    }
                    params = res
                    let event = new CustomEvent('ByteHunter-Message', {
                        detail: {
                            uuid: uuid,
                            params: res,
                            type: 1
                        }
                    })
                    window.dispatchEvent(event)
                })

                let event = new CustomEvent('ByteHunter-Message', {detail: {uuid: uuid, type: 0, params: params}})
                window.dispatchEvent(event)
                window.addEventListener(uuid, (event) => {
                    if (event.detail.confirm) {
                        return postRequest({
                            target: "metamask-contentscript",
                            fromListener: true,
                            data: {
                                name: "metamask-provider",
                                data: {...data.data.data}
                            },
                        });
                    }
                }, {once: true})
            } else {
                postRequest(data, ...rest);
            }
        } else {
            postRequest(data, ...rest);
        }
    };

    window.postMessage = customRequest;
}

// network change
if (window.ethereum && window.ethereum.request) {
    // console.log('能监听到吗')
    window.ethereum.on('chainChanged', (res) => {
        // console.log('可以', res)
        sessionStorage.setItem('network', res)
    })
}

// network change
if (window.okxwallet && window.okxwallet.request) {
    // console.log('能监听到吗')
    window.okxwallet.on('chainChanged', (res) => {
        // console.log('可以', res)
        sessionStorage.setItem('network', res)
    })
}

// network change
if (window.coinbaseWalletExtension && window.coinbaseWalletExtension.request) {
    // console.log('能监听到吗')
    window.coinbaseWalletExtension.on('chainChanged', (res) => {
        // console.log('可以', res)
        sessionStorage.setItem('network', res)
    })
}

const proxyEthereumProvider = (ethereumProvider) => {
    // Only add our proxy once per provider
    if (!ethereumProvider || ethereumProvider.isByteHunter) return;

    if (ethereumProvider.request) {
        const metamaskRequest = ethereumProvider.request;
        const customRequest = ({ ...ethereumRequestArguments }) => {
            return new Promise((resolve, reject) => {
                // console.log('sdfa', ethereumRequestArguments)
                if (!supportNetwork.includes(sessionStorage.getItem('network'))) {
                    continueRequest(metamaskRequest, ethereumRequestArguments, resolve, reject, 0)
                    return;
                }

                if (method.includes(ethereumRequestArguments.method)) {
                    // console.log('拦截到了',ethereumRequestArguments)
                    postEvent(metamaskRequest, ethereumRequestArguments, resolve, reject).then(() => {})
                } else if (ethereumRequestArguments.method === 'eth_chainId' || ethereumRequestArguments.method === 'net_version') {
                    // type为 1 获取chainId，0待定
                    continueRequest(metamaskRequest, ethereumRequestArguments, resolve, reject, 1)
                } else {
                    continueRequest(metamaskRequest, ethereumRequestArguments, resolve, reject, 0)
                }
            });
        };

        ethereumProvider.request = customRequest;
    }

    ethereumProvider.sendAsync = new Proxy(ethereumProvider.sendAsync, {
        apply(target, thisArg, argArray) {
            const [request, callback] = argArray;
            if (!request) {
                return Reflect.apply(target, thisArg, argArray);
            }

            if (!supportNetwork.includes(sessionStorage.getItem('network'))) {
                return Reflect.apply(target, thisArg, argArray);
            }

            if (method.includes(request.method)) {
                // console.log('sendAsync 代理成功')
                let uuid = crypto.randomUUID()
                const chainId = sessionStorage.getItem('network')
                let params

                RecognizeTransaction(chainId, request, uuid).then(res => {
                    if (!res) {
                        return
                    }
                    params = res
                    let event = new CustomEvent('ByteHunter-Message', {
                        detail: {
                            uuid: uuid,
                            params: res,
                            type: 1
                        }
                    })
                    window.dispatchEvent(event)
                })

                let event = new CustomEvent('ByteHunter-Message', {detail: {uuid: uuid, type: 0, params: params}})
                window.dispatchEvent(event)
                window.addEventListener(uuid, (event) => {
                    if (event.detail.confirm) {
                        request.params.fromExtension = true;
                        // console.log(argArray)
                        return Reflect.apply(target, thisArg, argArray)
                    } else if (event.detail.cancel) {
                        const error = ethErrors.provider.userRejectedRequest(
                            'User denied message signature.'
                        );
                        const response = {
                            id: request?.id,
                            jsonrpc: '2.0',
                            error,
                        };
                        callback(error, response);
                    }
                }, {once: true})
            } else {
                return Reflect.apply(target, thisArg, argArray);
            }
        }
    })

    ethereumProvider.send = new Proxy(ethereumProvider.send, {
        apply(target, thisArg, argArray) {
            if (!supportNetwork.includes(sessionStorage.getItem('network'))) {
                return Reflect.apply(target, thisArg, argArray);
            }
            // console.log('代理send成功')

            const [payloadOrMethod, callbackOrParams] = argArray;

            // ethereum.send has three overloads:

            // ethereum.send(method: string, params?: Array<unknown>): Promise<JsonRpcResponse>;
            // > gets handled like ethereum.request
            if (typeof payloadOrMethod === 'string') {
                return ethereumProvider.request({ method: payloadOrMethod, params: callbackOrParams });
            }

            // ethereum.send(payload: JsonRpcRequest): unknown;
            // > cannot contain signature requests
            if (!callbackOrParams) {
                return Reflect.apply(target, thisArg, argArray);
            }

            // ethereum.send(payload: JsonRpcRequest, callback: JsonRpcCallback): void;
            // > gets handled like ethereum.sendAsync
            return ethereumProvider.sendAsync(payloadOrMethod, callbackOrParams);
        }
    })

    ethereumProvider.isByteHunter = true;
};

const proxyAllEthereumProviders = () => {
    clearInterval(proxyInterval);

    if (!isEmpty(window.ethereum)) {
        proxyEthereumProvider(window.ethereum);
    }

    // Proxy any other providers listed on the window.ethereum object
    // window.ethereum?.providers?.forEach((provider) => {
    //     proxyEthereumProvider(provider);
    // });

    // Proxy the window.coinbaseWalletExtension provider if it exists
    else if (!isEmpty(window.coinbaseWalletExtension)) {
        proxyEthereumProvider(window.coinbaseWalletExtension);
    }

    else if (!isEmpty(window.okxwallet)) {
        proxyEthereumProvider(window.okxwallet);
    }

    // Proxy providers used by Liquality (they have different providers per chain -_-)
    // const liqualityProviders = ['eth', 'rsk', 'bsc', 'polygon', 'arbitrum', 'fuse', 'avalanche', 'optimism'];
    // liqualityProviders.forEach((name) => proxyEthereumProvider(window[name]));
}

proxyInterval = setInterval(proxyAllEthereumProviders, 100);
proxyAllEthereumProviders();

const style = document.createElement('style');
style.innerHTML = '.bytehunter-radio-input input{display:none}.bytehunter-radio-input{display:-webkit-box;display:-ms-flexbox;display:flex;overflow:hidden;padding:10px;max-width:150px;max-height:40px;border-radius:10px;background:#fff;-webkit-box-shadow:rgba(99,99,99,.2) 0 2px 8px 0;box-shadow:0 2px 8px 0 rgba(99,99,99,.2);color:#000;transition:max-height .5s ease;transition:max-width .5s ease;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.bytehunter-radio-input:hover{max-width:200px;max-height:400px}.bytehunter-radio-input .info{display:-webkit-box;display:-ms-flexbox;display:flex;margin-bottom:10px;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:center}.bytehunter-radio-input .img{margin-top:1px;color:#313131;font-weight:800;font-size:1rem}.bytehunter-radio-input .question{margin-left:5px;color:#313131;font-weight:800;font-size:1rem}.bytehunter-radio-input label{display:-webkit-box;display:-ms-flexbox;display:flex;margin:8px 0 0;padding:14px;border:1px solid hsla(0,0%,73.3%,.164);border-radius:10px;background-color:#fff;color:#000;font-weight:600;font-size:13px;cursor:pointer;-webkit-transition:.3s ease;transition:.3s ease}.bytehunter-radio-input label:hover{border:1px solid #bbb;background-color:rgba(24,24,24,.13)}.bytehunter-radio-input input:checked+label{border-color:#bedaff;color:#165dff}';
document.getElementsByTagName('head')[0].appendChild(style);

document.onmouseup = function (e) {
    console.log(e)

    if (e.target.nodeName === 'LABEL' && e.target.htmlFor.indexOf("bytehunter-radio") !== -1) {
        if (e.target.role === 'wallet') {
            window.open(`https://console.bytehunter.site/#/address?address=${e.target.title.toLowerCase()}&network=${e.target.slot}`)
        } else {
            window.open(`https://console.bytehunter.site/#/result?txhash=${e.target.title.toLowerCase()}&network=${e.target.slot}`)
        }
        return
    }

    function isEthereumAddress(address) {
        const regex = /^0x[a-fA-F0-9]{40}$/;
        return regex.test(address);
    }

    function isEthereumTransactionHash(hash) {
        const regex = /^0x[a-fA-F0-9]{64}$/;
        return regex.test(hash);
    }

    function addElementAt(x, y, html) {
        const elem = document.createElement('div');
        elem.style.position = 'absolute';
        elem.style.left = x + 'px';
        elem.style.top = y + 'px';
        elem.innerHTML = html;
        document.body.appendChild(elem);
    }

    const selectedText = window.getSelection().toString();
    if (!selectedText) {
        return
    }


    const scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    const scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    if (isEthereumAddress(selectedText.trim())) {
        setTimeout(()=>{
            document.addEventListener("click",()=>{
                const btn = document.getElementById("bytehunter-btn");
                if(btn){
                    btn.parentNode.removeChild(btn);
                }
            },{
                once: true,
            })
        },0)

        addElementAt(e.clientX + scrollX, e.clientY + scrollY, `<div class="bytehunter-radio-input" id="bytehunter-btn">
  <div class="info">
    <img src="https://bytehunter.xyz/assets/picture/logo.png" width="20" height="20" class="img"/>
   </div>
  <input type="radio" id="bytehunter-radio-eth" name="value-radio" value="ETH">
  <label for="bytehunter-radio-eth" title="${selectedText.trim()}" slot="ETH" role="wallet">Ethereum</label>
  <input type="radio" id="bytehunter-radio-bsc" name="value-radio" value="BSC">
  <label for="bytehunter-radio-bsc" title="${selectedText.trim()}" slot="BSC" role="wallet">BSC</label>
  <input type="radio" id="bytehunter-radio-polygon" name="value-radio" value="POLYGON">
  <label for="bytehunter-radio-polygon" title="${selectedText.trim()}" slot="Polygon" role="wallet">Polygon</label>
  <input type="radio" id="bytehunter-radio-arb" name="value-radio" value="Arbitrum">
  <label for="bytehunter-radio-arb" title="${selectedText.trim()}" slot="Arbitrum" role="wallet">Arbitrum</label>
   <input type="radio" id="bytehunter-radio-op" name="value-radio" value="Optimism">
  <label for="bytehunter-radio-op" title="${selectedText.trim()}" slot="Optimism" role="wallet">Optimism</label>
</div>`);
    }
    if (isEthereumTransactionHash(selectedText.trim())) {

        setTimeout(()=>{
            document.addEventListener("click",()=>{
                const btn = document.getElementById("bytehunter-btn");
                if(btn){
                    btn.parentNode.removeChild(btn);
                }
            },{
                once: true,
            })
        },0)

        addElementAt(e.clientX + scrollX, e.clientY + scrollY, `<div class="bytehunter-radio-input" id="bytehunter-btn">
  <div class="info">
    <img src="https://bytehunter.xyz/assets/picture/logo.png" width="20" height="20" class="img"/>
   </div>
  <input type="radio" id="bytehunter-radio-eth" name="value-radio" value="ETH">
  <label for="bytehunter-radio-eth" title="${selectedText.trim()}" slot="ETH" role="tx">Ethereum</label>
  <input type="radio" id="bytehunter-radio-bsc" name="value-radio" value="BSC">
  <label for="bytehunter-radio-bsc" title="${selectedText.trim()}" slot="BSC" role="tx">BSC</label>
  <input type="radio" id="bytehunter-radio-polygon" name="value-radio" value="POLYGON">
  <label for="bytehunter-radio-polygon" title="${selectedText.trim()}" slot="Polygon" role="tx">Polygon</label>
  <input type="radio" id="bytehunter-radio-arb" name="value-radio" value="Arbitrum">
  <label for="bytehunter-radio-arb" title="${selectedText.trim()}" slot="Arbitrum" role="tx">Arbitrum</label>
   <input type="radio" id="bytehunter-radio-op" name="value-radio" value="Optimism">
  <label for="bytehunter-radio-op" title="${selectedText.trim()}" slot="Optimism" role="tx">Optimism</label>
</div>`);
    }
}
