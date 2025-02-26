import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { handleAddLog } from "../pages/Add";
import "./components.css";
import { fetchCountries } from "../utilities/FetchCountries";

export default function AddLogForm({ onAddLog }) {
  // console.log(onAddLog);
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    location: "",
    country: "",
    date_visited: "NA",
    rating: "",
    isFavorite: false,
    additional_comments: "",
  });
  const nav = useNavigate();

  useEffect(() => {
    async function loadCountries() {
      const countryList = await fetchCountries();
      setCountries(countryList);
    }
    loadCountries();
  }, []);

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
  function handleCancel() {
    nav("/");
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(typeof onAddLog);
    if (typeof onAddLog === "function") {
      onAddLog({
        ...formData,
        date_visited: formData.date_visited || "NA",
        additional_comments:
          formData.additional_comments ||
          "Additional detail not provided by the user",
      });
    } else {
      console.error("onAddLog is not a function");
    }

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
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        >
          <option value="">Select country</option>
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
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}
