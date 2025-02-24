import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./pages.css";

export default function Details() {
  const { log_id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  function handleClick() {
    nav("/");
  }

  async function getLog() {
    try {
      const response = await axios.get(`http://localhost:3000/logs/${log_id}`);
      setData(response.data.log);
      setLoading(false);
      console.log(response.data.log);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getLog();
    console.log(data);
  }, [log_id]);

  if (loading) return <h1>Loading please wait</h1>;

  return (
    <div className="logDetail">
      <h2>Place Visited:</h2>{" "}
      <span>
        {data.location}, {data.country}
      </span>
      <h2>Date of Visit:</h2>
      <span> {data.date_visited} </span>
      <h2>Rating:</h2>{" "}
      <span
        className={`rating ${
          data.rating < 5 ? "low" : data.rating <= 7 ? "medium" : "high"
        }`}
      >
        {" "}
        {data.rating}/10{" "}
      </span>
      <h2>Status ? </h2>
      <span>
        {" "}
        {data.isFavorite === true ? "⭐ Favorite" : "❌ Not Favorite"}
      </span>
      <h2>Additional Detail:</h2>
      <span> {data.additional_comments} </span>
      <h2>Log Created at:</h2>
      <span>
        {" "}
        {new Date(data.createdAt).toDateString()} {" at "}
        {new Date(data.createdAt).toLocaleTimeString()}{" "}
      </span>
      <h2>Last Update:</h2>
      <span>
        {" "}
        {new Date(data.updatedAt).toDateString()} {" at "}
        {new Date(data.updatedAt).toLocaleTimeString()}{" "}
      </span>
      <br />
      <br />
      <button onClick={handleClick}>Home</button>
    </div>
  );
}
