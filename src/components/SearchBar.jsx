import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ isLoading, loadingMessage }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    navigate(`/browse?q=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <div className="search">
      <div className="search__wrapper">
        <form className="search__form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="search__input"
            id="site-search"
            name="q"
            placeholder="Search artist, object, medium, period..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />

          <span className="search__cursor"></span>

          <button className="search__button" type="submit">
            Search
          </button>
        </form>
      </div>

      <p className="search__status">
        <span className="status__text">
          {isLoading && <span className="loading-spinner"></span>}
          {isLoading ? loadingMessage : "READY"}
        </span>
      </p>
    </div>
  );
};

export default SearchBar;
