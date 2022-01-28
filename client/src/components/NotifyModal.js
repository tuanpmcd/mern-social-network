import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import moment from 'moment'
import { isReadNotify, NOTIFY_TYPES, deleteAllNotifies } from '../redux/actions/notifyAction'

const NotifyModal = () => {
  const { auth, notify } = useSelector(state => state)
  const dispatch = useDispatch()

  const handleIsRead = (msg) => {
    dispatch(isReadNotify({ msg, auth }))
  }

  const handleSound = () => {
    dispatch({ type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound })
  }

  const handleDeleteAll = () => {
    const newArr = notify.data.filter(item => item.isRead === false)
    if (newArr.length === 0) return dispatch(deleteAllNotifies(auth.token))

    if (window.confirm(`You have ${newArr.length} unread notices. Are you sure you want to delete all?`)) {
      return dispatch(deleteAllNotifies(auth.token))
    }
  }

  return (
    <div style={{ minWidth: '300px' }}>
      <div className="d-flex justify-content-between align-items-center px-3 py-1 border-bottom">
        <h5 className='m-0 text-dark'>Notification</h5>
        {
          notify.sound
            ? <i className="fas fa-bell text-info"
              style={{ fontSize: '1rem', cursor: 'pointer' }}
              onClick={handleSound} />

            : <i className="fas fa-bell-slash text-info"
              style={{ fontSize: '1rem', cursor: 'pointer' }}
              onClick={handleSound} />
        }
      </div>
      {
        notify.data.length === 0 &&
        <div
          className="text-center"
          style={{ marginTop: "30px", color: "gray" }}
        >
          <h6 className="font-weight-bold">You have no notifications.</h6>
        </div>
      }

      <div style={{ maxHeight: '50vh', overflow: 'auto', paddingTop: "10px" }}>
        {
          notify.data.map((msg, index) => (
            <div key={index} className="px-2 mb-3 border-bottom" >
              <Link to={`${msg.url}`} className="d-flex text-dark justify-content-between align-items-center"
                onClick={() => handleIsRead(msg)}
              >

                <Avatar src={msg.user.avatar} size="big-avatar" />

                <div className="flex-fill ml-2">
                  <div>
                    <strong className="mr-1 text-info" style={{ fontSize: "14px" }}>
                      {msg.user.fullname}
                    </strong>
                    <span style={{ fontSize: "13px" }}>
                      {msg.text}
                    </span>
                  </div>
                  {msg.content && <small>{msg.content.slice(0, 20)}...</small>}
                </div>

                {/* {
                  msg.image &&
                  <div>
                    {
                      msg.image.match(/video/i)
                        ? <video src={msg.image} width="100%" />
                        : <Avatar src={msg.image} size="medium-avatar" />
                    }
                  </div>
                } */}

              </Link>
              <small className="text-muted d-flex justify-content-between px-2"
                style={{ fontSize: "12px" }}
              >
                {moment(msg.createdAt).fromNow()}
                {
                  !msg.isRead && <i className="fas fa-circle text-info" />
                }
              </small>
            </div>
          ))
        }

      </div>

      <div className="text-center text-info p-1 border-top" style={{ cursor: 'pointer' }}
        onClick={handleDeleteAll}>
        Delete All
      </div>

    </div>
  )
}

export default NotifyModal
