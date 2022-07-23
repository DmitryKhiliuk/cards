import React from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import style from './SignIn.module.css'


export const SingIn = () => {
    return (
        <div className={style.loginBlock}>

            <Typography variant={'h4'}>
                SIGN IN
            </Typography>
            <form className={style.loginForm}>
                <FormControl>
                    <TextField label={'Email'}
                               margin={'normal'}
                               variant="standard"
                    />
                    <TextField label={'Password'}
                               margin={'normal'}
                               variant="standard"
                    />
                    <Button variant={'text'} size={'small'} style={{color: 'black'}}>
                        Forgot Password
                    </Button>
                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                        Login
                    </Button>
                    <Typography variant={'subtitle2'} component={'div'} style={{color: 'gray'}}>
                        Don't have an account?
                    </Typography>
                    <Button variant={'text'} color={'primary'}>
                        Sign Up
                    </Button>
                </FormControl>
            </form>
        </div>
    );
};

