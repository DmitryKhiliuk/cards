import React from 'react';
import {Rating, TableBody, TableCell, TableRow} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import SchoolIcon from '@mui/icons-material/School';
import Edit from "@mui/icons-material/Edit";
import {CardPacksType} from "../../features/CardsPack/api-CardsPack";
import {useNavigate} from "react-router-dom";
import {LEARN} from "../routes/routes";

type TableBodyType = {
    myId: string | null,
    pack?: CardPacksType,
    removeData: (id: string) => void,
    editData?: (id: string) => void,
    callCards?: (id: string, name?: string) => void,
    id: string,
    userId: string
    itemOne: any
    itemTwo: any
    itemTree: any
    itemFour: any
};

export const TableBodyComp = (props: TableBodyType) => {
    const navigate = useNavigate();

    const onDoubleClickHandler = () => {
        props.callCards && props.callCards(props.id)
    };
    const onClickEditDataHandler = () => {
        props.editData && props.editData(props.id)
    };
    const onClickLearnHandler = () => {
        props.pack && navigate(`${LEARN}?cardsPack_id=${props.pack._id}&pageCount=${props.pack.cardsCount}`)
    };

    return (
        <TableBody style={{width: '100%'}}>
            <TableRow hover key={props.id} onDoubleClick={onDoubleClickHandler} style={{height: "30px"}}>
                {/*Name*/}
                <TableCell>
                    <Box sx={{alignItems: 'center', display: 'flex'}}>
                        <Typography color="textPrimary" variant="body1">
                            {props.itemOne}
                        </Typography>
                    </Box>
                </TableCell>
                {/*CardsCount*/}
                <TableCell>
                    <Box sx={{alignItems: 'center', display: 'flex'}}>
                        <Typography color="textPrimary" variant="body1">
                            {props.itemTwo}
                        </Typography>
                    </Box>
                </TableCell>
                {/*updated*/}
                <TableCell>
                    <Box sx={{alignItems: 'center', display: 'flex'}}>
                        <Typography color="textPrimary" variant="body1">
                            {props.itemTree}
                        </Typography>
                    </Box>
                </TableCell>
                {/*user_name*/}
                <TableCell>
                    <Box sx={{alignItems: 'center', display: 'flex'}}>
                        <Typography color="textPrimary" variant="body1">
                            {typeof props.itemFour === 'number'
                                ? <Rating defaultValue={props.itemFour} precision={0.5}/>
                                : props.itemFour
                            }
                        </Typography>
                    </Box>
                </TableCell>
                {/*Action*/}
                <TableCell>
                    <Box sx={{alignItems: 'center', display: 'flex'}}>
                        <Typography color="textPrimary" variant="body1">
                            {props.myId === props.userId &&
                                <>
                                    <IconButton onClick={() => props.removeData(props.id)}>
                                        <Delete/>
                                    </IconButton>

                                    <IconButton onClick={onClickEditDataHandler}>
                                        <Edit/>
                                    </IconButton>

                                    <IconButton onClick={onClickLearnHandler}
                                                disabled={props.pack && props.pack.cardsCount === 0}
                                    >
                                        <SchoolIcon/>
                                    </IconButton>
                                </>
                            }
                        </Typography>
                    </Box>
                </TableCell>
            </TableRow>
        </TableBody>
    );
};

