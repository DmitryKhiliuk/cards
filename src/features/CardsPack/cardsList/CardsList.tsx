import React, {useState} from 'react';
import {Table, TableContainer} from "@mui/material";
import style from "../../../common/table/TableList.module.css";
import {TableHeadComp} from "../../../common/table/TableHeadComp";
import {TableBodyComp} from "../../../common/table/TableBody";
import {AppRootStateType} from "../../../app/store";
import {deleteCardTC, setParamsCardsAC} from "./cards-reducer";
import {CardsType} from "./api-Cards";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {formatDate} from "../../../common/formatDate/formatDate";
import {DeleteCardModal} from "./cardModals/DeleteCardModal";

export const CardsList = () => {
    const dispatch = useAppDispatch();
    const cardsTableData = useAppSelector((state: AppRootStateType) => state.cards.cardsTableData.cards);
    const myId = useAppSelector((state: AppRootStateType) => state.profile._id);

    const tableCell = ['question', 'answer', 'LastUpdated', 'grade', 'Actions'];

    const [open, setOpen] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [_id, set_Id] = useState('');

    const deleteModalCards = (_id: string) => {
        set_Id(_id)
        setOpenDelete(true)
    };

    const removeCard = (_id: string) => {
        dispatch(deleteCardTC(_id))
    };

    const sortUpdate = (sort: any) => {
        dispatch(setParamsCardsAC({sortCards:sort}));
    }
    return (
        <div>
            <TableContainer className={style.table}>
                <Table>
                    <TableHeadComp tableCell={tableCell} callbackSort={sortUpdate}/>
                    {cardsTableData.map((item:CardsType) => {
                        return <TableBodyComp key={item._id}
                                              id={item._id}
                                              userId={item.user_id}
                                              itemOne={item.question}
                                              itemTwo={item.answer}
                                              itemTree={formatDate(item.updated)}
                                              itemFour={item.grade}
                                              myId={myId}
                                              removeData={deleteModalCards}
                                              // editData={editPackCards}
                                              // callCards={callCards}
                                              />
                    })}
                </Table>
            </TableContainer>
            <DeleteCardModal setOpen={setOpenDelete} open={openDelete} removeCard={removeCard} _id={_id}/>
        </div>
    );
};

