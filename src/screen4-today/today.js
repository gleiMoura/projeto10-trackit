import styled from "styled-components";
import Logo from "./../assets/TrackIt.png";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useContext, useEffect, useState } from 'react';
import dataContext from "../contexts/dataContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import axios from 'axios';

export default function Today() {
    const { data } = useContext(dataContext);
    const [dataHabbits, setDataHabbits] = useState([]);
    console.log("habbits", dataHabbits)
    const weekDay = dayjs().$W;
    const config = {
        headers: {
            Authorization: `Bearer ${data.token}`
        }
    };

    useEffect(() => {
        const requestion = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
        requestion.then(answer => {
            setDataHabbits(answer.data);
            console.log(answer.data)
        })
        requestion.catch(err => {
            console.error(err.data);
        })
    }, [])

    function MyHabbit({ habbitText, habbitCurrent, habbitHighest }) {
        const [buttonCheck, setButtonCheck] = useState(false);
        return (
            <>
                <div className="my-habbit">
                    <div className="content">
                        <h1>{habbitText}</h1>
                        <div>
                            <p>{`Sequência atual: ${habbitCurrent} dias`}</p>
                            <p>{`Seu recorde: ${habbitHighest} dias`}</p>
                        </div>
                    </div >
                    <div className={buttonCheck ? "iongreen" : "iongray"}>
                        <ion-icon name="checkbox" onClick={() => {
                            setButtonCheck(!buttonCheck)
                            console.log(buttonCheck)
                        }}></ion-icon>
                    </div>
                </div>
            </>
        )
    }

    return (
        <TodayStyle>
            <header>
                <div className="head">
                    <img className="first-img" src={Logo} alt="logo da marca" />
                    <div className="second-img" >
                        <img src={data.image} alt="foto pessoal" />
                    </div>
                </div>
            </header>
            <main>
                <h1>
                    {weekDay === 0 ? `Domingo, ${dayjs().format('DD/MM')}` : ""}
                    {weekDay === 1 ? `Segunda, ${dayjs().format('DD/MM')}` : ""}
                    {weekDay === 2 ? `Terça, ${dayjs().format('DD/MM')}` : ""}
                    {weekDay === 3 ? `Quarta, ${dayjs().format('DD/MM')}` : ""}
                    {weekDay === 4 ? `Quinta, ${dayjs().format('DD/MM')}` : ""}
                    {weekDay === 5 ? `Sexta, ${dayjs().format('DD/MM')}` : ""}
                    {weekDay === 6 ? `Sábado, ${dayjs().format('DD/MM')}` : ""}
                </h1>
                <p>Nenhum hábito incluído ainda</p>
                {dataHabbits.map(element => {
                    return (
                        <MyHabbit habbitText={element.name} habbitCurrent={element.currentSequence} habbitHighest={element.highestSequence} />
                    )
                })}

            </main>
            <footer>
                <div className="foot">
                    <Link to="/habitos">
                        <p>Hábitos</p>
                    </Link>
                    <div className="progressbar" style={{ width: 100, height: 100 }}>
                        <CircularProgressbar
                            value={66}
                            maxValue="100"
                            text="Hoje"
                            styles={buildStyles({
                                textSize: '20px',
                                textColor: 'white',
                                pathColor: 'white',
                                trailColor: '#52B6FF'
                            })} />
                    </div>
                    <p>Histórico</p>
                </div>
            </footer>
        </TodayStyle>
    )
}
const TodayStyle = styled.div`
    background-color: #E5E5E5;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    header{
        width: 100%;
        height: 70px;
        background-color: #126BA5;
        display: flex;
        justify-content: center;
    }
    .head{
        width: 375px;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 18px;
    }
    .head .first-img{
        width: 80px;
        height: 30px;
    }
    .head .second-img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: 'black';
        overflow: hidden;
    }
    .head .second-img img{
        width: 100%;
        height: 100%
    }
    main{
        width: 340px;
        height: auto;
        overflow-y: scroll;
        margin: 20px 10px;
        margin-bottom: 120px;
    }
    main h1{
        text-align: left;
        font-size: 27px;
        margin-bottom: 15px;
        color: #126BA5;
        font-family: 'Lexend Deca';
    }
    main p{
        font-family: 'Lexend Deca';
        font-size: 18px;
        color: #BABABA;
    }
    main .cubo{
        width: 340px;
        height: 400px;
    }
    main .my-habbit{
        height: 94px;
        borders: 1px solid #E7E7E7;
        background-color: white;
        border-radius: 5px;
        padding: 10px;
        margin: 20px 0;
        display: flex;
        justify-content: space-between;
    }
    main .my-habbit ion-icon{
        font-size: 69px;
        cursor: pointer;
    }
    
    main .content h1{
        font-family: 'Lexend Deca';
        font-size: 20px;
        color: #666;
    }
    main .content p{
        font-size: 13px;
    }
    footer{
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: center;
        background-color: white;
        position: absolute;
        bottom: 0;
    }
    .foot{
        width: 375px;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 18px;
        background-color: white;
    }
    .foot p{
        font-family: 'Lexend Deca';
        font-size: 18px;
        color: #52B6FF;
        cursor: pointer;
    }
    .progressbar{
        margin-bottom: 80px;
        background-color: #52B6FF;
        border-radius: 50%;
        border: 5px solid #52B6FF;
    }
    a{
        text-decoration: none;
    }
`