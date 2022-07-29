import React, {useState} from 'react';
import s from '../../app/App.module.css';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from "@mui/material/ButtonGroup";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import {AppDispatch, AppRootStateType} from "../../app/store";
import {CHECK_EMAIL, SING_IN} from "../../common/routes/routes";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {ErrorSnackbar} from "../../utils/ErrorSnackbar/ErrorSnackbar";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {newPasswordTC, setNewPasswordSuccessAC} from "./newPassword-reducer";
import {Navigate} from "react-router-dom";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import {passwordValidation} from "../../common/validation/validation";

interface IFormInput {
    email: string
    password: string
    rememberMe: boolean
}

const defaultValues = {
    password: '',
};

export const NewPassword = () => {
    const {token} = useParams<{ token: string }>();
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()
    const methods = useForm<IFormInput>({defaultValues: defaultValues, mode: "onBlur"});
    const {handleSubmit, reset, control, formState: {isValid}} = methods;
    const onSubmit = (data: IFormInput) => {
        dispatch(setNewPasswordSuccessAC(false))
        dispatch(newPasswordTC(data.password, token))
        // console.log(data, token)
        reset()
    };
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const status = useSelector<AppRootStateType, string>((state) => state.app.status);
    const newPassSucces = useSelector<AppRootStateType, boolean>(state => state.newPass.success)
    if (newPassSucces) {
        return <Navigate to={SING_IN} replace={true}/>
    }
    if (status === 'loading') {
        return (<Box sx={{display: 'flex'}} className={s.loginBlock}>
                <CircularProgress/>
            </Box>
        );
    }
    return (
        <div className={s.block}>
            <ErrorSnackbar/>
            <Paper elevation={3} className={s.loginBlockForm}>
                <Typography variant={'h4'}>
                    Create new password
                </Typography>
                <form className={s.loginForm}>
                    <FormControl style={{width: '100%'}}>
                        {/*//Password*/}
                        <Controller
                            name={'password'}
                            control={control}
                            rules={passwordValidation}
                            render={({
                                         field: {onChange, value, onBlur},
                                         fieldState: {error},

                                     }) => (
                                <TextField label={'Password'}
                                           helperText={error ? error.message : null}
                                           size="medium"
                                           error={!!error}
                                           onChange={onChange}
                                           value={value}
                                           fullWidth
                                           variant="standard"
                                           required={true}
                                           onBlur={onBlur}
                                           type={showPassword ? "text" : "password"}
                                           InputProps={{ // <-- This is where the toggle button is added.
                                               endAdornment: (
                                                   <InputAdornment position="end">
                                                       <IconButton
                                                           aria-label="toggle password visibility"
                                                           onClick={handleClickShowPassword}
                                                           onMouseDown={handleMouseDownPassword}
                                                       >
                                                           {showPassword ? <Visibility/> : <VisibilityOff/>}
                                                       </IconButton>
                                                   </InputAdornment>
                                               )
                                           }}
                                />
                            )}
                        />

                        <Typography variant={'subtitle1'}>
                            Create new password and we will send you further instructions to email
                        </Typography>

                        <ButtonGroup disableElevation variant="contained" color="primary" style={{
                            marginTop: '100px',
                            display: 'flex', justifyContent: 'space-around'
                        }}>
                            <Button onClick={handleSubmit(onSubmit)} variant={"contained"}
                                    disabled={!isValid} style={{
                                width: '100%'
                            }}>
                                Create new password
                            </Button>
                        </ButtonGroup>
                    </FormControl>
                </form>
            </Paper>
        </div>
    );
};


