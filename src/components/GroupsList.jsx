import * as React from 'react'
import {Group} from './Group'
import {getGroups} from '../api/groups-api'
import {Button, Card, Divider} from 'semantic-ui-react'

export class GroupsList extends React.PureComponent {
    state = {
        groups: []
    }

    handleCreateGroup = () => {
        this.props.history.push(`/groups/create`)
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
                        return <Group key={group.id} group={group}/>
                    })}
                </Card.Group>
            </div>
        )
    }
}
