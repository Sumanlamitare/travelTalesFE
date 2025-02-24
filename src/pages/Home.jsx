import axios from "axios";
import { useEffect, useState } from "react";
import LogCard from "../components/LogCard";
import { Link } from "react-router-dom";

export default function Home() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getLogs() {
    try {
      const response = await axios.get("http://localhost:3000/logs");
      setLogs(response.data.logs);
      setLoading(false);
    } catch (err) {
      console.error("Error Fetching logs:", err.message);
    }
  }

  async function handleDelete(log_id) {
    try {
      await axios.delete(`http://localhost:3000/logs/${log_id}`);

      setLogs((prevLogs) => prevLogs.filter((log) => log.log_id !== log_id));
    } catch (err) {
      console.error(err);
    }
  }
  async function handleFavorite(log_id) {
    try {
      const toUpdate = logs.find((log) => log.log_id === log_id);
      if (!toUpdate) return;

      const isFavoriteStatus = !toUpdate.isFavorite;

      await axios.patch(`http://localhost:3000/logs/${log_id}`, {
        isFavorite: isFavoriteStatus,
      });

      setLogs((prevLogs) =>
        prevLogs.map((log) =>
          log.log_id === log_id ? { ...log, isFavorite: isFavoriteStatus } : log
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getLogs();
  }, []);

  if (loading) {
    return <div>Loading please wait.....</div>;
  }

  return (
    <div>
      <div className="logList">
        {logs.map((log) => (
          <LogCard
            key={log.log_id}
            log={log}
            onDelete={handleDelete}
            onFavorite={handleFavorite}
          />
        ))}
      </div>
      <div className="addBtnContainer">
        <Link to={"/add"}>
          <button id="addBtn">Add Logs</button>
        </Link>
      </div>
    </div>
  );
}
