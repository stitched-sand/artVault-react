import SearchBar from "../components/SearchBar";
import ArtworkCard from "../components/ArtworkCard";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Browse = () => {
  const [artworks, setArtworks] = useState([]);
  const [objectIDs, setObjectIDs] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  useEffect(() => {
    if (!query.trim()) {
      setObjectIDs([]);
      return;
    }

    const fetchObjectIDs = async () => {
      try {
        const response = await axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1.1/search?q=${encodeURIComponent(query)}&limit=6`,
        );

        const data = response.data;
        setObjectIDs(data.objectIDs ?? []);
      } catch (error) {
        console.error("Error fetching artwork IDs:", error);
      }
    };

    fetchObjectIDs();
  }, [query]);

  useEffect(() => {
    if (objectIDs.length === 0) {
      setArtworks([]);
      return;
    }

    const fetchArtworks = async () => {
      try {
        const responses = await Promise.all(
          objectIDs.map((id) =>
            axios.get(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
            ),
          ),
        );

        const artworksData = responses.map((response) => response.data);

        setArtworks(artworksData);
      } catch (error) {
        console.error("Error fetching artwork details:", error);
      }
    };

    fetchArtworks();
  }, [objectIDs]);

  return (
    <main>
      <section className="browse__hero">
        <div className="container browse__hero-content">
          <h1 className="header__title">Browse Collection</h1>
          <SearchBar />
        </div>
      </section>

      <section id="results">
        <div className="container">
          <div className="filter">
            <select id="sort-select">
              <option value="default">Sort Results</option>
              <option value="title-asc">Title A-Z</option>
              <option value="title-desc">Title Z-A</option>
              <option value="date-new">Newest First</option>
              <option value="date-old">Oldest First</option>
            </select>
          </div>

          <div className="artworks">
            {artworks.map((artwork) => (
              <ArtworkCard key={artwork.objectID} artwork={artwork} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Browse;
