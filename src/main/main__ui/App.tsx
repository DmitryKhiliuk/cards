import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {SingIn} from "./components/singIn/singIn";
import {Header} from "./components/header/Header";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <Routes>
                    <Route path={'/'} element={<SingIn/>}/>
                    <Route path={'/'} element={<SingIn/>}/>
                    <Route path={'/'} element={<SingIn/>}/>
                    <Route path={'/'} element={<SingIn/>}/>
                    <Route path={'/'} element={<SingIn/>}/>
                    <Route path={'/'} element={<SingIn/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
