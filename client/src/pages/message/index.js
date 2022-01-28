import React from 'react'
import LeftSide from '../../components/message/LeftSide'

const Message = () => {
  return (
    <div className="message d-flex mx-auto">

      <div className="col-md-4 p-2">
        <LeftSide />
      </div>

      <div className="col-md-8 px-0 border-left right_mess" >
        <div className="d-flex justify-content-center align-items-center flex-column h-100">
          <h4 className="text-info" style={{ fontSize: "16px" }}>
            Select a chat or start a new conversation
          </h4>
        </div>
      </div>
      
    </div>
  )
}

export default Message
