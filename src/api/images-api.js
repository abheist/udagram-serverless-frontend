import {apiEndpoint} from '../config'

export async function getImages(groupId) {
    console.log('Fetching images')
    const response = await fetch(`${apiEndpoint}/groups/${groupId}/images`)
    const result = await response.json()

    return result.items
}

export async function createImage(newImage) {

    const reply = await fetch(
        `${apiEndpoint}/groups/${newImage.groupId}/images`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: newImage.title
            })
        }
    )

    return await reply.json()
}

export async function uploadFile(uploadUrl, file) {
    await fetch(uploadUrl, {
        method: "PUT",
        body: file
    })
}