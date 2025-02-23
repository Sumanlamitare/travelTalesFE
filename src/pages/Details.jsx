import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Details() {
  const { log_id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  async function getLog() {
    try {
      const response = await axios.get(`http://localhost:3000/logs/${log_id}`);
      setData(response.data.log);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getLog();
    console.log(data);
  }, [log_id]);

  return (
    <div className="logDetail">
      <h1>
        {data.location}, {data.country}
      </h1>
    </div>
  );
}
