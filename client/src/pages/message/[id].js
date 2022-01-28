import React from 'react'
import LeftSide from '../../components/message/LeftSide'
import RightSide from '../../components/message/RightSide'

const Conversation = () => {
  return (
    <div className="message d-flex mx-auto">

      <div className="col-md-4 p-2 left_mess">
        <LeftSide />
      </div>

      <div className="col-md-8 px-1 d-flex flex-column justify-content-between border-left">
        <RightSide />
      </div>
      
    </div>
  )
}

export default Conversation
