import { GroupModel } from '../types/GroupModel'
import { apiEndpoint } from '../config'
import { GroupUploadInfo } from '../types/GroupUploadInfo'

export async function getGroups(): Promise<GroupModel[]> {

  const groupsUrl = `${apiEndpoint}/groups`

  console.log(`Fetching groups from URL -> ${groupsUrl}`)

  const response = await fetch(groupsUrl)
  const result = await response.json()

  return result.items
}

export async function createGroup(newGroup: GroupUploadInfo): Promise<GroupModel> {

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
