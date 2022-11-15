import React from 'react'

const Message = ({handleShow}) => {
  return (
    <div className='view-msg'>
        <p>No message from the Agent! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi consectetur neque ut magni ea accusantium odit aliquam suscipit consequatur perspiciatis quod vel corporis, at cupiditate ratione atque possimus laborum aspernatur.</p>
        <i className="fas fa-times" onClick={handleShow}></i>
    </div>
  )
}

export default Message