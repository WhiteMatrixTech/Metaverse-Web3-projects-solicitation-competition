import styled from "styled-components";
import {useState,useEffect} from "react";
import {useWeb3} from "../api/contracts";

import Accounts from '../api/Account';

const ConnectBtn = styled('div')`
  width: 2.0rem;
  height: 0.7rem;
  font-family: "BLENDERPRO";
  display: flex;
  justify-content: center;
  align-items: center;
    font-size: 0.18rem;
  background:url("../assets/images/game/connect.png") no-repeat;
  background-size: 100% 100%;
  color: #908251;
  line-height: 0.7rem;
  text-transform: uppercase;
`


const AddressTxt = styled('div')`

 width: 1.8rem;
  height: 0.7rem;
  font-family: "BLENDERPRO";
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
    font-size: 0.14rem;
  background:url("../assets/images/game/connect.png") no-repeat;
  background-size: 100%;
  color: #908251;
   text-transform: uppercase;
  span{
   color: #6c623d;
  }
`


export default function  ConnectWallet() {
    const {  dispatch, state } = useWeb3();
    const { Account } = state;

    const [account, setaccount] = useState('');


    useEffect(() => {
        let selectedStorage = sessionStorage.getItem('account');
        if (selectedStorage) {
            dispatch({type: 'SET_ALLACCOUNT',payload:selectedStorage});
            setaccount(selectedStorage);
        }

    }, [Account]);


    const connect = async() => {
        const accoutlist = await Accounts.account();
        if(accoutlist.type === "success"){
            setaccount(accoutlist.data);
            console.log("=accoutlist.data====",accoutlist.data)
            dispatch({type: 'SET_ALLACCOUNT',payload:accoutlist.data});
            sessionStorage.setItem('account',accoutlist.data);
        } else {
            dispatch({type: 'SET_ERROR',payload: {msg:"Please install MetaMask"}});
        }
    }
    const AddresstoShow = (address) => {

        let frontStr = address.substring(0, 9);

        let afterStr = address.substring(address.length - 4, address.length);

        return `${frontStr}****${afterStr}`

    }


    return <div>
        {
            account &&<AddressTxt>
                <div>Connected</div>
                <span>{AddresstoShow(account)}</span>

            </AddressTxt>
        }
        {
            !account &&<ConnectBtn onClick={()=>connect()}>
                Connect wallet
            </ConnectBtn>
        }

 </div>
}
