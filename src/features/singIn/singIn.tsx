import React, {ChangeEvent, useState} from 'react';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import style from './SignIn.module.css';
import s from '../../app/App.module.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import {useForm, Controller, SubmitHandler, useFormState} from 'react-hook-form';
import {emailValidation, passwordValidation} from "../../common/validation/validation";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../app/store";
import {Navigate} from 'react-router-dom';
import {CARDS, REC_PASSWORD, SING_UP} from "../../common/routes/routes";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {useNavigate} from "react-router-dom";
import {ErrorSnackbar} from "../../utils/ErrorSnackbar/ErrorSnackbar";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {loginTC} from "./auth-reducer";

import {setRecoveryPasswordSuccessAC} from "../recoveryPassword/recoveryPassword-reducer";

type SingInFormType = {
    email: string;
    password: string;
    rememberMe: boolean;
}

export const SingIn = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const fogotPassHandler=()=>{
        dispatch(setRecoveryPasswordSuccessAC(false))
        navigate(REC_PASSWORD, {replace: true})
    }



    const {handleSubmit, control, reset} = useForm<SingInFormType>({
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        }
    });

    const onSubmit: SubmitHandler<SingInFormType> = (data) => {
        dispatch(loginTC(data));
        reset()
        reset({
            email: '',
            password: '',
            rememberMe: false
        })
    };

    if (isLoggedIn) {
        return <Navigate to={CARDS}/>
    }
    return (
        <div className={s.block}>
            <ErrorSnackbar/>
            <Paper elevation={3} className={s.loginBlockForm}>
                <Typography variant={'h4'}>
                    SIGN IN
                </Typography>
                <form className={s.loginForm}>
                    <FormControl style={{width: '100%'}}>
                        <Controller
                            control={control}
                            name={'email'}
                            rules={emailValidation}
                            render={({field, fieldState}) => (
                                <TextField label={'Email'}
                                           variant="standard"
                                           margin={'normal'}
                                           helperText={fieldState.error ? fieldState.error.message : null}
                                           onChange={(e: ChangeEvent<HTMLInputElement>) => field.onChange(e)}
                                           value={field.value}
                                           onBlur={field.onBlur}
                                           error={!!fieldState.error}

                                />
                            )}
                        />
                        <Controller
                            control={control}
                            rules={passwordValidation}
                            name={'password'}
                            render={({field, fieldState}) => (
                                <TextField label={'Password'}
                                           helperText={fieldState.error ? fieldState.error.message : null}
                                           variant="standard"
                                           onChange={(e: ChangeEvent<HTMLInputElement>) => field.onChange(e)}
                                           value={field.value}
                                           onBlur={field.onBlur}
                                           margin={'normal'}
                                           error={!!fieldState.error}
                                           type={showPassword ? "text" : "password"}
                                           InputProps={{
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
                        <FormControlLabel
                            label={'Remember me'}
                            control={
                                <Controller
                                    name={'rememberMe'}
                                    control={control}
                                    render={({field}) => (
                                        <Checkbox
                                            checked={field.value}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => field.onChange(e)}
                                        />
                                    )}
                                />
                            }
                        />
                        <Button variant={'text'} size={'small'} className={style.btnForgotPass}
                                onClick={fogotPassHandler
                            // () => {
                            //         navigate(REC_PASSWORD, {replace: true})
                            //     }
                        }>
                            Forgot Password
                        </Button>
                        <Button type={'submit'} variant={'contained'} color={'primary'} style={{marginTop: '80px'}}
                                onClick={handleSubmit(onSubmit)}>
                            Login
                        </Button>
                        <Typography variant={'subtitle2'} component={'div'} className={style.textQuestion}>
                            Don't have an account?
                        </Typography>
                        <Button variant={'text'} color={'primary'}
                                onClick={() => {
                                    navigate(SING_UP, {replace: true})
                                }}>
                            Sign Up
                        </Button>
                    </FormControl>
                </form>
            </Paper>
        </div>
    );
};

