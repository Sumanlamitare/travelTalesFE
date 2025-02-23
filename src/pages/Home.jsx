import axios from "axios";
import { useEffect, useState } from "react";
import LogCard from "../components/LogCard";

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

  function handleDelete(id) {
    <h1>debug</h1>;
  }
  function handleFavorite(id) {
    <h1>debug</h1>;
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
    </div>
  );
}
