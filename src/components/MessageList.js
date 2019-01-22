import React from 'react'
import Message from './Message'

const MessageList = ({messages}) => {
  console.log(messages)
  return (
    <div>
      {messages.map(({selected, subject, read, starred, labels, body, id}) => <Message 
        readState={read}
        selectedState={selected}
        starredState={starred}
        subject={subject}
        labels={labels}
        body={body}
        key={id}
      />)}
    </div>
  )
}

export default MessageList