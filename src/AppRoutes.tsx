import { NotFound } from 'components/Common';
import { HomeLayout } from 'components/Layout';
import { AuthContext } from 'context/AuthContext';
import LoginPage from 'features/auth/pages/LoginPage';
import React, { useContext } from 'react'
import { Navigate, Outlet, Route, RouteProps, Routes as Router } from 'react-router-dom';

type Props = {}

export function PrivateRoute(props: RouteProps) {
    //Check if user is logged in
    //If not logged, redirect to login page
    const { authenticated } = useContext(AuthContext);
    if (!authenticated) return <Navigate to='/auth/login' replace/>

    return <Outlet />
}

const Routes = (props: Props) => {
    return (
        <Router>
            <Route path='/auth/login' element={<LoginPage />} />
            <Route element={<PrivateRoute />} >
                <Route path='/home' element={<HomeLayout />} />
            </Route>
            <Route path='*' element={<NotFound />}></Route>
        </Router>
    )
}

export default Routes