import styled from "styled-components";
import Logo from "./../assets/TrackIt.png";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useContext, useState, useEffect } from 'react';
import dataContext from "../contexts/dataContext";
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from "react-router-dom"

export default function Habbit() {
    const { data } = useContext(dataContext);
    const [plusButton, setPlusButton] = useState(false);
    const [render, setRerender] = useState(false);
    const [appear, setAppear] = useState(true);
    const [allHabbits, setAllHabbits] = useState([]);
    let listOfDays = [];
    console.log(allHabbits)

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

    useEffect(() => {
        const requestion = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
        requestion.then(answer => {
            setAllHabbits(answer.data);
        })
        requestion.catch(err => {
            console.error(err.data)
        })
    }, []);

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
            <p className={isSelected ? `day colorSelected ${daynumber}` : `day ${daynumber}`} disabled={!appear} onClick={() => {
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
                <input type='text' placeholder="nome do hábito" value={inputHabbit} disabled={!appear} onChange={(e) => setInputHabbit(e.target.value)} />
                <Rerender />
                <div className="buttons">
                    <p onClick={() => setRerender(!render)}> cancelar </p>
                    {appear ?
                        < button onClick={(e) => {
                            setAppear(false);
                            const requestion = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", {
                                name: inputHabbit,
                                days: listOfDays,
                            }, config);
                            requestion.then(answer => {
                                console.log(answer.data);
                                setAllHabbits([...allHabbits, answer.data]);
                                console.log(allHabbits);
                                setAppear(true);
                                setPlusButton(true);
                                e.preventDefault();
                            })
                            requestion.catch(err => {
                                console.error(err.data);
                                setAppear(true);
                                alert("dados incorretos!")
                            })
                        }}>Salvar</button>
                        : <button className="loading">
                            <ThreeDots
                                height="40"
                                width="40"
                                color='white'
                                ariaLabel='loading'
                            />
                        </button>}

                </div>
            </>
        )
    }

    function NewHabbit({ habbitText, days, habbitId }) {
        function NewDaySquere({ dayword, thisClass }) {
            return (
                <p className={thisClass}>{dayword}</p>
            )
        }
        return (
            <>
                <div className="information-unit">
                    <ion-icon name="trash-outline" onClick={() => {
                        const requestion = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habbitId}`, config);
                        requestion.then(console.log('ok'));
                        requestion.catch(err => {
                            console.error(err.data)
                        });
                        setAllHabbits(allHabbits.filter(element => element.id !== habbitId ? element : ''))
                    }}></ion-icon>
                    <h1>{habbitText}</h1>
                    <div className="days">
                        {dataDays.map(element => {
                            return (
                                <NewDaySquere dayword={element.dayword} thisClass={element.daynumber === days[0] || element.daynumber === days[1] || element.daynumber === days[2] || element.daynumber === days[3] || element.daynumber === days[4] || element.daynumber === days[5] || element.daynumber === days[6] ? "day colorSelected" : "day"} />
                            )
                        })}
                    </div>
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
                    return (
                        <NewHabbit habbitText={element.name} days={element.days} habbitId={element.id} />
                    )
                })
            )
        }
    }

    return (
        <HabbitStyle appearStyle={appear}>
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
                    <Link to="/habitos">
                        <p>Hábitos</p>
                    </Link>
                    <Link to="/hoje">
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
                    </Link>
                    <p>Histórico</p>
                </div>
            </footer>
        </HabbitStyle>
    )
}

const HabbitStyle = styled.div`
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
        overflow-y: scroll;
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
        margin-bottom: 120px;
    }
    .information-unit{
        width: 375px;
        height: auto;
        display: flex;
        flex-direction: column;
        padding: 10px 9px;
        font-family: 'Lexend Deca';
        background-color: white;
        color: black;
        margin: 10px 0;
        border-radius: 5px;
        position: relative;
    }
    .information-unit ion-icon{
        font-size: 24px;
        position: absolute;
        top: 10px;
        right: 10px;
        color: #666666;
        cursor: pointer;
    }
    .information p{
        width: 375px;
        height: 70px;
        display: flex;
        justify-content: center;
        padding: 20px 18px;
        font-family: 'Lexend Deca';
        color: #666666;
    }
    .information h1{
        width: 300px;
        margin-bottom: 5px;
        font-wight: 700;
        font-family: 'Lexend Deca';
        font-size: 20px;
        background-color: white;
        margin-bottom: 15px;
        word-wrap: break-word;
    }
    .information .days{
        display: flex;
    }
    .information .days .day{
        width: 30px;
        height: 30px;
        border: 1px solid #D4D4D4;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 8px;
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
        padding-bottom: 80px;
        position: relative;
        background-color: ${props => props.appearStyle ? 'white' : 'rgba(255, 255, 255, 0.6)'}
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
        background-color: ${props => props.appearStyle ? 'white' : 'rgba(212, 212, 212, 0.6)'}
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
    .put-habbit .buttons .loading{
        width: 84px;
        height: 35px;
        background-color:  rgba(82, 183, 255, 0.6);
        color: white;
        font-family: 'Lexend Deca';
        border: none;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center
    }
    a{
        text-decoration: none;
    }
`