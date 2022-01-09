import Layout from "../components/layout";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
`

const Logo = styled.div`
  width: 6.34rem;
  height: 6.77rem;
  background:  url("./assets/images/mint_logo.png") no-repeat center;
  background-size: 6.34rem 6.77rem;
`

const Panel = styled.div`
  width: 9.63rem;
  height: 7.17rem;
  margin-left: 0.5rem;
  background:  url("./assets/images/panel.png") no-repeat center;
  background-size: 9.63rem 7.17rem;
  
  color: white;
  box-sizing: border-box;
  padding: 0.9rem 0.9rem 0 0.9rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const PanelTitle = styled.div`
  font-family: "KH-Dot-Kabutochou-16";
  font-size: 0.6rem;
`

const PanelSubtitle = styled.div`
  font-family: "KH-Dot-Kabutochou-16";
  font-size: 0.24rem;
  word-break: keep-all;
  margin-top: 0.38rem;
`

const PanelDesc = styled.div`
  font-family: "KH-Dot-Dougenzaka-12";
  font-size: 0.25rem;
  word-break: keep-all;
  margin-top: 0.9rem;
`

const ProgressBar = styled.div`
  font-family: "KH-Dot-Dougenzaka-12";
  font-size: 0.23rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 0.5rem;
  box-sizing: border-box;
  background: linear-gradient(90deg, #593030, #593030 ${props => props.percent}, transparent 0);
  border: 0.05rem solid #000;
  margin-top: 0.35rem;
`

const Adjustment = styled.div`
  font-family: "KH-Dot-Dougenzaka-12";
  font-size: 0.4rem;
  margin-top: 0.6rem;
`

const RedText = styled.span`
  color: #DA6161;
`

const PanelCost = styled.div`
  font-family: "KH-Dot-Dougenzaka-12";
  font-size: 0.25rem;
  word-break: keep-all;
  margin-top: 0.6rem;
`

const PanelButton = styled.div`
  font-family: "KH-Dot-Dougenzaka-12";
  width: 3.2rem;
  height: 0.9rem;
  background: url("./assets/images/button.png") no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  font-size: 0.2rem;
  color: #FFF;
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function Mint() {
    return (
      <Container>
          <Logo/>
          <Panel>
              <PanelTitle>FARMER WOOL BURN</PanelTitle>
              <PanelSubtitle>MULTIPLY THE CAPABILITIES OF YOUR QUEST FOR ECONOMIC DOMINANCE.</PanelSubtitle>
              <PanelDesc>REDEEMABLE FOR ONE RANDOM FARMER UPON FULL LAUNCH OF WOLF GAME</PanelDesc>
              <ProgressBar percent="70%">10285 / 20000 FARMERS</ProgressBar>
              <Adjustment>
                  Amount <span> &lt; </span><RedText>1</RedText><span> &gt; </span>
              </Adjustment>
              <PanelCost>Cost: 10000 $MANA</PanelCost>
              <PanelButton>INSUFFICIENT $MANA</PanelButton>
          </Panel>
      </Container>
    );
}

Mint.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}