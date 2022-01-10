import styled from "styled-components";
import {useState,useEffect} from "react";
import GameLft from "./gameLeft";

const All = styled('div')`
    display: flex;
    align-items: stretch;
    justify-content: center;
   
`;



const Framebg = styled('div')`
  background:  url("./assets/images/game/frame.png");
  background-size: 100% 100%;
  padding: 0.65rem 0.45rem 0.65rem 0.5rem;
`

const Bg = styled('div')`
  width:  ${props => props.wd}; 
  height:  ${props => props.wd};
`
const Tr = styled('div')`
  width: 100%;
  height: ${props => props.wd};

  font-size: 0.14rem;
  display: flex;
  
`
const Td = styled('div')`
  width: ${props => props.wd};
  height: ${props => props.wd};
  display: flex;
  justify-content: center;
  align-items: center;
  background:  url("./assets/images/game/background.png")  center;
  box-sizing: border-box;
  border: ${props => props.show ? '1px solid rgba(255,255,255,0.1)' :'1px solid rgba(255,255,255,0.0)'};
  cursor: ${props => props.show ? 'pointer' :'not-allowed'};
  .tower_in_map {
    margin-top: -0.18rem;
    img {
    width: 0.3rem;
    }
  }
  
`
const createArray = (num)=> {
    let arr = Array(num);
    for (let i = 0; i < num; i++) {
        arr[i] = Array(num).fill(0);
    }
    return arr;
}

export default function GameApp() {
    const [widthTd] = useState('0.39');
    const [num] = useState(16);
    const [type,setType] = useState(0)
    const [list,setList] = useState(createArray(num))


    const SelectType = (tp) =>{
        setType(tp)
    }

    const PutType = (m,n) =>{
        if(!type) return;
        console.log(m,n)
        let arr =[...list];
        let curType = arr[m][n];

        // 当前是空地
        if (curType === 0) {
            arr[m][n] = type;
        } else if (type !== curType) {
            let isNewHigh = type % 5 === 0;         // more than 5 is senior
            let isCurrHigh = curType % 5 === 0;     // current is senior or not
            if ((isNewHigh && isCurrHigh) || (!isNewHigh && !isCurrHigh)) {
                arr[m][n] = 0;
            } else if ((isNewHigh && type / curType !== 5)) { //  cover
                arr[m][n] = type;
            }
        }

        setList(arr);
        setType(0)

    }

    const switchImg = (typeItem) =>{
        let imgStr;
        switch (typeItem){
            case 1:
                imgStr = "/assets/images/game/red.png";
                break;
            case 2:
                imgStr = "/assets/images/game/zi.png";
                break;
            case 3:
                imgStr = "/assets/images/game/y.png";
                break;

            case 5:
                imgStr = "/assets/images/game/town_1.png";
                break;
            case 10:
                imgStr = "/assets/images/game/town_2.png";
                break;
            case 15:
                imgStr = "/assets/images/game/town_3.png";
                break;
        }
        return imgStr;
    }

    useEffect(()=>{

        let arr = [...list];

        let typeArr = [1,2,3,5,10,15]


        for(let i=0 ;i<30;i++){
            let randomNum = Math.floor(Math.random() * 16);
            let randomNum2 = Math.floor(Math.random() * 16);
            let typeIndex = Math.floor(Math.random() * 6)
            arr[randomNum][randomNum2] = typeArr[typeIndex]
        }
        setList(arr);

    },[]);

    return <All>
        <GameLft onSelectType={SelectType} />
        <Framebg>
            <Bg wd={ `${widthTd * num}rem` }>{
                list.map((itemTr,i)=>(<Tr wd={`${widthTd}rem`} key={`tr_${i}`}>
                    {

                        itemTr.map((item,j)=>(<Td wd={`${widthTd}rem`} key={`td_${j}`} onClick={()=>PutType(i,j)} show={type}>
                            <div className="tower_in_map">
                                <img src={switchImg(item)} alt=""/>
                            </div>
                        </Td>))
                    }
                </Tr>))
            }
            </Bg>
        </Framebg>

    </All>
}
