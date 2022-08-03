import React from 'react';
import {CardsList} from "./CardsList";
import {HeaderCard} from "./HeaderCard";
import {PaginationCards} from "./PaginationCards";

export const Cards = () => {
    return (
        <div style={{backgroundColor: 'white', padding: '10px'}}>
            <HeaderCard/>
            <CardsList/>
            <PaginationCards/>
        </div>
    );
};

