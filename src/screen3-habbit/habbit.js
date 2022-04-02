import styled from "styled-components";
import Logo from "./../assets/TrackIt.png";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useContext} from 'react';
import dataContext from "../contexts/dataContext";

export default function Habbit() {
    const {data} = useContext(dataContext);
    console.log(data.token)
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
                    <button>+</button>
                </div>
                <div className="information">
                    <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
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
 
`