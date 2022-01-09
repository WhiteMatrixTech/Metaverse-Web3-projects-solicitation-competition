import Layout from "../components/layout";
import styled from "styled-components";
import GameApp from "../components/gameApp";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
`;

const GameBg = styled('div')`
  width: 80%;
  height: 80%;
`



export default function Game() {
    return (
      <Container bg={true}>
        <GameBg>
            <GameApp></GameApp>
        </GameBg>
      </Container>
    );
}

Game.getLayout = function getLayout(page) {

    return (
        <Layout>
            {page}
        </Layout>
    )
}
