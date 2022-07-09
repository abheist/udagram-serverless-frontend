import * as React from 'react'
import {Button, Form} from 'semantic-ui-react'
import {createGroup} from '../api/groups-api'

export class CreateGroup extends React.PureComponent {
    state = {
        name: '',
        description: '',
        uploadingGroup: false
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    handleDescriptionChange = (event) => {
        this.setState({description: event.target.value})
    }

    handleSubmit = async (event) => {
        event.preventDefault()

        try {
            if (!this.state.name || !this.state.description) {
                alert('Name and description should be provided')
                return
            }

            this.setUploadState(true)
            const group = await createGroup({
                name: this.state.name,
                description: this.state.description
            })

            console.log('Created description', group)

            alert('Group was created!')
            this.props.history.push(``)
        } catch (e) {
            alert('Could not upload an image: ' + e.message)
        } finally {
            this.setUploadState(false)
        }
    }

    setUploadState(uploadingGroup) {
        this.setState({
            uploadingGroup
        })
    }

    render() {
        return (
            <div>
                <h1>Upload new group</h1>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label>Name</label>
                        <input
                            placeholder="Group name"
                            value={this.state.name}
                            onChange={this.handleNameChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <input
                            placeholder="Group description"
                            value={this.state.description}
                            onChange={this.handleDescriptionChange}
                        />
                    </Form.Field>
                    {this.renderButton()}
                </Form>
            </div>
        )
    }

    renderButton() {
        return (
            <Button loading={this.state.uploadingGroup} type="submit">
                Create
            </Button>
        )
    }
}
