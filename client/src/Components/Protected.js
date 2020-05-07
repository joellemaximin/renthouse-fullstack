import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from "./Auth";


function Protected({ component: Component, ...rest }) {
    const authTokens = useAuth();
 
    return(
      <Route 
        {...rest}
        render={props =>
            authTokens ? (
            <Component {...props} />
            ) : (
            <Redirect to="/login" />
            )
        }
    
        />
        );
    }
    
export default Protected;

