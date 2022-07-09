import * as React from 'react'
import {Button, Card} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export class Group extends React.Component {

    handleRemove = () => {
        this.props.removeGroup(this.props.group.id)
    }

    render() {
        return (
            <Card>
                <Card.Content>
                    <Card.Header>
                        <Link to={`/images/${this.props.group.id}`}>{this.props.group.name}</Link>
                    </Card.Header>
                    <Card.Description>{this.props.group.description}</Card.Description>
                    <Button onClick={this.handleRemove}>Remove</Button>
                </Card.Content>
            </Card>
        )
    }
}
