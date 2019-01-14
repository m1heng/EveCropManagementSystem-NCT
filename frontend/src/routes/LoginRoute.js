import React from "react";
import { Route, Redirect } from "react-router-dom";
import { authProvider } from "providers/authProvider";

export const LoginRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            authProvider.isLoggedIn() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{ pathname: "/login", state: { from: props.location } }}
                />
            )
        }
    />
);

export const CropMangeRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            authProvider.isDirector() || authProvider.isAdmin() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{ pathname: "/login", state: { from: props.location } }}
                />
            )
        }
    />
);

export const DirectorRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            authProvider.isDirector() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{ pathname: "/login", state: { from: props.location } }}
                />
            )
        }
    />
);

export const HRRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            authProvider.isHR() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{ pathname: "/login", state: { from: props.location } }}
                />
            )
        }
    />
);

export const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            authProvider.isAdmin() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{ pathname: "/login", state: { from: props.location } }}
                />
            )
        }
    />
);
