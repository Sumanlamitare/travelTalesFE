import { Link } from "react-router-dom";
import "./components.css";

export default function LogCard({ log, onDelete, onFavorite }) {
  const {
    log_id,
    location,
    country,
    date_visited,
    rating,
    isFavorite,
    additional_comment,
  } = log;

  const formattedDate = date_visited
    ? !isNaN(new Date(date_visited).getTime()) // Check if it's a valid date
      ? new Date(date_visited).toISOString().split("T")[0]
      : "Date not provided"
    : "Date not available"; // Fallback message if no date is provided

  return (
    <div className="logCard">
      <h3>
        {location}, {country}
      </h3>
      <p>Date Visited: {formattedDate}</p>
      <p>Rating: {rating}/10</p>

      {/* action buttons */}
      <div className="actionBtns">
        <button id="delete" onClick={() => onDelete(log_id)}>
          Delete
        </button>
        <button id="favorite" onClick={() => onFavorite(log_id)}>
          {isFavorite ? "Unfavorite" : "Favorite"}
        </button>
        <Link to={`/details/${log_id}`}>
          <button id="details">Details</button>
        </Link>
        <Link to={`/edit/${log_id}`}>
          <button id="edit">Edit</button>
        </Link>
      </div>
    </div>
  );
}
