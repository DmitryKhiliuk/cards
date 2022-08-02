import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../../../app/store";
import {CardPacksType} from "../../api-CardsPack";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {deleteCardsPackTC, updateCardsPackTC} from "../../cardsPack-reducer";
import {useNavigate} from "react-router-dom";
import {Table} from "../../../../common/table/Table";


export const TableList = () => {
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()
    const packsTableData = useSelector<AppRootStateType, Array<CardPacksType>>(state => state.packs.packsTableData.cardPacks)
    const myId = useSelector<AppRootStateType, string | null>(state => state.profile._id)
    //
    // const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    //     dispatch(getPacksTC({page: page}))
    // }

    const removePackCards = (idPack: string) => {
        dispatch(deleteCardsPackTC(idPack) as any)
    }
    const editPackCards = (idPack: string) => {
        dispatch(updateCardsPackTC({_id: idPack, name: 'MaxTsNew'}) as any)
    }
    const tableCell = ['Name', 'Cards', 'LastUpdated', 'Created by', 'Actions']
    return (
        <div>
            <Table
                tableCell={tableCell}
                tableData={packsTableData}
                removeData={removePackCards}
                editData={editPackCards}
                myId={myId}
            />
        </div>
    );
}

