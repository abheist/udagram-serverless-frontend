import React from 'react'
import {GroupsList} from './components/GroupsList'
import {Link, Route, Router, Switch} from 'react-router-dom'
import {Grid, Menu, Segment} from 'semantic-ui-react'
import {ImagesList} from './components/ImagesList'
import {NotFound} from './components/NotFound'
import {CreateImage} from './components/CreateImage'
import {LogIn} from "./components/LogIn";
import {CreateGroup} from "./components/CreateGroup";

export default function App(props) {
    const handleLogin = () => {
        props.auth.login()
    }

    const handleLogout = () => {
        props.auth.logout()
    }


    const generateMenu = () => {
        return (<Menu>
            <Menu.Item name="home">
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Menu position='right'>{logInLogOutButton()}</Menu.Menu>
        </Menu>)
    }

    const logInLogOutButton = () => {
        if (props.auth.isAuthenticated()) {
            return (<Menu.Item name='logout' onClick={handleLogout}>
                Log Out
            </Menu.Item>)
        } else {
            return (<Menu.Item name='login' onClick={handleLogin}>
                Log In
            </Menu.Item>)
        }
    }

    const generateCurrentPage = () => {
        if (!props.auth.isAuthenticated()) {
            return <LogIn auth={props.auth}/>
        }

        return (<Switch>
            <Route exact path={`/images/:groupId`}><ImagesList {...props}/></Route>
            <Route exact path={`/images/:groupId/create`}><CreateImage {...props}/></Route>
            <Route exact path={`/groups/create`}><CreateGroup {...props}/></Route>
            <Route exact path=''><GroupsList {...props}/></Route>

            <Route component={NotFound}/>
        </Switch>)
    }

    return (<div>
        <Segment style={{padding: '8em 0em'}} vertical>
            <Grid container stackable verticalAlign='middle'>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Router history={props.history}>
                            {generateMenu()}

                            {generateCurrentPage()}
                        </Router>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    </div>)

}
