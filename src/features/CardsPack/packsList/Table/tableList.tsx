import React, {useState} from 'react';
import {AppRootStateType} from "../../../../app/store";
import {CardPacksType} from "../../api-CardsPack";
import {deleteCardsPackTC, getPacksTC, updateCardsPackTC} from "../../cardsPack-reducer";
import style from "../../../../common/table/TableList.module.css";
import {Table, TableContainer} from "@mui/material";
import {TableHeadComp} from "../../../../common/table/TableHeadComp";
import {TableBodyComp} from "../../../../common/table/TableBody";
import {useNavigate} from "react-router-dom";
import {formatDate} from "../../../../common/formatDate/formatDate";
import {useAppDispatch, useAppSelector} from "../../../../common/hooks/hooks";
import {EditPackModal} from "./EditPackModal";
import {DeletePackModal} from "./DeletePackModal";




export const TableList = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const packsTableData = useAppSelector((state: AppRootStateType) => state.packs.packsTableData.cardPacks);
    const cardsStatus = useAppSelector((state:AppRootStateType) => state.cards.cardsStatus);

    const myId = useAppSelector((state:AppRootStateType) => state.profile._id);

    const removePackCards = (idPack: string) => {
        dispatch(deleteCardsPackTC(idPack))
    };

    const editPackCards = (id:string,  name: string, privatePack: boolean) => {
        dispatch(updateCardsPackTC({_id:id, name: name, private: privatePack}))
    };

    const [open, setOpen] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [id, setId] = useState('');

    const editModalPackCards = (idPack: string) => {
        setId(idPack)
        setOpen(true)
    };

    const deleteModalPackCards = (idPack: string) => {
        setId(idPack)
        setOpenDelete(true)
    };

    const callCards = (cardsPack_id:string) => {
            navigate(`/cards-for-packs/${cardsPack_id}`)
    };

    const sortUpdate = (sort: string | undefined) => {
        dispatch(getPacksTC({sortPacks: sort}) as any)
    }

    const tableCell = ['name', 'cardsCount', 'updated', 'user_name', 'Actions']

    return (
        <div>
            <TableContainer className={style.table}>
                <Table>
                    <TableHeadComp tableCell={tableCell} callbackSort={sortUpdate}/>
                    {packsTableData.map((item: CardPacksType) => {
                        return <TableBodyComp key={item._id}
                                              id={item._id}
                                              userId={item.user_id}
                                              itemOne={item.name}
                                              itemTwo={item.cardsCount}
                                              itemTree={formatDate(item.updated)}
                                              itemFour={item.user_name}
                                              myId={myId}
                                              removeData={deleteModalPackCards}
                                              editData={editModalPackCards}
                                              callCards={callCards}/>

                    })}
                </Table>
            </TableContainer>
            <EditPackModal setOpen={setOpen} open={open} editPackCards={editPackCards} id={id}/>
            <DeletePackModal setOpen={setOpenDelete} open={openDelete} removePackCards={removePackCards} id={id}/>
        </div>
    );
};

