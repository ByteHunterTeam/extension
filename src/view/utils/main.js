export const netMap = {
    1: {
        name: "ETH",
        url: "https://etherscan.io/",
        icon: "src/assets/chains/eth.png"
    },
    5: {
        name: "ETH TESTNET",
        url: "https://etherscan.io/",
        icon: "src/assets/chains/eth.png"
    },
    56: {
        name: "BSC",
        url: "https://bscscan.com/",
        icon: "src/assets/chains/bsc.png"
    },
    137: {
        name: "Polygon",
        url: "https://polygonscan.com/",
        icon: "src/assets/chains/polygon.png"
    },
    42161: {
        name: "Arbitrum",
        url: "https://arbiscan.io/",
        icon: "src/assets/chains/arbitrum.png"
    },
    10: {
        name: "ETH",
        url: "https://optimistic.etherscan.io/",
        icon: "src/assets/chains/optimistic.png"
    }
}

export const checkAddr = (network, addr) => {
    window.open(netMap[network].url + "address/" + addr)
}

export const useDefaultImage = (event) => {
    event.target.src = "src/assets/coin.svg";
}

export const handleAddr = (addr) => {
    if (!addr || addr.length !== 42) {
        return
    }
    return addr.substring(0, 5) + "..." + addr.substring(38.42)
}