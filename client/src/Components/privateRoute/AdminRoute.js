import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from "../Auth";


function AdminRoute({ component: Component, ...rest }) {
  const AuthContext = useAuth();

    return(
        <Route {...rest} 
          render={props =>
            AuthContext ? (
              <Component {...props} />
            ) : (
              <Redirect 
                to={{ pathname: "/login", state: { referer: props.location } }} 
              />            
            )
          }
        />
      );
    }
    export default AdminRoute;
    