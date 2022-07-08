import * as React from 'react'
import {Button, Form} from 'semantic-ui-react'
import {createImage, uploadFile} from '../api/images-api'

export class CreateImage extends React.PureComponent {
    state = {
        title: '',
        file: undefined,
        uploadState: undefined
    }

    handleTitleChange = (event) => {
        this.setState({title: event.target.value})
    }

    handleFileChange = (event) => {
        const files = event.target.files
        if (!files) return

        console.log('File change', files)
        this.setState({
            file: files[0]
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()

        try {
            if (!this.state.file) {
                alert("File should be selected!")
                return
            }

            this.setUploadState(undefined)
            const uploadInfo = await createImage({
                groupId: this.props.match.params.groupId,
                title: this.state.title
            })

            console.log('Created image', uploadInfo)

            this.setUploadState(undefined)
            await uploadFile(uploadInfo.uploadUrl, this.state.file)

            alert('Image was uploaded!')
        } catch (e) {
            alert('Could not upload an image: ' + e.message)
        } finally {
            this.setUploadState(undefined)
        }
    }

    setUploadState(uploadState) {
        this.setState({
            uploadState
        })
    }

    render() {
        return (
            <div>
                <h1>Upload new image</h1>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label>Title</label>
                        <input
                            placeholder="Image title"
                            value={this.state.title}
                            onChange={this.handleTitleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            placeholder="Image to upload"
                            onChange={this.handleFileChange}
                        />
                    </Form.Field>

                    {this.renderButton()}
                </Form>
            </div>
        )
    }

    renderButton() {

        return (
            <div>
                <p>Uploading image metadata</p>
                <p>Uploading File</p>
                <Button
                    type="submit"
                >
                    Upload
                </Button>
            </div>
        )
    }
}
