import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import UserCard from "../UserCard";
import LoadingIcon from "../../images/loading.gif";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const { auth } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setUsers(res.data.users);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };

  return (
    <form className="search_form" onSubmit={handleSearch}>
      <input
        type="text"
        name="search"
        value={search}
        id="search"
        title="Enter to Search"
        onChange={(e) =>
          setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
        }
      />

      <div className="search_icon" style={{ opacity: search ? 0 : 0.5 }}>
        <span>Search...</span>
      </div>

      <div
        className="close_search"
        onClick={handleClose}
        style={{ opacity: search ? 1 : 0 }}
      >
        &times;
      </div>

      {!loading &&
        <button type="submit">
          <span className="material-icons mr-1 text-info">search</span>
        </button>
      }
      {loading && <img className="loading" src={LoadingIcon} alt="" />}

      <div className="users">
        {search &&
          users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              border="border"
              handleClose={handleClose}
            />
          ))}
      </div>
    </form>
  );
};

export default Search;
