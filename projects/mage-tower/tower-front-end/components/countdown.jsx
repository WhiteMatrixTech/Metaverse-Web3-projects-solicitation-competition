import React, {useState, useEffect} from 'react';
import styled from "styled-components";

const TimesBrdr = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  font-size: 0.14rem;
    font-family: "BLENDERPRO";
 width: 1rem;
 margin: 0 auto;
 span{
 display: inline-block;
 }
`;

export default function Countdown(props) {

    const [deadline] = useState(1642678410000);

    const [dayTime, setDayTime] = useState(0);
    const [hourTime, sethourTime] = useState(0);
    const [minuteTime, setMinuteTime] = useState(0);
    // const [secondTime, setSecondTime] = useState(0);

    useEffect(() => {
        if(!deadline) return ;
        switchTime();
        let timer = setInterval(()=>{
            switchTime();
        },1000);
        return () => {
            clearInterval(timer);
            timer = null
        }
    }, [deadline]);

    const switchTime = () => {
        // let afterTime = deadline + 7 * 24 * 60 * 60 * 1000;
        let afterTime = deadline;

        let leftTime = 0;
        if(afterTime > Date.parse(new Date())){
            leftTime = afterTime -  Date.parse(new Date());
        }


        var days = parseInt(leftTime /1000 / 60 / 60 / 24);
        var hours = parseInt(leftTime /1000 / 60 / 60 % 24);
        var minutes = parseInt(leftTime /1000 / 60 % 60);
        // var seconds = parseInt(leftTime /1000 % 60);

        setDayTime(formatTime(days));
        sethourTime(formatTime(hours));
        setMinuteTime(formatTime(minutes));
        // setSecondTime(formatTime(seconds));
    }

    const formatTime = (timer) =>{
        return  timer < 10 ? `0${timer}`: timer;
    }

    return (
            <TimesBrdr>
                <span>{dayTime}</span>
                <span>d</span>
                <div>{hourTime}</div>
                <span>h</span>
                <div>{minuteTime}</div>
                <span>m</span>
                {/*<div>{secondTime}</div>*/}
                {/*<span>s</span>*/}
            </TimesBrdr>
    );

}
