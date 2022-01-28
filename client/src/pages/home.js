import React, { useEffect } from "react";

import Status from "../components/home/Status";
import Posts from "../components/home/Posts";
import RightSideBar from "../components/home/RightSideBar";

import { useSelector } from "react-redux";
import LoadIcon from "../images/loading.gif";

let scroll = 0;

const Home = () => {
  const { homePosts } = useSelector((state) => state);

  window.addEventListener("scroll", () => {
    if (window.location.pathname === "/") {
      scroll = window.pageYOffset;
      return scroll;
    }
  });

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: scroll, behavior: "smooth" });
    }, 100);
  }, []);

  return (
    <div className="home row mx-0 ">

      <div className="col-md-8">
        <Status />

        {homePosts.loading ? (
          <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
        ) : homePosts.result === 0 && homePosts.posts.length === 0 ? (
          <div
            className="text-center"
            style={{ marginTop: "60px", color: "gray", minHeight: "120px" }}
          >
            <h4 className="font-weight-bold text-info">No More Posts</h4>
            <h6 className="font-weight-light">
              Follow more people to see more posts in your News Feed.
            </h6>
          </div>
        ) : (
          <>
            <Posts />
            <div
              className="text-center"
              style={{ marginTop: "40px", color: "gray", minHeight: "120px" }}
            >
              <h4 className="font-weight-bold text-info">No More Posts</h4>
              <h6 className="font-weight-light">
                Follow more people to see more posts in your News Feed.
              </h6>
            </div>
          </>
        )}
      </div>
      <div className="col-md-4 sidebar">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
