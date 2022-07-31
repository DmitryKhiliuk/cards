import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../app/store";
import {CardsPacksType} from "../cardsPacks-reducer";

export const DataGridDemo = () => {
    const cardsPacks = useSelector<AppRootStateType, CardsPacksType[]>(state => state.cardsPacks.cardPacks)
    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            width: 250,
            editable: true,
        },
        {
            field: 'cardsCount',
            headerName: 'Cards',
            width: 150,
            editable: true,
        },
        {
            field: 'updated',
            headerName: 'Last updated',
            type: 'number',
            width: 200,
            editable: true,
        },
        {
            field: 'user_id',
            headerName: 'Created by',
            // description: 'This column has a value getter and is not sortable.',
            // sortable: false,
            width: 200,
            // valueGetter: (params: GridValueGetterParams) =>
            //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        {
            field: '',
            headerName: 'Actions',
            width: 110,
            editable: true,
        }
    ];

    const rows = cardsPacks
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                getRowId={(row) => row._id}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                // checkboxSelection
                disableSelectionOnClick
            />
        </Box>
    );
}