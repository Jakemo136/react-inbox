import React from 'react';

const Message = ({subject, readState, starredState, selectedState, labels, body}) => {

  const selectedMessage = (selectedState, readState) => {
    
    let classNameText = ""

    if (selectedState) {
      if (readState) {
        classNameText="row message unread selected"
      } 
        classNameText="row message selected"
      }
    else if (!selectedState) {
      if (readState) {
        classNameText="row message unread"
      } 
        classNameText="row message"
      }
    return classNameText
  }

  return (
    <div className={selectedMessage}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={(selectedState ? 'checked' : '')}/>
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