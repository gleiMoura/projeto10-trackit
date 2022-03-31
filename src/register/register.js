import Logo from './../assets/logo.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Register() {
    const Register = styled.div`
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
    return (
        <>
            <Register>
                <header>
                    <img src={Logo} alt="logo do trackIt" />
                </header>
                <main>
                    <input type="text" className='email' placeholder='email' required />
                    <input type="password" className="password" placeholder='senha' required />
                    <input type="text" className="name" placeholder='nome' required />
                    <input type="text" className="photo" placeholder='foto' required />
                    <button>Cadastrar</button>

                    <p>
                        <Link to="/">
                            Já tem uma conta? Faça login!
                        </Link>
                    </p>

                </main>
            </Register>
        </>
    )
}