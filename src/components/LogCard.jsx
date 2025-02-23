import { Link } from "react-router-dom";
import "./components.css";

export default function LogCard({ log, onDelete, onFavorite }) {
  const {
    id,
    location,
    country,
    date_visited,
    rating,
    isFavorite,
    additional_comment,
  } = log;

  return (
    <div className="logCard">
      <h3>
        {location}, {country}
      </h3>
      <p>Date Visited: {date_visited}</p>
      <p>Rating: {rating}/10</p>

      {/* action buttons */}
      <div className="actionBtns">
        <button id="delete" onClick={() => onDelete(id)}>
          Delete
        </button>
        <button id="favorite" onClick={() => onFavorite(id)}>
          {isFavorite ? "Unfavorite" : "Favorite"}
        </button>
        <Link to={`/details/${id}`}>
          <button id="details">Details</button>
        </Link>
        <Link to={`/edit/${id}`}>
          <button id="edit">Edit</button>
        </Link>
      </div>
    </div>
  );
}
