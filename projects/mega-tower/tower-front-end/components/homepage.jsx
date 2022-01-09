import Footer from "../components/footer";
import React from "react";
import styled from "styled-components";

// import Image from 'next/image'
// import getConfig from 'next/config'
// const {backgroundBaseUrl} = getConfig().publicRuntimeConfig


const MainMid = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
`;

const IndexContent = styled('div')`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const ImgWidth = styled('div')`
  width: 8.51rem;
  height: 7.16rem;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
  margin-top: -3rem;
  img{
  width: 100%;
  }
`;

const Home = ()=> {
    return<MainMid>
        <IndexContent>
            <ImgWidth>
                <img src="/assets/images/main_logo.png"  alt=""/>
            </ImgWidth>
        </IndexContent>
        <Footer />
    </MainMid>
}

export default Home;
