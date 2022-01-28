import React from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserCard = ({
  children,
  user,
  border,
  handleClose,
  setShowFollowers,
  setShowFollowing,
  msg,
}) => {
  const { theme } = useSelector((state) => state);

  const handleCloseAll = () => {
    if (handleClose) handleClose();
    if (setShowFollowers) setShowFollowers(false);
    if (setShowFollowing) setShowFollowing(false);
  };

  const showMsg = (user) => {
    return (
      <>
        <div style={{ filter: theme ? "invert(1)" : "invert(0)", fontSize: "13px", maxHeight: "20px", overflow: "hidden", color: "#000", marginTop: "5px", maxWidth: "150px" }}>
          {/* {user.text} */}
          {
            user.text.length > 20 ? user.text.slice(0, 20) + "..." : user.text
          }
        </div>
        {user.media.length > 0 && (
          <div style={{fontSize: "15px"}} className="p-0">
            <i className="fas fa-image text-info" />
          </div>
        )}

        {user.call && (
          <span className="material-icons text-info">
            {user.call.times === 0
              ? user.call.video
                ? "videocam_off"
                : "phone_disabled"
              : user.call.video
                ? "video_camera_front"
                : "call"}
          </span>
        )}
      </>
    );
  };

  return (
    <div
      className={`d-flex p-2 align-items-center justify-content-between w-100 ${border}`}
    >
      <Link
        to={`/profile/${user._id}`}
        onClick={handleCloseAll}
        className="d-flex align-items-center"
      >
        <Avatar src={user.avatar} size="big-avatar" />
        <div className="ml-2">
          <small>
            <h6 className="m-0 text-info" style={{fontSize: "14px"}}>
              {user.fullname}
            </h6>
            <span className="text-dark">
              {msg ? showMsg(user) : user.username}
            </span>
          </small>
        </div>
      </Link>

      {children}
    </div>
  );
};

export default UserCard;
