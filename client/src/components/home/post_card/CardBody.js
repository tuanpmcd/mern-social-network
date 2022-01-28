import React, { useState } from "react";
import Carousel from "../../Carousel";

const CardBody = ({ post, theme }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <div className="card_body">
      <div
        className="card_body-content"
        style={{
          filter: theme ? "invert(1)" : "invert(0)",
          color: theme ? "white" : "#111",
        }}
      >
        <span>
          {post.content.length < 80
            ? post.content
            : readMore
            ? post.content
            : post.content.slice(0, 80) + "..."}
        </span>
        {post.content.length > 80 && (
          <span
            className="readMore text-info"
            onClick={() => setReadMore(!readMore)}
          >
            {readMore ? " Less more" : " Read more"}
          </span>
        )}
      </div>
      {post.images.length > 0 && (
        <Carousel images={post.images} id={post._id} />
      )}
    </div>
  );
};

export default CardBody;
