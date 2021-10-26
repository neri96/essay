import { Route, Redirect } from 'react-router';

import { getUserData } from "../../localStorage/userData";

const ProtectedRoute = ({ component: Component, props, ...options }: any) => {
    const isAuth = getUserData();

    return (
        <Route 
            { ...options }
            render={(props) => 
                isAuth ? <Component {...props} /> : <Redirect to='/auth' />
            }
        />
    )
}

export default ProtectedRoute;