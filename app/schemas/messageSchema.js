import { schema } from 'normalizr'

export const message = new schema.Entity('message')
export const messageArray = new schema.Array(message)

message.define({ recipient: new schema.Entity('twitterUser', {}, { idAttribute: 'id_str' }) })
message.define({ sender: new schema.Entity('twitterUser', {}, { idAttribute: 'id_str' }) })
