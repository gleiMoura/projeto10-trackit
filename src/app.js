import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./login/login";
import Register from "./register/register"

export default function App(){
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <Login /> } ></Route>
                    <Route path="/cadastro" element={ <Register /> }></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}