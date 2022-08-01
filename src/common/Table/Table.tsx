import * as React from 'react';
import Box from '@mui/material/Box';
import {
    DataGrid,
    GridColDef, gridPageCountSelector,
    gridPageSelector, GridToolbar,
    GridValueGetterParams,
    useGridApiContext,
    useGridSelector
} from '@mui/x-data-grid';
import {PackType} from "../../features/CardsPack/cardsPack-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Pagination} from "@mui/material";
import {useDemoData} from "@mui/x-data-grid-generator";
import SelectVariants from "../../features/CardsPack/selectPage";
import Button from "@mui/material/Button";
function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <Pagination
            color="primary"
            count={pageCount}
            page={page + 1}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    );
}




export default function DataGridDemo() {
    const cardsPack = useSelector<AppRootStateType, PackType[]>(state => state.cardsPack.cardPacks)

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
            field: 'user_name',
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

    const rows = cardsPack
    return (
        <Box sx={{ height: 550, width: 1000, backgroundColor: 'white', padding: '15px',textAlign: 'center'}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h2>Pack List</h2>
                <Button variant="contained">Add Pack</Button>
            </div>
            <DataGrid
                rows={rows}
                getRowId={(row) => row._id}
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[8]}
                checkboxSelection
                disableSelectionOnClick
                components={{
                    Pagination: CustomPagination,
                    Toolbar: GridToolbar,

                }}
            />
            <SelectVariants/>
        </Box>
    );
}



