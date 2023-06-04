import {RecognizeTransaction} from "@/entry/recognize";
import { ethErrors } from 'eth-rpc-errors';

let networkId = '0x1';
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
                networkId = data;
                sessionStorage.setItem('network', networkId)
            }
        })
        .catch((error) => reject(error));
}

// proxy request
if (window.ethereum && window.ethereum.request) {
    const metamaskRequest = window.ethereum.request;
    const customRequest = ({ ...ethereumRequestArguments }) => {
        return new Promise((resolve, reject) => {
            if (!supportNetwork.includes(sessionStorage.getItem('network'))) {
                continueRequest(metamaskRequest, ethereumRequestArguments, resolve, reject, 0)
                return;
            }

            if (method.includes(ethereumRequestArguments.method)) {
                postEvent(metamaskRequest, ethereumRequestArguments, resolve, reject).then(() => {})
            } else if (ethereumRequestArguments.method === 'eth_chainId') {
                // type为 1 获取chainId，0待定
                continueRequest(metamaskRequest, ethereumRequestArguments, resolve, reject, 1)
            } else {
                continueRequest(metamaskRequest, ethereumRequestArguments, resolve, reject, 0)
            }
        });
    };

    window.ethereum.request = customRequest;
}

// proxy sendAsync
const proxy1 = new Proxy(window.ethereum.sendAsync, {
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
                    console.log(argArray)
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
window.ethereum.sendAsync = proxy1

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

// proxy send
const proxy = new Proxy(window.ethereum.send, {
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
            return window.ethereum.request({ method: payloadOrMethod, params: callbackOrParams });
        }

        // ethereum.send(payload: JsonRpcRequest): unknown;
        // > cannot contain signature requests
        if (!callbackOrParams) {
            return Reflect.apply(target, thisArg, argArray);
        }

        // ethereum.send(payload: JsonRpcRequest, callback: JsonRpcCallback): void;
        // > gets handled like ethereum.sendAsync
        return window.ethereum.sendAsync(payloadOrMethod, callbackOrParams);
    }
})
window.ethereum.send = proxy

// network change
if (window.ethereum) {
    window.ethereum.on('chainChanged', (res) => {
        sessionStorage.setItem('network', res)
    })
}

