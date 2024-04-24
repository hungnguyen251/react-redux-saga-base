import { Avatar, Button, Grid } from '@mui/material'
import { useAppDispatch } from 'app/hooks'
import { authActions } from 'features/auth/authSlice'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';

type HomeLayoutProps = {}

// eslint-disable-next-line no-empty-pattern
export function HomeLayout({}: HomeLayoutProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(authActions.logout())
    navigate('/auth/login')
  }

  return (
    <Grid>
        <Button onClick={handleLogout}><Avatar><LogoutIcon /></Avatar></Button>
    </Grid>
  )
}