import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./pages.css";

export default function Details() {
  const { log_id } = useParams();
  const [data, setData] = useState();
  const [detail, setDetail] = useState([]);
  const [detailLoad, setDetailLoad] = useState(true);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  function handleClick() {
    nav("/");
  }

  async function getLog() {
    try {
      const response = await axios.get(`http://localhost:3000/logs/${log_id}`);
      setData(response.data.log);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function getAdditionalDetail(country) {
    if (!country) return; // Prevents API call with undefined
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${country.toLowerCase()}?fullText=true`
      );
      const result = await response.json();
      setDetail(result);
    } catch (error) {
      console.error(error);
    } finally {
      setDetailLoad(false);
    }
  }
  useEffect(() => {
    getLog();
  }, [log_id]);
  useEffect(() => {
    if (data?.country) {
      getAdditionalDetail(data.country);
    }
  }, [data]);

  if (loading && detailLoad) return <h1>Loading please wait</h1>;

  return (
    <div className="details" style={{ display: "flex", gap: "20px" }}>
      <div className="logDetail">
        <h1>Log Details</h1>
        <table
          border="1"
          cellPadding="10"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <tbody>
            <tr>
              <th>Log ID</th>
              <td>{data.log_id}</td>
            </tr>
            <tr>
              <th>Place Visited</th>
              <td>
                {data.location}, {data.country}
              </td>
            </tr>
            <tr>
              <th>Date of Visit</th>
              <td>{data.date_visited}</td>
            </tr>
            <tr>
              <th>Rating</th>
              <td
                className={`rating ${
                  data.rating < 5 ? "low" : data.rating <= 7 ? "medium" : "high"
                }`}
              >
                {data.rating}/10
              </td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{data.isFavorite ? "⭐ Favorite" : "❌ Not Favorite"}</td>
            </tr>
            <tr>
              <th>Additional Detail</th>
              <td>{data.additional_comments}</td>
            </tr>
            <tr>
              <th>Log Created At</th>
              <td>
                {new Date(data.createdAt).toDateString()} at{" "}
                {new Date(data.createdAt).toLocaleTimeString()}
              </td>
            </tr>
            <tr>
              <th>Last Update</th>
              <td>
                {new Date(data.updatedAt).toDateString()} at{" "}
                {new Date(data.updatedAt).toLocaleTimeString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="btn">
        <button className="dbtn" onClick={handleClick}>
          Home
        </button>
      </div>

      <div className="additionalDetails" style={{ padding: "10px" }}>
        <h1>Additional Detail for {data.country}</h1>
        <img
          className="flag"
          src={detail[0]?.flags.png}
          alt="Flag"
          style={{ width: "150px", display: "block", margin: "0 auto" }}
        />
        <br />
        <table
          border="1"
          cellPadding="10"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <tbody>
            <tr>
              <th>Coat of Arms</th>
              <td>
                <img
                  src={detail[0]?.coatOfArms.png}
                  alt="Coat of Arms"
                  style={{ width: "100px", height: "100px" }}
                />
              </td>
            </tr>
            <tr>
              <th>Capital</th>
              <td>{detail[0]?.capital}</td>
            </tr>
            <tr>
              <th>Bordered by</th>
              <td>
                {detail[0]?.borders ? detail[0].borders.join(", ") : "NA"}
              </td>
            </tr>
            <tr>
              <th>Currency</th>
              <td>
                {detail[0]?.currencies &&
                  Object.values(detail[0].currencies)[0]?.name}
              </td>
            </tr>
            <tr>
              <th>Region & Subregion</th>
              <td>
                {detail[0]?.region} / {detail[0]?.subregion}
              </td>
            </tr>
            <tr>
              <th>Time Zone</th>
              <td>
                {detail[0]?.timezones.length > 1
                  ? detail[0]?.timezones.join(", ")
                  : detail[0]?.timezones}
              </td>
            </tr>
            <tr>
              <th>Population</th>
              <td>{detail[0]?.population.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
        {/* <button className="dbtn" onClick={handleClick}>
          Home
        </button> */}
      </div>
    </div>
  );
}
