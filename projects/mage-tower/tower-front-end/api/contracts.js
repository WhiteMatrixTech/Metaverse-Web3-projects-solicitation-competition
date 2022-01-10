import React, {useContext, useReducer} from 'react';


import reducer from './reducer';
import INIT_STATE from './initState';
import { ethers } from 'ethers';

const initState = {...INIT_STATE};

const Web3Context = React.createContext();

const connect = async (state, dispatch) => {
    const {web3InstanceState} = state;

    if (web3InstanceState!=null || typeof ethereum == 'undefined') return;

    dispatch({type: 'CONNECT_INIT'});

    const web3Instance = new ethers.providers.Web3Provider(window.ethereum)

// The MetaMask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, you need the account signer...
//     const signer = provider.getSigner()


    // const web3Instance = ethers.getDefaultProvider(network);
    if(web3Instance){
        dispatch({type: 'CONNECT', payload:  web3Instance });
    }

};

const Web3ContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initState);
    console.log("=====state=====",state);
    const { web3Instance } = state;
    if(web3Instance == null ) {
        connect(state, dispatch);
    }


    return <Web3Context.Provider value={{state,dispatch}}>
        {props.children}
    </Web3Context.Provider>;
};

const useWeb3 = () => ({...useContext(Web3Context)});
export {Web3ContextProvider, useWeb3};
