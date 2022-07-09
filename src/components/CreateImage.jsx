import * as React from 'react'
import {useState} from 'react'
import {Button, Form} from 'semantic-ui-react'
import {createImage, uploadFile} from '../api/images-api'
import {useParams} from "react-router-dom";

export function CreateImage(props) {
    let initialState = {
        title: '',
        file: undefined,
        uploadState: undefined
    }
    const [image, setImage] = useState({...initialState})
    const {groupId} = useParams()

    const handleFileChange = (event) => {
        const files = event.target.files
        if (!files) return

        console.log('File change', files)
        setImage({
            ...image,
            file: files[0]
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            if (!image.file) {
                alert("File should be selected!")
                return
            }

            setImage({...initialState})
            const uploadInfo = await createImage({
                groupId: groupId,
                title: image.title
            })

            console.log('Created image', uploadInfo)

            setImage({...initialState})
            await uploadFile(uploadInfo.uploadUrl, image.file)

            alert('Image was uploaded!')
            props.history.push(`/images/${groupId}`)
        } catch (e) {
            alert('Could not upload an image: ' + e.message)
        } finally {
            setImage({...initialState})
        }
    }

    return (
        <div>
            <h1>Upload new image</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Title</label>
                    <input
                        placeholder="Image title"
                        value={image.title}
                        onChange={(e) => setImage({...image, title: e.target.value})}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        placeholder="Image to upload"
                        onChange={handleFileChange}
                    />
                </Form.Field>

                <div>
                    <p>Uploading image metadata</p>
                    <p>Uploading File</p>
                    <Button
                        type="submit"
                    >
                        Upload
                    </Button>
                </div>
            </Form>
        </div>
    )
}
