import styled from "styled-components";

import Connect from "./connect"
import Countdown from "./countdown";

const Lft = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 2.0rem;
    margin-right: 0.1rem;
`;

const TowerBg = styled.div`
    
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url("./assets/images/game/tower_container.png") no-repeat;
  background-size: 100% 100%;
  width: 100%;
  flex-basis: 60%;
  

  .tower {
    //padding: 0.1rem 0;
    cursor: pointer;
    img{
      width: 0.8rem;
    }
  }
  
`;

const MessageBg = styled.div`
  background: url("./assets/images/game/message.png") no-repeat;
  background-size: 100% 100%;
  width: 100%;
  flex-basis: 40%;
  font-family: "BLENDERPRO";
  padding-top: 0.6rem;
  text-align: center;
  color: white;
  font-size: 0.14rem;
`;

const ColorSpan = styled.span`
  color: ${props => props.color};
`;



export default function GameLft({onSelectType}) {
    return <Lft>
        <TowerBg>
            <div className="tower">
                <img src="/assets/images/game/red.png" alt="" onClick={()=>onSelectType(1)}  />
            </div>
            <div className="tower">
                <img src="/assets/images/game/town_1.png" alt=""onClick={()=>onSelectType(5)} />
            </div>
        </TowerBg>
        <Connect />
        <MessageBg>
            <div>BATTLE TIME</div>
            <div><Countdown /></div>
            <p>PLAYER CAMP<br/><ColorSpan color={'#ff0'}>YELLOW</ColorSpan></p>
            <p>NUMBER<br/>1475 PLAYER</p>
            <p>TOWERS NUM<br/>75</p>
        </MessageBg>
    </Lft>
}
