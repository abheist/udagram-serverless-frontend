import * as React from 'react'
import {useEffect, useState} from 'react'
import {getImages} from '../api/images-api'
import {Button, Card, Divider} from 'semantic-ui-react'
import {UdagramImage} from './UdagramImage'
import {Link, useParams} from "react-router-dom";

export function ImagesList(props) {
    const [images, setImages] = useState([]);
    let {groupId} = useParams();


    useEffect(() => {
        try {
            getImages(groupId).then(images =>
                setImages(images)
            )
        } catch (e) {
            alert(`Failed to fetch images for group : ${e.message}`)
        }
    }, [groupId])


    return (
        <div>
            <h1>Images</h1>

            <Link to={`/images/${groupId}/create`}>
                <Button
                    primary
                    size="huge"
                    className="add-button"
                >
                    Upload new image
                </Button></Link>

            <Divider clearing/>

            <Card.Group>
                {images.length > 0 ? images.map(image => {
                    return <UdagramImage key={image.imageId} image={image}/>
                }) : <div>No Images, you can upload images</div>}
            </Card.Group>
        </div>
    )
}
