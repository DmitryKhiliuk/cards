import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {SingIn} from "../../features/singIn/singIn";
import {Header} from "./header/Header";
import {SingUp} from "../../features/singUp/singUp";
import {Profile} from "../../features/profile/profile";
import {RecoveryPassword} from "../../features/recoveryPassword/recoveryPassword";
import {Test} from "../../features/test/test";
import {LogOut} from "../../features/logOut/logOut";
import {LOG_OUT, PROFILE, REC_PASSWORD, SING_IN, SING_UP, TEST} from "./routes/routes";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <Routes>
                    <Route path={PROFILE} element={<Profile/>}/>
                    <Route path={SING_IN} element={<SingIn/>}/>
                    <Route path={SING_UP} element={<SingUp/>}/>
                    <Route path={REC_PASSWORD} element={<RecoveryPassword/>}/>
                    <Route path={TEST} element={<Test/>}/>
                    <Route path={LOG_OUT} element={<LogOut/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
