import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screen1-login/login";
import Register from "./screen2-register/register";
import Habbit from "./screen3-habbit/habbit";
import { useState } from 'react';
import dataContext from './contexts/dataContext';

export default function App() {
    const [data, setData] = useState([]);
    return (
        <>
        <dataContext.Provider value={{data}}>
            <BrowserRouter>
                <Routes>
                        <Route path="/" element={<Login setData = {setData} />} ></Route>
                        <Route path="/cadastro" element={<Register />}></Route>
                        <Route path="/habitos" element={<Habbit />}></Route>
                </Routes>
            </BrowserRouter>
        </dataContext.Provider>
        </>
    )
}