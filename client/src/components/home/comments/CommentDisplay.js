import React, { useState, useEffect } from "react";
import CommentCard from "./CommentCard";

const CommentDisplay = ({ comment, post, replyCm}) => {
  const [showRep, setShowRep] = useState([]);
  const [next, setNext] = useState(2);

  useEffect(() => {
    setShowRep(replyCm.slice(replyCm.length - next));
  }, [replyCm, next]);

  return (
    <div className="comment_display">
      <CommentCard comment={comment} post={post} commentId={comment._id}>
        <div className="comment_content_reply">
          {showRep.map((item, index) => item.reply && (
                <CommentCard
                  key={index}
                  comment={item}
                  post={post}
                  commentId={comment._id}
                />
              )
          )}

          {replyCm.length - next > 0 ? (
            <div className="text-info mt-2" style={{ cursor: "pointer", fontSize: "14px" }} onClick={() => setNext(next + 10)}>
              View more comments...
            </div>
          ) : (
            replyCm.length > 2 && (
              <div className="text-info mt-3"
                style={{ cursor: "pointer", fontSize: "14px" }}
                onClick={() => setNext(2)}
              >
                Hide comments...
              </div>
            )
          )}
        </div>
      </CommentCard>
    </div>
  );
};

export default CommentDisplay;
