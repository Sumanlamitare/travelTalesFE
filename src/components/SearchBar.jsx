import "./components.css";
export default function Search({ searchQuery, setSearchQuery }) {
  function handleChange(e) {
    setSearchQuery(e.target.value);
  }
  function clearSearch() {
    setSearchQuery("");
  }
  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Enter Location or Country to filter the Logs"
        value={searchQuery}
        onChange={handleChange}
      />
      <button onClick={clearSearch}>Clear</button>
    </div>
  );
}
