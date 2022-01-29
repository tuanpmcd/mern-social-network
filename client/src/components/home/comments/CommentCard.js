import React, { useState, useEffect } from "react";
import Avatar from "../../Avatar";
import { Link } from "react-router-dom";
import moment from "moment";

import LikeButton from "../../LikeButton";
import { useSelector, useDispatch } from "react-redux";
import CommentMenu from "./CommentMenu";
import {
  updateComment,
  likeComment,
  unLikeComment,
} from "../../../redux/actions/commentAction";
import InputComment from "../InputComment";

const CommentCard = ({ children, comment, post, commentId }) => {
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);

  const [onEdit, setOnEdit] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const [onReply, setOnReply] = useState(false);

  useEffect(() => {
    setContent(comment.content);
    setIsLike(false);
    setOnReply(false);
    if (comment.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [comment, auth.user._id]);

  const handleUpdate = () => {
    if (comment.content !== content) {
      dispatch(updateComment({ comment, post, content, auth }));
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };

  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);

    setLoadLike(true);
    await dispatch(likeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false);

    setLoadLike(true);
    await dispatch(unLikeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleReply = () => {
    if (onReply) return setOnReply(false);
    setOnReply({ ...comment, commentId });
  };

  const styleCard = {
    opacity: comment._id ? 1 : 0.4,
    pointerEvents: comment._id ? "inherit" : "none",
  };

  return (
    <div className="comment_card my-2" style={styleCard}>
      <Link to={`/profile/${comment.user._id}`} className="d-flex text-dark">
        <Avatar src={comment.user.avatar} size="small-avatar" />
        <h6
          className="mx-1 font-weight-bold text-info"
          style={{ transform: "translateY(4px)", fontSize: "14px" }}
        >
          {comment.user.fullname}
        </h6>
      </Link>

      <div className="comment_content" style={{ border: onEdit ? "1px solid #17a2b8" : "" }} >
        <div className="flex-fill"
          style={{ filter: theme ? "invert(1)" : "invert(0)", color: theme ? "white" : "#111" }}
        >
          {onEdit
            ? <textarea autofocus rows="2" value={content} onChange={(e) => setContent(e.target.value)} />
            : (
              <div>
                {comment.tag && comment.tag._id !== comment.user._id && (
                  <Link to={`/profile/${comment.tag._id}`} className="mr-1 text-info">
                    @{comment.tag.fullname}
                  </Link>
                )}
                <span style={{fontSize: "14px"}}>
                  {content.length < 90
                    ? content
                    : readMore
                      ? content + " "
                      : content.slice(0, 90) + "..."}
                </span>
                {content.length > 90 && (
                  <span
                    className="readMore text-info"
                    style={{ fontSize: "13px" }}
                    onClick={() => setReadMore(!readMore)}
                  >
                    {readMore ? "Less more" : "Read more"}
                  </span>
                )}
              </div>
            )}

          <div style={{ cursor: "pointer" }}>
            {onEdit
              ? ""
              : (
                <>
                  <small className="text-muted mr-3">
                    {moment(comment.createdAt).fromNow()}
                  </small>
                  <small className="font-weight-bold mr-3" style={{ fontSize: "12px", opacity: "0.8" }}>
                    {comment.likes.length} {comment.likes.length > 1 ? " Likes" : " Like"}
                  </small>
                </>
              )}

            {onEdit ? (
              <>
                <small className="font-weight-bold text-danger mr-3" onClick={() => setOnEdit(false)}>
                  Cancel
                </small>
                <small className="font-weight-bold text-info mr-3" onClick={handleUpdate}>
                  Update
                </small>
              </>
            ) : (
              <small
                className="font-weight-bold mr-3"
                style={{ fontSize: "12px", opacity: "0.8", color: onReply ? "red" : "" }}
                onClick={handleReply}
              >
                {onReply ? "Cancel" : "Reply"}
              </small>
            )}
          </div>
        </div>

        <div
          className="d-flex align-items-center mx-2"
          style={{ cursor: "pointer" }}
        >
          <CommentMenu post={post} comment={comment} onReply={onReply} setOnEdit={setOnEdit} />
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
        </div>
      </div>

      {onReply && (
        <InputComment post={post} comment={comment} onReply={onReply} setOnReply={setOnReply}>
          <Link to={`/profile/${onReply.user._id}`} className="mr-2 text-info" style={{ fontSize: "13px" }}>
            {comment.user._id === auth.user._id ? "" : `@${onReply.user.fullname}:`}
          </Link>
        </InputComment>
      )}

      {children}
    </div>
  );
};

export default CommentCard;
