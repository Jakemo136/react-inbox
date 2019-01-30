import React, { Component } from 'react';

class Message extends Component {
  state = {
    showBody: false
  }
  toggleBody = () => {
    this.setState({showBody: !this.state.showBody})
  }
  render(){
  
  const {subject, readState, starredState, selectedState, labels, body, toggleSelected, messageId, toggleStarred, markAsRead} = this.props
  
  const style = this.state.showBody ? {} : {display: 'none'}

  return (
    <div className={("row message " + (readState ? 'read' : 'unread') + " " + (selectedState ? 'selected' : ''))}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={selectedState ? 'checked' : ''} onChange={e => toggleSelected(messageId)}/>
          </div>
          <div className="col-xs-2">
            <i className={("star fa fa-star" + (starredState ? '' : '-o'))} onClick={e => toggleStarred(messageId)}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11" onClick={e=>{e.preventDefault(); this.toggleBody(); markAsRead(messageId)}}>
      {labels.map((label, i)=> <span className="label label-warning" key={i}>{label}</span>)}
        <a href="/">
          {subject}
        </a>
      </div>
      <div className="row message-body" style={style}>
        <div className="col-xs-11 col-xs-offset-1">
          {body}
        </div>
      </div>
      
    </div> 
  )
  }
}
export default Message