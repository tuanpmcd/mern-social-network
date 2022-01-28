import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../../redux/actions/commentAction";

const CommentMenu = ({ post, comment, onReply, setOnEdit }) => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleRemove = () => {
    if (post.user._id === auth.user._id || comment.user._id === auth.user._id) { //Fix 
      dispatch(deleteComment({ post, auth, comment, socket }));
    }
  };

  const MenuItem = () => {
    return (
      <>
        <div className="dropdown-item" onClick={() => setOnEdit(true)}>
          <span className="material-icons mr-1 text-info">create</span> Edit
        </div>
        <div className="dropdown-item" onClick={handleRemove}>
          <span className="material-icons mr-1 text-info">delete_outline</span> Remove
        </div>
      </>
    );
  };

  return (
    <div className="menu">
      {(post.user._id === auth.user._id ||
        comment.user._id === auth.user._id) && (
          <div className="nav-item dropdown">
            <span style={{ display: onReply ? "none" : "" }} className="material-icons" id="moreLink" data-toggle="dropdown">
              more_vert
            </span>

            <div className="dropdown-menu" aria-labelledby="moreLink">
              {post.user._id === auth.user._id ? (
                comment.user._id === auth.user._id ? (
                  MenuItem()
                ) : (
                  <div className="dropdown-item" onClick={handleRemove}>
                    <span className="material-icons mr-1 text-info">delete_outline</span> Remove
                  </div>
                )
              ) : (
                comment.user._id === auth.user._id && MenuItem()
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default CommentMenu;
