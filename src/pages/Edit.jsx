import EditForm from "../components/EditForm";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Edit() {
  const [loading, setLoading] = useState(null);
  const nav = useNavigate();
  const { log_id } = useParams();
  const [log, setLog] = useState(null);

  useEffect(() => {
    async function getLog() {
      try {
        const response = await axios.get(
          `http://localhost:3000/logs/${log_id}`
        );
        setLog(response.data.log);
      } catch (error) {
        console.error(error);
      }
    }
    getLog();
  }, [log_id]);

  async function onEdit(updatedLog) {
    setLoading(true);

    try {
      const response = await axios.patch(
        `http://localhost:3000/logs/${log_id}`,
        updatedLog
      );
      if (response.status === 200) {
        alert("Log has been updated");
        nav("/");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update the data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="editFormContainer">
      <h2 style={{ textAlign: "center", color: "navy" }}>Edit your Log</h2>
      {log ? <EditForm log={log} onEdit={onEdit} /> : "Loading log....."}
      {loading && <p>Editing Log......</p>}
    </div>
  );
}
