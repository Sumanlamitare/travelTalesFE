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

  

  return (
    <div className="logCard">
      <h3>
        {location}, {country}
      </h3>

      {/* action buttons */}
      <div className="actionBtns">
        <button
          id="delete"
          onClick={() => onDelete(log_id)}
          //   style={{ backgroundColor: "#B22222" }}
        >
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
