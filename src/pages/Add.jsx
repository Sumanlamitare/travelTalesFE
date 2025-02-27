import AddLogForm from "../components/AddForm";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Add() {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function handleAddLog(newLog) {
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/logs", newLog);

      if (response.status === 200) {
        alert("Log has been added.");
        nav("/");
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="addFormContainer">
      <h2 style={{ textAlign: "center", color: "green" }}>
        Add a New Travel Log
      </h2>
      <AddLogForm onAddLog={handleAddLog} />
      {loading && <p>Adding Log......</p>}
    </div>
  );
}
