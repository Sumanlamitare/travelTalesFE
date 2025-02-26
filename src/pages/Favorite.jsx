import { useState, useEffect } from "react";
import LogCard from "../components/LogCard";
import axios from "axios";
import { Link } from "react-router-dom";
import "./pages.css";
import Search from "../components/SearchBar";

export default function Favorite() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  async function getFavorites() {
    try {
      let response = await axios.get("http://localhost:3000/logs/favorites");

      setData(response.data.logs);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(log_id) {
    const resp = confirm("Are you sure you want to delete this log?");

    if (resp === true) {
      try {
        await axios.delete(`http://localhost:3000/logs/${log_id}`);

        setLogs((prevLogs) => prevLogs.filter((log) => log.log_id !== log_id));
      } catch (err) {
        console.error(err);
      }
    } else {
      return;
    }
  }
  async function handleFavorite(log_id) {
    try {
      const toUpdate = data.find((log) => log.log_id === log_id);
      if (!toUpdate) return;

      const isFavoriteStatus = !toUpdate.isFavorite;

      await axios.patch(`http://localhost:3000/logs/${log_id}`, {
        isFavorite: isFavoriteStatus,
      });

      setData((prevLogs) =>
        prevLogs.map((log) =>
          log.log_id === log_id ? { ...log, isFavorite: isFavoriteStatus } : log
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFavorites();
  }, []);

  const filteredLogs = data?.filter(
    (log) =>
      log.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <h1>Loading.....</h1>;

  return (
    <>
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      ></Search>
      <div className="favorites">
        {filteredLogs.length > 0 ? (
          filteredLogs.map((log) => (
            <LogCard
              key={log._id}
              log={log}
              onDelete={handleDelete}
              onFavorite={handleFavorite}
            />
          ))
        ) : (
          <p>No logs found.</p>
        )}
      </div>
      <br />
      <br />
      <div className="btnContainerFav">
        <Link to={"/"}>
          <button className="homeBtnFav">Home</button>
        </Link>
      </div>
    </>
  );
}
