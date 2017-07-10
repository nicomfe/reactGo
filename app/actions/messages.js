import * as types from '../types'
import { messagesService } from '../services'
import { messageArray } from '../schemas/messageSchema'

export function dismissMessage() {
  return { type: types.DISMISS_MESSAGE }
}

export const getAll = () => ({
  types: types.GET_ALL_MESSAGES,
  meta: {
    fetch: messagesService().getAll,
    normalize: messageArray,
  },
})

export default { dismissMessage, getAll }
