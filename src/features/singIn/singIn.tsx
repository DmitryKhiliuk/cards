import React from 'react';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import style from './SignIn.module.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';


export const SingIn = () => {
    return (
        <div className={style.loginBlock}>
            <Paper elevation={3} className={style.loginBlockForm}>
                <Typography variant={'h4'}>
                    SIGN IN
                </Typography>
                <form className={style.loginForm}>
                    <FormControl style={{width: '100%'}}>
                        <TextField label={'Email'}
                                   margin={'normal'}
                                   variant="standard"
                        />
                        <TextField label={'Password'}
                                   margin={'normal'}
                                   variant="standard"
                        />
                        <FormControlLabel label={'Remember me'} control={<Checkbox/>}/>
                        <Button variant={'text'} size={'small'} className={style.btnForgotPass}>
                            Forgot Password
                        </Button>
                        <Button type={'submit'} variant={'contained'} color={'primary'} style={{marginTop:'100px'}}>
                            Login
                        </Button>
                        <Typography variant={'subtitle2'} component={'div'} className={style.textQuestion}>
                            Don't have an account?
                        </Typography>
                        <Button variant={'text'} color={'primary'} >
                            Sign Up
                        </Button>
                    </FormControl>
                </form>
            </Paper>
        </div>
    );
};

