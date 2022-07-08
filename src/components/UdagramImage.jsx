import * as React from 'react'
import {Card, Image} from 'semantic-ui-react'

export class UdagramImage extends React.PureComponent {

    render() {
        return (
            <Card fluid color="red">
                <Card.Content>
                    <Card.Header>{this.props.image.title}</Card.Header>
                    <Card.Description>{this.props.image.timestamp}</Card.Description>
                    {this.props.image.imageUrl && (
                        <Image src={this.props.image.imageUrl}/>
                    )}
                </Card.Content>
            </Card>
        )
    }
}
