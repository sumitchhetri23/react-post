import React,{useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AuthContext} from './Auth';
const AuthRoute = ({component: Component, ...rest}) =>{
    const {user} = useContext(AuthContext);

    return(
        <Route
            {...rest}
            render = {props => user ? <Redirect to="/" />: <Component {...props} />}
            />
    )
}

export default AuthRoute;