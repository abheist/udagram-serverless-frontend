import {apiEndpoint} from '../config'

export async function getGroups() {

    const groupsUrl = `${apiEndpoint}/groups`

    console.log(`Fetching groups from URL -> ${groupsUrl}`)

    const response = await fetch(groupsUrl)
    const result = await response.json()

    return result.items
}

export async function createGroup(newGroup) {

    const reply = await fetch(`${apiEndpoint}/groups`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newGroup.name,
            description: newGroup.description
        })
    })
    const result = await reply.json();
    return result.newItem
}

export async function deleteGroup(groupId) {
     await fetch(`${apiEndpoint}/groups/${groupId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: ''
    })
    return true
}
