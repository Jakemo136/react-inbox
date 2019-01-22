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

  render() {
    return (
      <div className="App">
          <Navbar/>
        <div className="container">
          <Toolbar />
          <MessageList messages={this.state.messages}/>
        </div>
      </div>
    );
  }
}

export default App;
