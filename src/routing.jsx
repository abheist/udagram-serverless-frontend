import React from 'react'
import Auth from './auth/Auth'
import {Route, Router} from 'react-router-dom'
import { createBrowserHistory } from "history";

import App from './App'
import Callback from "./components/Callback";

const history = createBrowserHistory();

const auth = new Auth(history)

const handleAuthentication = (props) => {
    const location = props.location
    if (/access_token|id_token|error/.test(location.hash)) {
        auth.handleAuthentication()
    }
}

export const makeAuthRouting = () => {
    return (
        <Router history={history}>
            <div>
                <Route
                    path='/callback'
                    render={props => {
                        handleAuthentication(props)
                        return <Callback/>
                    }}
                />
                <Route
                    render={props => {
                        return <App auth={auth} {...props} />
                    }}
                />
            </div>
        </Router>
    )
}
