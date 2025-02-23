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
      <h1>
        Place Visited:{" "}
        <span>
          {data.location}, {data.country}
        </span>
      </h1>
      <h2>
        Date of Visit: <span> {data.date_visited} </span>
      </h2>
      <h2
        className={`rating ${
          data.rating < 5 ? "low" : data.rating <= 7 ? "medium" : "High"
        }`}
      >
        {" "}
        Rating:<span> {data.rating}/10 </span>
      </h2>
      <h2>
        Is this on your favorite list:{" "}
        <span>
          {" "}
          {data.isFavorite === true ? "Yes" : "Not on favorite list"}
        </span>
      </h2>
      <h2>
        Additional Detail:<span> {data.additional_comments} </span>
      </h2>
      <button onClick={handleClick}>Home</button>
    </div>
  );
}
