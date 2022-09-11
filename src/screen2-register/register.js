import Logo from './../assets/logo.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [dataRegister, setDataRegister] = useState([]);
		const navigate = useNavigate();
    function SendRegister() {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [name, setName] = useState("");
        const [image, setImage] = useState("");
        const boolean_email = (email.length === '');
        const boolean_password = (password.length < 6);
        const boolean_name = (name.length === '');
        const boolean_image = (image.length === '');
        const boolean = (boolean_email || boolean_password || boolean_name || boolean_image)
        const no_boolean = (!boolean_image && !boolean_password && !boolean_name && !boolean_image);
        return (
            <>
                <input type="email" id='email' placeholder='email' required onChange={(e) => setEmail(e.target.value)} />
                <input type="password" id="password" placeholder='senha (6 dígitos)' required onChange={(e) => setPassword(e.target.value)} />
                <input type="text" id="name" placeholder='nome' required onChange={(e) => setName(e.target.value)} />
                <input type="url" id="photo" placeholder='foto' required onChange={(e) => setImage(e.target.value)} />
                <button className={boolean ? "no-hide" : "hide"} onClick={(e) => {
                    if (boolean) {
                        alert("digite as informções corretamente e lembre-se que a senha deve ter no mínimo 6 dígitos!")
                    }
                    e.preventDefault();
                }}>Cadastrar</button>
                    <button className={no_boolean ? 'no-hide' : 'hide'} onClick={(e) => {
                        if (no_boolean) {
                            const requestion = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", {
                                email: email,
                                name: name,
                                image: image,
                                password: password
                            })
                            requestion.then(answer => {
                                setDataRegister(answer.data);
                                console.log(answer.data);
																navigate('/');
                            })
                            requestion.catch(e => {
																if(e.response.status === 422) {
																	alert("Preencha todos os campos corretamente!")
																}else {
																	alert("Pode ser que você já possua cadastro. Tente fazer login!")
																}
                            })
                            e.preventDefault();
                        }
                    }}>Cadastrar</button>
                <p>
                    <Link to="/">
                        Já tem uma conta? Faça login!
                    </Link>
                </p>
            </>
        )
    }
    return (
        <Registerstyle>
            <header>
                <img src={Logo} alt="logo do trackIt" />
            </header>
            <form>
                <SendRegister />
            </form>
        </Registerstyle>
    )
}

const Registerstyle = styled.div`
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
        background-color: #FFF;
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
        cursor: pointer;
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
    Link{
        color: #52B6FF 
    }
    `