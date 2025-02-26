import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./components.css";
import { fetchCountries } from "../utilities/FetchCountries";

export default function EditForm({ log, onEdit }) {
  console.log(log.date_visited);
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    log_id: log.log_id,
    location: log.location,
    country: log.country,
    date_visited: log.date_visited,
    rating: log.rating,
    isFavorite: log.isFavorite,
    additional_comments: log.additional_comments,
  });
  const nav = useNavigate();

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
        [name]: value || "",
      }));
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    onEdit(formData);
  }
  function handleCancel() {
    nav("/");
  }

  useEffect(() => {
    async function loadCountries() {
      const countryList = await fetchCountries();
      setCountries(countryList);
    }
    loadCountries();
  }, []);

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit} className="addForm">
        <label htmlFor="id"> Log ID: </label>
        <input
          type="text"
          name="location"
          placeholder={formData.log_id}
          readOnly
        />
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
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        >
          <option value="">{formData.country}</option>
          {countries.map((country) => (
            <option key={country.name} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        <label htmlFor="dateVisited"> Date of Visit: </label>
        <input
          type="date"
          name="date_visited"
          value={formData.date_visited}
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
            <option key={i + 1} value={i + 1} defaultValue={formData.rating}>
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
        <button type="submit">Update </button>
        <button onClick={handleCancel} type="button">
          Cancel
        </button>
      </form>
    </div>
  );
}
