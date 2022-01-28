import React from 'react'

const Icons = ({ setContent, content, theme }) => {
  const reactions = [
    '❤️', '😆', '😯', '😢', '😡', '👍', '👎', '😄',
    '😂', '😍', '😘', '😗', '😚', '😳', '😭', '😓',
    '😤', '🤤', '👻', '💀', '🤐', '😴', '😷', '😵'
  ]

  return (
    <div className="nav-item dropdown ml-3"
      style={{ opacity: 1, filter: theme ? 'invert(1)' : 'invert(0)' }}>

      <span className="nav-link position-relative" id="navbarDropdown"
        role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        😍
      </span>

      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <div className="reactions">
          {
            reactions.map(icon => (
              <span key={icon} onClick={() => setContent(content + icon)}>
                {icon}
              </span>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Icons
