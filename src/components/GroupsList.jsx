import * as React from 'react'
import {Group} from './Group'
import {deleteGroup, getGroups} from '../api/groups-api'
import {Button, Card, Divider} from 'semantic-ui-react'

export class GroupsList extends React.PureComponent {
    state = {
        groups: []
    }

    handleCreateGroup = () => {
        this.props.history.push(`/groups/create`)
    }

    handleRemoveGroup = (groupId) => {
        console.log({groupId})
        deleteGroup(groupId).then(response => {
            let newState = this.state.groups.filter(group => group.id !== groupId)
            this.setState({groups: [...newState]})
        })
    }

    async componentDidMount() {
        try {
            const groups = await getGroups()
            this.setState({
                groups
            })
        } catch (e) {
            alert(`Failed to fetch groups: ${e.message}`)
        }
    }

    render() {
        return (
            <div>
                <h1>Groups</h1>

                <Button
                    primary
                    size="huge"
                    className="add-button"
                    onClick={this.handleCreateGroup}
                >
                    Create new group
                </Button>

                <Divider clearing/>

                <Card.Group>
                    {this.state.groups && this.state.groups.map(group => {
                        return <Group key={group.id} group={group} removeGroup={this.handleRemoveGroup}/>
                    })}
                </Card.Group>
            </div>
        )
    }
}
