import { Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import {  useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions, selectCurrentUser } from '../authSlice';
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react';
import { useAppSelector } from 'app/hooks';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
  } = useForm({
      mode: 'onChange',
      defaultValues: {
          username: '',
          password: '',
      },
  })

  const currentUser = useAppSelector(selectCurrentUser);

  const handleLogin = async (data: any) => {
    try {
      dispatch(authActions.login({
        username: 'kminchelle',
        password: '0lelplR',
      }))

    } catch (error) {
      if (error instanceof Error) {
          console.log(error)
      } else {
          console.log('Unexpected error', error)
      }
    }
}

useEffect(() => {
  if (currentUser && localStorage.getItem('access_token')) {
    navigate('/home')
  }
}, [currentUser, navigate]);


  return (
    <Grid container spacing={2}>
      <Paper elevation={6} sx={styles.paperStyle}>
        <Grid sx={{ align: 'center' }}>
          <h2>Sign In</h2>
        </Grid>
        <Controller 
          name="username"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField 
              label='Username'
              placeholder='Enter username'
              variant="outlined" 
              fullWidth 
              required 
              onChange={(event: any) => {
                onChange(event.target.value.toString())
              }}
            />
          )}
        />

        <Controller 
          name="password"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField 
              label='Password'
              placeholder='Enter password'
              variant="outlined" 
              fullWidth 
              required 
              sx={{ mt: 4 }}
              onChange={(event: any) => {
                onChange(event.target.value.toString())
              }}
            />
          )}
        />

        <FormControlLabel
          control={
            <Checkbox
                name="checkedB"
                color="primary"
            />
          }
          label="Remember me"
         />
        <Button type='submit' color='primary' variant="contained" sx={styles.btnStyle} fullWidth onClick={handleSubmit(handleLogin)}>Sign in</Button>
        <Typography >
          <Link href="#" >
            Forgot password ?
          </Link>
        </Typography>
        <Typography > Do you have an account ?
          <Link href="#" >
            Sign Up 
          </Link>
        </Typography>
    </Paper>
</Grid>
  )
}

const styles = {
  paperStyle: {
    padding: '60px',
    height: '70vh',
    margin:"20px auto"
  },
  avatarStyle: {
    backgroundColor: '#1976d2',
  },
  btnStyle: {
    margin:'8px 0'
  ,}
}