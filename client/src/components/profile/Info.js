import React, { useState, useEffect } from "react";
import Avatar from "../Avatar";
import EditProfile from "./EditProfile";
import FollowBtn from "../FollowBtn";
import Followers from "./Followers";
import Following from "./Following";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Info = ({ id, auth, profile, dispatch }) => {
  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      const newData = profile.users.filter((u) => u._id === id);
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users]);

  useEffect(() => {
    if (showFollowers || showFollowing || onEdit) {
      dispatch({ type: GLOBALTYPES.MODAL, payload: true });
    } else {
      dispatch({ type: GLOBALTYPES.MODAL, payload: false });
    }
  }, [showFollowers, showFollowing, onEdit, dispatch]);

  return (
    <div className="info">
      {userData.map((user) => (
        <div
          className="info_container d-flex justify-content-around"
          key={user._id}
        >
          <div className="mt-3">
            <Avatar src={user.avatar} size="supper-avatar" />
          </div>

          <div className="info_content">
            <div className="info_content_title mt-3">
              <h4 className="m-0 font-weight-bold">
                {user.fullname}
                <small className="text-info">({user.username})</small>
              </h4>

              {user._id === auth.user._id ? (
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => setOnEdit(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <FollowBtn user={user} />
              )}
            </div>

            <div className="follow_btn mb-3">
              <span className="mr-2" onClick={() => setShowFollowers(true)}>
                {user.followers.length} Followers
              </span>
              <span onClick={() => setShowFollowing(true)}>
                {user.following.length} Following
              </span>
            </div>

            <p className="m-0 text-danger">
              <span className="text-dark font-weight-bold">Phone: </span>{" "}
              {user.mobile}
            </p>

            <p className="m-0 text-danger">
              <span className="text-dark font-weight-bold">Website: </span>
              <a href={user.website} target="_blank" rel="noreferrer">
                {user.website}
              </a>
            </p>

            <p className="m-0 text-danger">
              <span className="text-dark font-weight-bold">Address: </span>
              {user.address}
            </p>

            <p className="mb-2 text-danger">
              <span className="text-dark font-weight-bold">Email: </span>
              {user.email}
            </p>

            <p className="story">{user.story}</p>
          </div>

          {onEdit && <EditProfile setOnEdit={setOnEdit} />}

          {showFollowers && (
            <Followers
              users={user.followers}
              setShowFollowers={setShowFollowers}
            />
          )}
          {showFollowing && (
            <Following
              users={user.following}
              setShowFollowing={setShowFollowing}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Info;
