import { useState } from "react";
import "./components.css";

export default function AddLogForm({ onAdd }) {
  const [formData, setFormData] = useState({
    location: "",
    country: "",
    date_visited: "NA",
    rating: "",
    isFavorite: false,
    additional_comments: "",
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value || "NA",
      }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAdd({
      ...formData,
      date_visited: formData.date_visited || "NA",
      additional_comments:
        formData.additional_comments ||
        "Additional detail not provided by the user",
    });
    console.log(formData);
  }

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit} className="addForm">
        <label htmlFor="location"> Location (city, state): </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter the location here"
          required
        />
        <label htmlFor="country"> Country: </label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Enter the country here"
          required
        />
        <label htmlFor="dateVisited"> Date of Visit: </label>
        <input
          type="date"
          name="date_visited"
          value={formData.date_visited !== "NA" ? formData.date_visited : ""}
          onChange={handleChange}
        />

        <label htmlFor="rating"> Rating: </label>
        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          required
        >
          <option value="">Select a rating</option>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <label htmlFor="isFavorite"> Add to favorite? </label>
        <input
          type="checkbox"
          name="isFavorite"
          checked={formData.isFavorite}
          onChange={handleChange}
        />
        <label htmlFor="additional_comments"> Additional Detail: </label>
        <textarea
          name="additional_comments"
          value={formData.additional_comments}
          onChange={handleChange}
          placeholder="Enter additional comments here (activities, places to go, etc.)"
        />
        <button type="submit">Add Log</button>
      </form>
    </div>
  );
}
