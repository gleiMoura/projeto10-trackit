import Logo from './../assets/logo.png';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';


export default function Login({setData}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [appear, setAppear] = useState(true);
    const boolean_email = (email.length !== '');
    const boolean_password = (password.length >= 6);

    function Sendlogin() {
        const navigate = useNavigate()
        if (appear) {
            return (
                <>
                    <button className={!boolean_email || !boolean_password ? "no-hide" : "hide"} onClick={(e) => {
                        if (!boolean_password) {
                            alert("sua senha deve ter no mínimo 6 dígitos!")
                        }
                        if (!boolean_email) {
                            alert("digite seu email!")
                        }
                        e.preventDefault();
                    }}>Entrar</button>
                    <button className={boolean_email && boolean_password ? "no-hide" : "hide"} onClick={(e) => {
                        if (boolean_email && boolean_password) {
                            setAppear(false)
                            const requestion = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", {
                                email: email,
                                password: password
                            });
                            requestion.then(answer => {
                                setData(answer.data);
                                navigate("/habitos")
                            })
                            requestion.catch(err => {
                                alert("dados inválidos!", err.data);
                                setAppear(true);
                                navigate("/")
                            })
                        }
                    }}>Entrar</button>
                </>
            )
        } else {
            return (
                <button className='loading'>
                    <ThreeDots
                        height="80"
                        width="80"
                        color='white'
                        ariaLabel='loading'
                    />
                </button>

            )
        }
    }
    return (
        <Loginstyle backinput={appear}>
            <header>
                <img src={Logo} alt="logo do trackIt" />
            </header>
            <form>
                <input type="email" id='email' placeholder='email' aria-disabled={appear} required onChange={(e) => {
                    setEmail(e.target.value);
                }} />
                <input type="password" id="password" placeholder='senha' aria-disabled={appear} required onChange={(e) => setPassword(e.target.value)} />
                <Sendlogin />
                <p>
                    <Link to="/cadastro">
                        Não tem uma conta? Cadastre-se
                    </Link>
                </p>
            </form>
        </Loginstyle>
    )
}

const Loginstyle = styled.div`
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
    form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    input{
        width: 300px;
        height: 45px;
        background-color: ${props => props.backinput ? "white" : '#D4D4D4'};
        border: 1px solid #D4D4D4;
        padding: 10px;
        text-align: left;
        margin-bottom: 6px;
        font-family: 'Lexend Deca';
        font-size: 20px;
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
    a{
        color: #52B6FF;
    }
    .loading{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(82, 183, 255, 0.6);
        border: 1px solid #52B6FF;
    }
`