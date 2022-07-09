import React, {Component} from 'react'
import {GroupsList} from './components/GroupsList'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import {Grid, Menu, Segment} from 'semantic-ui-react'
import {ImagesList} from './components/ImagesList'
import {NotFound} from './components/NotFound'
import {CreateImage} from './components/CreateImage'
import {CreateGroup} from './components/CreateGroup'
import {LogIn} from "./components/LogIn";

export default class App extends Component {

    constructor(props) {
        super(props)

        this.handleLogin = this.handleLogin.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogin() {
        this.props.auth.login()
    }

    handleLogout() {
        this.props.auth.logout()
    }

    render() {
        return (
            <div>
                <Segment style={{padding: '8em 0em'}} vertical>
                    <Grid container stackable verticalAlign="middle">
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Router>
                                    {this.generateMenu()}

                                    {this.generateCurrentPage()}
                                </Router>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>
        )
    }

    generateMenu() {
        return (
            <Menu>
                <Menu.Item name="home">
                    <Link to="/">Home</Link>
                </Menu.Item>
            </Menu>
        )
    }

    generateCurrentPage() {
        if (!this.props.auth.isAuthenticated()) {
            return <LogIn auth={this.props.auth}/>
        }

        return (
            <Switch>
                <Route path="/groups/create" exact component={CreateGroup}/>

                <Route path="/images/:groupId" exact component={ImagesList}/>

                <Route path="/images/:groupId/create" exact component={CreateImage}/>

                <Route path="/" exact component={GroupsList}/>

                <Route component={NotFound}/>
            </Switch>
        )
    }
}
