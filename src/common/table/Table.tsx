import React from 'react'
import style from "../table/Table.module.css";
import {TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {CardPacksType} from "../../features/CardsPack/api-CardsPack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {Delete, Edit} from "@material-ui/icons";

type TablePropsType = {
    tableCell: string[],
    tableData: any,
    removeData: (id: string) => void,
    editData: (id: string) => void,
}

export const Table = (props: TablePropsType) => {
    return (
        <TableContainer  className={style.table}>
            <TableHead className={style.tableHeader}>
                <TableRow style={{width: '100%'}}>
                    {props.tableCell.map((cell) => {
                        return <TableCell align="left">{cell}</TableCell>
                    })}
                </TableRow>
            </TableHead>

            <TableBody style={{width: '100%'}}>
                {props.tableData.map((data: CardPacksType) => (
                    <TableRow hover key={data._id}>
                        {/*Name*/}
                        <TableCell>
                            <Box sx={{alignItems: 'center', display: 'flex', width: '200px'}}>
                                <Typography color="textPrimary" variant="body1">
                                    {data.name}
                                </Typography>
                            </Box>
                        </TableCell>
                        {/*CardsCount*/}
                        <TableCell>
                            <Box sx={{alignItems: 'center', display: 'flex', width: '100px'}}>
                                <Typography color="textPrimary" variant="body1">
                                    {data.cardsCount}
                                </Typography>
                            </Box>
                        </TableCell>
                        {/*updated*/}
                        <TableCell>
                            <Box sx={{alignItems: 'center', display: 'flex', width: '200px'}}>
                                <Typography color="textPrimary" variant="body1">
                                    {data.updated}
                                </Typography>
                            </Box>
                        </TableCell>
                        {/*user_name*/}
                        <TableCell>
                            <Box sx={{ display: 'flex', width: '200px'}}>
                                <Typography color="textPrimary" variant="body1">
                                    {data.user_name}
                                </Typography>
                            </Box>
                        </TableCell>
                        {/*Action*/}
                        <TableCell>
                            <Box sx={{alignItems: 'center', display: 'flex', width: '150px'}}>
                                <Typography color="textPrimary" variant="body1">
                                    {<IconButton onClick={() => props.removeData(data._id)}>
                                        <Delete/>
                                    </IconButton>
                                    }
                                    {<IconButton onClick={() => props.editData(data._id)}>
                                        <Edit/>
                                    </IconButton>
                                    }
                                </Typography>
                            </Box>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </TableContainer>
    )
}