import Logo from './../assets/logo.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';



export default function Login() {
    const Login = styled.div`
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
            header{
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 70px;
                margin-bottom: 30px;
            }
            main{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            input{
                width: 300px;
                height: 45px;
                background-color: #FFF;
                border: 1px solid #D4D4D4;
                padding: 10px;
                text-align: left;
                margin-bottom: 6px;
                font-family: 'Lexend Deca';
                font-size: 20px;
                color: #DBDBDB;
            }
            button{
                width: 300px;
                height: 45px;
                background-color: #52B6FF;
                border-radius: 5px;
                margin-bottom: 25px;
                font-family: 'Lexend Deca';
                font-size: 21px;
                color: white;
                cursor: pointer;
            }
            p{
                font-family: 'Lexend Deca';
                font-size: 14px;
                color: #52B6FF;
                cursor: pointer;
            }
`
    const [data, setData] = useState([]);

    function Sendform() {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const person_data = null;
        return (
            <>
                <input type="text" className='email' placeholder='email' required onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="password" placeholder='senha' required onChange={(e) => setPassword(e.target.value)} />
                <button onClick={() => {
                    const requestion = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", person_data);
                    requestion.then(answer => {
                        console.log(answer.data)
                    })
                    requestion.catch(err => {
                        console.error(err.data)
                    })
                }}>Entrar</button>
                <p>
                    <Link to="/cadastro">
                        Não tem uma conta? Cadastre-se
                    </Link>
                </p>
            </>
        )
    }
    return (
        <Login>
            <header>
                <img src={Logo} alt="logo do trackIt" />
            </header>
            <main>
                <Sendform />
            </main>
        </Login>
    )
}