
import detectEthereumProvider from '@metamask/detect-provider'

const initWeb3 =  async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
        // provider === window.ethereum
    } else {
        return {
            type: 'error'
        };
    }
}

const account = async () => {
    console.log("====ethereum==",ethereum)
    if (typeof ethereum == 'undefined') {
        return {
            type: 'error'
        };
    }
    initWeb3();

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    sessionStorage.setItem('account',accounts[0]);
    return {
        type: 'success',
        data: accounts[0]
    }
}
export default {
    account,
}
