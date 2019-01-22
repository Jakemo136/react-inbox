import React from 'react';

const Message = ({subject, readState, starredState, selectedState, labels, body, toggleSelected}) => {


  return (
    <div className={("row message " + (readState ? 'read' : 'unread') + " " + (selectedState ? 'selected' : ''))}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={selectedState ? 'checked' : ''} onChange={e => toggleSelected()}/>
          </div>
          <div className="col-xs-2">
            <i className={("star fa fa-star" + (starredState ? '' : '-o'))}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        <a href="/">
          {subject}
        </a>
      </div>
    </div> 
  )
}

export default Message