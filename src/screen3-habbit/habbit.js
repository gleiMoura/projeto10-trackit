import styled from "styled-components";
import Logo from "./../assets/TrackIt.png";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useContext, useState } from 'react';
import dataContext from "../contexts/dataContext";
import axios from 'axios';

export default function Habbit() {
    const { data } = useContext(dataContext);
    const [plusButton, setPlusButton] = useState(false);
    const [render, setRerender] = useState(false);
    const [appear, setAppear] = useState(true)
    const [putNewHabbitOnScreen, setPutNewHabbitOnScreen] = useState(false);
    let listOfDays = [];
    let allHabbits = [];

    const config = {
        headers: {
            Authorization: `Bearer ${data.token}`
        }
    };

    const dataDays = [
        { daynumber: 0, dayword: 'D' },
        { daynumber: 1, dayword: 'S' },
        { daynumber: 2, dayword: 'T' },
        { daynumber: 3, dayword: 'Q' },
        { daynumber: 4, dayword: 'Q' },
        { daynumber: 5, dayword: 'S' },
        { daynumber: 6, dayword: 'S' },
    ];

    let days = [];

    function DaySquare({ daynumber, dayword }) {
        const [isSelected, setIsSelected] = useState(false);
        function isTrueOrFalse() {
            if (isSelected === false) {
                listOfDays.push(daynumber);
                console.log(listOfDays)
            } else {
                listOfDays = listOfDays.filter(element => element !== daynumber ? element : '');
                console.log(listOfDays)
            }
        }
        return (
            <p className={isSelected ? `day colorSelected ${daynumber}` : `day ${daynumber}`} onClick={() => {
                setIsSelected(!isSelected)
                isTrueOrFalse()
            }}>{dayword}</p>
        )
    }

    function Rerender() {
        return (
            <div className="days">
                {dataDays.map(element => {
                    return (
                        <DaySquare daynumber={element.daynumber} dayword={element.dayword} />
                    )
                })}
            </div>
        )
    }

    function FormContent() {
        const [inputHabbit, setInputHabbit] = useState('');
        console.log('formcontent', listOfDays)
        return (
            <>
                <input type='text' placeholder="nome do hábito" value={inputHabbit} onChange={(e) => setInputHabbit(e.target.value)} />
                <Rerender />
                <div className="buttons">
                    <p onClick={() => setRerender(!render)}> cancelar </p>
                    {appear ? 
                        < button onClick={(e) => {
                        setAppear(false)
                        const requestion = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", {
                            name: inputHabbit,
                            days: listOfDays,
                        }, config);
                        requestion.then(answer => {
                            console.log(answer.data);
                            allHabbits.push(answer.data);
                        })
                        requestion.catch(err => {
                            console.error(err.data)
                        })
                        e.preventDefault();
                    }}>Salvar</button>
                     : 'carregando'}

            </div>
            </>
        )
    }

    function NewHabbit({ habbitText }) {
        function NewDaySquere({ daynumber, dayword, thisClass }) {
            return (
                <p className={`${thisClass} ${daynumber}`}>{dayword}</p>
            )
        }
        return (
            <>
                <h1>{habbitText}</h1>
                <div className="days">
                    { }
                    {dataDays.map(element => {
                        for (let i = 0; i < days.length; i++) {
                            if (element !== days[i]) {
                                return (
                                    <NewDaySquere daynumber={element.daynumber} dayword={element.dayword} thisClass={`day`} />
                                )
                            } else {
                                return (
                                    <NewDaySquere daynumber={element.daynumber} dayword={element.dayword} thisClass={"day colorSelected"} />
                                )
                            }
                        }
                    })}
                </div>
            </>
        )
    }

    function InformationHabbits() {
        if (allHabbits.length === 0) {
            return (
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            )
        } else {
            return (
                allHabbits.map(element => {
                    days = element.days;
                    return (
                        <NewHabbit habbitText={element.name} />
                    )
                })
            )
        }
    }

    return (
        <Habbitstyle>
            <header>
                <div className="head">
                    <img className="first-img" src={Logo} alt="logo da marca" />
                    <div className="second-img" >
                        <img src={data.image} alt="foto pessoal" />
                    </div>
                </div>
            </header>
            <main>
                <div className="plus">
                    <p>Meus hábitos</p>
                    <button onClick={() => {
                        setPlusButton(!plusButton)
                    }}>+</button>
                </div>
                <form className={plusButton ? "put-habbit" : "hide"}>
                    <FormContent />
                </form>
                <div className="information">
                    <InformationHabbits />
                </div>
            </main>
            <footer>
                <div className="foot">
                    <p>Hábitos</p>
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
        </Habbitstyle>
    )
}

const Habbitstyle = styled.div`
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
    main{
        display: flex;
        flex-direction: column;
        align-items: center;
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
    .plus{
        width: 375px;
        height: 70px;
        display: flex;
        justify-content: space-between;
        padding: 20px 18px;
        font
    }
    .plus p{
        font-family: 'Lexend Deca';
        font-size: 23px;
        text-align: left;
        color: #126BA5;
    }
    .plus button{
        width: 40px;
        height: 35px;
        background-color: #52B6FF;
        color: white;
        border: 1px solid #52B6FF;
        border-radius: 5px;
        cursor: pointer;
    }
    .information{
        width: 375px;
        height: 70px;
        display: flex;
        justify-content: center;
        padding: 20px 18px;
        font-family: 'Lexend Deca';
        color: #666666;
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
    .put-habbit{
        width: 340px;
        height: 180px;
        border-radius: 5px;
        background-color: white;
        display: flex;
        flex-direction: column;
        padding: 18px;
        position: relative;
    }
    .put-habbit input{
        width: 300px;
        height: 45px;
        border: 1px solid #D4D4D4;
        focus: none;
        padding: 10px;
        margin-bottom: 8px;
        font-family: 'Lexend Deca';
        font-size: 16px;
    }
    .put-habbit .days{
        display: flex;
    }
    .put-habbit .days .day{
        width: 30px;
        height: 30px;
        border: 1px solid #D4D4D4;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 8px;
        cursor: pointer;
    }
    .put-habbit .buttons{
        position: absolute;
        bottom: 18px;
        right:18px;
        display: flex;
        align-items: center;
    }
    .put-habbit .buttons p{
        font-size: 16px;
        color: #52B6FF;
        font-family: 'Lexend Deca';
        margin-right: 8px;
        cursor: pointer;
    }
    .put-habbit .buttons button{
        width: 84px;
        height: 35px;
        background-color: #52B6FF;
        color: white;
        font-family: 'Lexend Deca';
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
`