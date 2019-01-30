import React from 'react'
import Message from './Message'

const MessageList = ({messages, toggleSelected, toggleStarred, toggleBody, markAsRead}) => {
  
  return (
    <div>
      {messages.map(({selected, subject, read, starred, labels, body, id}) => <Message 
        readState={read}
        selectedState={selected}
        starredState={starred}
        subject={subject}
        labels={labels}
        body={body}
        messageId={id}
        key={id}
        toggleSelected={toggleSelected}
        toggleStarred={toggleStarred}
        toggleBody={toggleBody}
        markAsRead={markAsRead}
      />)}
    </div>
  )
}

export default MessageList