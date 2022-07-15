import React from 'react';
import {NavLink} from "react-router-dom";
import {LOG_OUT, PROFILE, REC_PASSWORD, SING_IN, SING_UP, TEST} from "../routes/routes";

export  const Nav = () => {
    return (
        <div>
            <NavLink to={PROFILE}>PROFILE</NavLink>
            <NavLink to={SING_IN}>SING IN</NavLink>
            <NavLink to={SING_UP}>SING UP</NavLink>
            <NavLink to={REC_PASSWORD}>RECOVERY PASSWORD</NavLink>
            <NavLink to={TEST}>TEST</NavLink>
            <NavLink to={LOG_OUT}>LOG OUT</NavLink>
        </div>
    );
};

