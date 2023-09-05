import {base_url} from "@/consts/consts";
import {recognize} from "@/entry/api";
import {nanoid} from "nanoid";

chrome.runtime.onMessage.addListener(function (msg) {
    if (msg.type === 'popup') {
        // const params = JSON.stringify(msg.params)
        // chrome.storage.local.set({'params': params})
        chrome.windows.create({
            url: 'intercept.html',
            type: 'popup',
            width: 500,
            height: 800,
            top: 150,
            left: 10,
        }, (window) => {
            console.log('background', msg)
            chrome.storage.local.set({'window_id': {'id': window.id, 'uuid': msg.uuid}})
        })
    }

    if (msg.type === "params" && msg.params) {
        const params = JSON.stringify(msg.params.body)
        recognize(base_url + msg.params.end_url, params, msg.uuid, msg.chainId)
    }

    if (msg.type === 'login') {
        chrome.storage.sync.set({'wallet': msg.wallet})
    }
});

const CHROME_MALICIOUS_EXTENSION_ORIGINAL_DATA = [
    {
        id: "nkbihfbeogaeaoehlefnkodbefgpgknn",
        shortName: "MetaMask",
    },
    {
        id: "mfgccjchihfkkindfppnaooecgfneiii",
        shortName: "TokenPocket",
    },
    {
        id: "hnfanknocfeofbddgcijnmhnfnkdnaad",
        shortName: "Coinbase Wallet extension",
    },
    {
        id: "egjidjbpglichdcondbcbdnbeeppgdph",
        shortName: "Trust Wallet",
    },
]
const EDGE_MALICIOUS_EXTENSION_ORIGINAL_DATA = [
    {
        id: ["ejbalbakoplchlghecdalmeeeajnimhm", "nkbihfbeogaeaoehlefnkodbefgpgknn"],
        shortName: "MetaMask",
    },
    {
        id: ["mfgccjchihfkkindfppnaooecgfneiii"],
        shortName: "TokenPocket"
    },
    {
        id: ["hnfanknocfeofbddgcijnmhnfnkdnaad"],
        shortName: "Coinbase Wallet extension"
    },
    {
        id: "egjidjbpglichdcondbcbdnbeeppgdph",
        shortName: "Trust Wallet",
    },
]
const WHITE_LIST_PREFIX = ['chrome://', 'chrome-extension://', 'edge://', 'edge-extensions://']
const handleSuspiciousExtension = (extensionInfo) => {
    let ids = [];
    extensionInfo.forEach(item => {
        chrome.management.setEnabled(item.id, false);
        ids.push(item.id)
    })
    const msg = {
        "risk_level": 3, //1、低风险 2、警告3、高风险
        "method": "",
        "network":"",
        "gas_fee": "",
        "record_id": "",
        "components": [
            {
                module: 'tip',
                data: {
                    type: 3,
                    value: chrome.i18n.getMessage('riskExtension') + ': ' + ids,
                }
            }
        ]
    }

    chrome.windows.create({
        url: 'intercept.html',
        type: 'popup',
        width: 500,
        height: 800,
        top: 10,
        left: 10,
    }, (window) => {
        chrome.storage.local.set({
            'window_id': {'id': window.id, 'uuid': nanoid()},
            'malicious_extension': msg
        })
    })
};
const checkExtensionsMalicious = async () => {
    const browserInfo = navigator.userAgent;

    if (browserInfo.includes('Chrome') && browserInfo.includes('Edg')) {
        // 是edge浏览器
        chrome.management.getAll((extensions) => {
            const maliciousExt = extensions.filter((ext) => {
                return EDGE_MALICIOUS_EXTENSION_ORIGINAL_DATA.some(malicious => {
                    return malicious.shortName === ext.shortName && malicious.id.indexOf(ext.id) === -1
                })
            });

            if (maliciousExt.length !== 0) {
                handleSuspiciousExtension(maliciousExt);
            }
        })
    } else {
        // 是别的浏览器
        chrome.management.getAll((extensions) => {
            const maliciousExt = extensions.filter((ext) => {
                return CHROME_MALICIOUS_EXTENSION_ORIGINAL_DATA.some(malicious => {
                    return malicious.shortName === ext.shortName && malicious.id !== ext.id
                })
            });

            if (maliciousExt.length !== 0) {
                handleSuspiciousExtension(maliciousExt);
            }
        })
    }
};
// 初始化插件检测是否有metamask钓鱼插件
const initExtension = async () => {
    try {
        await checkExtensionsMalicious();
    } catch (error) {
        console.log(error);
    }
}
// 监听新安装的插件是否是metamask钓鱼插件
chrome.management.onInstalled.addListener((extensionInfo) => {
    const browserInfo = navigator.userAgent;
    if (browserInfo.includes('Chrome') && browserInfo.includes('Edg')) {
        EDGE_MALICIOUS_EXTENSION_ORIGINAL_DATA.forEach(item => {
            if (extensionInfo.shortName === item.shortName && item.id.indexOf(extensionInfo.id) === -1) {
                handleSuspiciousExtension([extensionInfo]);
            }
        });
    } else {
        CHROME_MALICIOUS_EXTENSION_ORIGINAL_DATA.forEach(item => {
            if (extensionInfo.shortName === item.shortName && extensionInfo.id !== item.id) {
                handleSuspiciousExtension([extensionInfo]);
            }
        });
    }
});
chrome.runtime.onInstalled.addListener(async (details) => {
    if (details.reason !== 'install') return;
    const lang = chrome.i18n.getUILanguage()
    if (lang === 'zh-CN') {
        chrome.tabs.create({
            url: 'https://doc.bytehunter.xyz/docs/guide/extension.html#三、开始使用',
        })
    } else if (lang === 'en') {
        chrome.tabs.create({
            url: 'https://doc.bytehunter.xyz/docs/guide/extension.html#三、start-using',
        })
    }
    await initExtension()
});

// 检测网站
const verifyWebsite = async (url) => {
    const resp = await (await fetch(`https://api.gopluslabs.io/api/v1/phishing_site?url=${url}`)).json()

    if (resp.code !== 1) {
        return false
    }

    const result = resp.result

    console.log("website", url, resp)

    return result.phishing_site === 1;
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {

    if (changeInfo.status === "complete") {
        for (const item of WHITE_LIST_PREFIX) {
            if (tab.url.indexOf(item) !== -1) {
                return;
            }
        }
        // 检测
        const malice = await verifyWebsite(tab.url)

        if (malice) {
            const msg = {
                "risk_level": 3, //1、低风险 2、警告3、高风险
                "method": "",
                "network":"",
                "gas_fee": "",
                "record_id": "",
                "components": [
                    {
                        module: 'tip',
                        data: {
                            type: 3,
                            value: chrome.i18n.getMessage('phishingWebsite'),
                        }
                    }
                ]
            }

            chrome.windows.create({
                url: 'intercept.html',
                type: 'popup',
                width: 500,
                height: 800,
                top: 10,
                left: 10,
            }, (window) => {
                chrome.storage.local.set({
                    'window_id': {'id': window.id, 'uuid': nanoid()},
                    'detective_website': msg
                })
            })
        }

    }
})


chrome.runtime.onInstalled.addListener(details => {
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.runtime.setUninstallURL('https://form.antdv.com/r/645b463631d00061');
    }
});

