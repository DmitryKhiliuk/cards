import React from 'react';
import {CardsList} from "./CardsList";
import {HeaderCard} from "./HeaderCard";
import {PaginationCards} from "./PaginationCards";
import style from "../CardsPack.module.css";

export const Cards = () => {
    return (
        <div className={style.blockTable}>
            <HeaderCard/>
            <CardsList/>
            <PaginationCards/>
        </div>
    );
};

