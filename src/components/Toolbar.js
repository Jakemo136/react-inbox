import React from 'react';

const Toolbar = ({selectButtonState, toggleSelectAll, markAsRead, markAsUnread, messages, addLabel, removeLabel, deleteMessage, toggleCompose}) => {
const unreadCount = messages.filter(message => !message.read).length
const selectedCount = messages.filter(message => message.selected).length

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{unreadCount}</span>
          unread message{unreadCount !== 1 ? 's' : ''}
        </p>
    
        <a className="btn btn-danger" href="/" onClick={e=>{
          e.preventDefault()
          toggleCompose()}}>
          <i className="fa fa-plus"></i>
        </a>
    
        <button className="btn btn-default" onClick={e=>toggleSelectAll()}>
          <i className={selectButtonState}></i>
        </button>
    
        <button className="btn btn-default" 
          onClick={e=>markAsRead()} 
          disabled={selectedCount === 0 ? 'disabled' : ''}>Mark As Read</button>
    
        <button className="btn btn-default" 
          onClick={e=>markAsUnread()} 
          disabled={selectedCount === 0 ? 'disabled' : ''}>Mark As Unread</button>
    
        <select className="form-control label-select" 
          onChange={e=>{addLabel(e); e.target.selectedIndex = 0}} 
          disabled={selectedCount === 0 ? 'disabled' : ''}>
          <option >Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>
    
        <select className="form-control label-select" 
          onChange={e=>{removeLabel(e); e.target.selectedIndex = 0}} 
          disabled={selectedCount === 0 ? 'disabled' : ''}>
          <option >Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>
    
        <button className="btn btn-default" 
          onClick={e=>deleteMessage()} 
          disabled={selectedCount === 0 ? 'disabled' : ''} >
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  )
}

export default Toolbar