import React from 'react'
import Auth from './auth/Auth'
import {Route, useHistory} from 'react-router-dom'
import Callback from './components/Callback'

import App from './App'

const handleAuthentication = (props, auth) => {
    const location = props.location
    console.log({location})
    if (/access_token|id_token|error/.test(location.hash)) {
        auth.handleAuthentication(props)
    }
}

export default function MakeAuthRouting() {
    let history = useHistory()
    const auth = new Auth(history)
    return (
        <div>
            <Route
                path='/callback'
                render={props => {
                    handleAuthentication(props, auth)
                    return <Callback/>
                }}
            />
            <Route
                render={props => {
                    return <App {...props} auth={auth}/>
                }}
            />
        </div>
    )
}
