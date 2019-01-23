import React, { Component } from 'react'
import './App.css'
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import Navbar from './components/Navbar';

const API = 'http://localhost:8082/api/messages'

class App extends Component {
  state = {
    messages: []
  }

  async componentDidMount() {
    const response = await fetch(`${API}`)
    const messagesJson = await response.json()
    this.setState({messages: messagesJson})
  }

  toggleSelected = (messageId) => {
    let messagesList = this.state.messages
    let messageSingle = messagesList.find(message => messageId === Number(message.id))
    messageSingle.selected = !messageSingle.selected
    
    this.setState({messages : messagesList})
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

    await fetch(API, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: bodyJson
    })
    
    this.setState({messages : messagesList})
  }
  
  
  render() {
    return (
      <div className="App">
          <Navbar/>
        <div className="container">
          <Toolbar />
          <MessageList 
            messages={this.state.messages} 
            toggleSelected={this.toggleSelected}
            toggleStarred={this.toggleStarred}
          />
        </div>
      </div>
    );
  }
}

export default App;
