import React, { useEffect } from "react";
import styled from "styled-components";
import GlobalStyle from "../public/util/GlobalStyle";

import { Web3ContextProvider } from "../api/contracts";

import Header from "../components/header";

const Bg = styled('div')`
  background: ${props => props.bgShow ?'#150b07 url("./assets/images/bg.jpg") no-repeat center center' : 'url("./assets/images/game/background.png") repeat'};
  background-size: ${props => props.bgShow ? '100%': 'auto'};
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`

const Maincontent = styled('main')`
  flex-grow: 1;
`

export default function Layout({ children }) {

    useEffect(()=>{
        window.onresize = refreshRem;
        refreshRem();
    },[])

    const refreshRem = ()=> {
        const html = document.getElementsByTagName('html')[0];
        const oWidth = document.body.clientWidth || document.documentElement.clientWidth;
        html.style.fontSize = oWidth / 1920 * 100 + 'px'
    }
    return (    <Web3ContextProvider>
        <Bg bgShow={children.type.name !=='Game'}>
            <Header />
            <Maincontent>{ children }</Maincontent>
            <GlobalStyle />
        </Bg>
        </Web3ContextProvider>
    )
}

