import React, { Component } from 'react'
import './App.css'
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import Navbar from './components/Navbar'
import Compose from './components/Compose'

const API = 'http://localhost:8082/api/messages'

class App extends Component {
  state = {
    messages: [],
    selected: 'fa fa-minus-square-o',
    composeView: false
  }

  async componentDidMount() {
    const response = await fetch(`${API}`)
    const messagesJson = await response.json()
    this.setState({messages: messagesJson})
  }

  selectButtonState = () => {
    let newState = this.state
    let selectedNum = newState.messages.filter(message => message.selected === true)
    
    if (selectedNum.length === 0) {
      newState.selected = 'fa fa-square-o'
      this.setState({selected: newState.selected})
    }
    if (selectedNum.length === newState.messages.length) {
      newState.selected = 'fa fa-check-square-o'
      this.setState({selected: newState.selected})
    }
    if (selectedNum.length > 0 && selectedNum.length !== newState.messages.length) {
      newState.selected = 'fa fa-minus-square-o'
      this.setState({selected: newState.selected})
    }
  }

  toggleSelectAll = async () => {
    const messagesList = this.state.messages
    let selectedVal
    let messageIds = messagesList.filter(message => message.selected === false).map(message => message.id)
    
    if (messageIds.length === 0) {
      messageIds = messagesList.map(message=>message.id)
    }    
    
    const allMessages = messagesList.map(item => item.selected).every(item => item)
    
    if (!allMessages) {
      messagesList.map(message => (message.selected = true))
      selectedVal = true
    }
    else {
      messagesList.map(message => (message.selected = false))
      selectedVal = false
    }

    const bodyJson = JSON.stringify({
      "messageIds": messageIds,
      "command": "select",
      "selected": selectedVal
    })
    const response = await fetch(API, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: bodyJson
    })
    const responseJson = await response.json()
    this.setState({messages : responseJson})
  }

  toggleSelected = async (messageId) => {
    let messagesList = this.state.messages
    let messageSingle = messagesList.find(message => messageId === Number(message.id))
    messageSingle.selected = !messageSingle.selected

    const bodyJson = JSON.stringify({
      "messageIds": [messageId],
      "command": "select",
      "selected": messageSingle.selected
    })

    const response = await fetch(API, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: bodyJson
    })
    const responseJson = await response.json()
    this.selectButtonState()
    this.setState({messages : responseJson})
  }

  toggleStarred = async (messageId) => {
    let messagesList = this.state.messages
    let messageSingle = messagesList.find(message => messageId === Number(message.id))
    messageSingle.starred = !messageSingle.starred

    const bodyJson = JSON.stringify({
      "messageIds": [messageId],
      "command": "star",
      "star": messageSingle.starred
    })

    const response = await fetch(API, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: bodyJson
    })
    const responseJson = await response.json()
    this.setState({messages : responseJson})
  }
  
  markAsRead = async () => {
    const newState = this.state.messages
    const selectedMsgs = newState.filter(message => message.selected && !message.read)
    const msgIds = selectedMsgs.map(message=>message.id)
    
    if (msgIds.length === 0) {
      return
    }
    const bodyJson = JSON.stringify({
      "messageIds": msgIds,
      "command": "read",
      "read": true
    })
    const response = await fetch(API, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: bodyJson
    })
    const responseJson = await response.json()
    
    this.setState({messages : responseJson})
  }

  markAsUnread = async () => {
    const newState = this.state.messages
    const selectedMsgs = newState.filter(message => message.selected && message.read)
    const msgIds = selectedMsgs.map(message=>message.id)
    
    if (msgIds.length === 0) {
      return
    }
    const bodyJson = JSON.stringify({
      "messageIds": msgIds,
      "command": "read",
      "read": false
    })
    const response = await fetch(API, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: bodyJson
    })
    const responseJson = await response.json()
    this.setState({messages : responseJson})
  }

  addLabel = async (e) => {
    const label = e.target.value
    const newState = this.state.messages
    const messages = newState.filter(message=>message.selected)
    const msgIds = messages.map(message=>message.id)
    const labels = messages.map(message=>message.labels)
    
    if (labels.includes(label)){
      return
    }
    
    const bodyJson = JSON.stringify({
      "messageIds": msgIds,
      "command": "addLabel",
      "label": label
    })
    
    const response = await fetch(API, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: bodyJson
    })

    const responseJson = await response.json()
    this.setState({messages : responseJson})
  }

  removeLabel = async (e) => {
    const label = e.target.value
    const newState = this.state.messages
    const messages = newState.filter(message=>message.selected)
    const msgIds = messages.map(message=>message.id)
    const labels = messages.map(message=>message.labels)
    
    if (labels.includes(label)){
      return
    }
    
    const bodyJson = JSON.stringify({
      "messageIds": msgIds,
      "command": "removeLabel",
      "label": label
    })
    
    const response = await fetch(API, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: bodyJson
    })

    const responseJson = await response.json()
    this.setState({messages : responseJson})
  }

  deleteMessage = async (e) => {
    const newState = this.state.messages
    const selectedMsgs = newState.filter(message => message.selected)
    const msgIds = selectedMsgs.map(message=>message.id)

    const bodyJson = JSON.stringify({
      "messageIds": msgIds,
      "command": "delete"
    })
    const response = await fetch(API, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: bodyJson
    })

    const responseJson = await response.json()
    this.setState({messages : responseJson})
  }

  toggleCompose = (e) => {
    this.setState({composeView: !this.state.composeView})
  }


  render() {
    return (
      <div className="App">
          <Navbar/>
        <div className="container">
          <Toolbar 
            messages={this.state.messages}
            selectButtonState={this.state.selected} 
            toggleSelectAll={this.toggleSelectAll}
            markAsRead={this.markAsRead}
            markAsUnread={this.markAsUnread} 
            addLabel={this.addLabel}
            removeLabel={this.removeLabel}
            deleteMessage={this.deleteMessage} 
            toggleCompose={this.toggleCompose} />
          {this.state.composeView ? <Compose /> : ''}
          <MessageList 
            messages={this.state.messages} 
            toggleSelected={this.toggleSelected}
            toggleStarred={this.toggleStarred} />
        </div>
      </div>
    );
  }
}

export default App;
