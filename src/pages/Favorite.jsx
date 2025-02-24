import { useState, useEffect } from "react";
import LogCard from "../components/LogCard";
import axios from "axios";
import { Link } from "react-router-dom";
import "./pages.css";

export default function Favorite() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

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
    try {
      await axios.delete(`http://localhost:3000/logs/${log_id}`);

      setData((prevLogs) => prevLogs.filter((log) => log.log_id !== log_id));
    } catch (err) {
      console.error(err);
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

  if (loading) return <h1>Loading.....</h1>;

  return (
    <>
      <div className="favorites">
        {data.map((log) => (
          <LogCard
            key={log.log_id}
            log={log}
            onDelete={handleDelete}
            onFavorite={handleFavorite}
          />
        ))}
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
