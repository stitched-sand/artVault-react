import SearchBar from "../components/SearchBar";
import ArtworkCard from "../components/ArtworkCard";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const loadingStates = [
  "QUERYING MET ARCHIVE...",
  "Dusting off the frames...",
  "Removing 300 years of yellowed varnish...",
  "Convincing the digital night guard not to turn off the lights...",
  "Waiting for Dali's clocks to melt...",
];

const Browse = () => {
  const [artworks, setArtworks] = useState([]);
  const [objectIDs, setObjectIDs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const currentPage = Number(searchParams.get("page")) || 1;
  const [sortOption, setSortOption] = useState("default");
  const sortedArtworks = [...artworks].sort((a, b) => {
    if (sortOption === "title-asc") {
      return a.title.localeCompare(b.title);
    }
    if (sortOption === "title-desc") {
      return b.title.localeCompare(a.title);
    }
    if (sortOption === "date-new") {
      return b.objectBeginDate - a.objectBeginDate;
    }
    if (sortOption === "date-old") {
      return a.objectBeginDate - b.objectBeginDate;
    }
  });

  useEffect(() => {
    if (!query.trim()) {
      setObjectIDs([]);
      setIsLoading(false);
      return;
    }

    const fetchObjectIDs = async () => {
      setIsLoading(true);
      setLoadingIndex(0);
      setArtworks([]);
      const offset = (currentPage - 1) * 6;

      try {
        const response = await axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1.1/search?q=${encodeURIComponent(query)}&limit=6&offset=${offset}`,
        );

        const data = response.data;
        setObjectIDs(data.objectIDs ?? []);
      } catch (error) {
        console.error("Error fetching artwork IDs:", error);
        setIsLoading(false);
      }
    };

    fetchObjectIDs();
  }, [query, currentPage]);

  useEffect(() => {
    if (objectIDs.length === 0) {
      setArtworks([]);
      setIsLoading(false);
      return;
    }

    const fetchArtworks = async () => {
      const startTime = Date.now();
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
      } finally {
        const elapsedTime = Date.now() - startTime;
        const minimumLoadingTime = 2500;
        const remainingTime = minimumLoadingTime - elapsedTime;

        setTimeout(
          () => {
            setIsLoading(false);
          },
          Math.max(0, remainingTime),
        );
      }
    };

    fetchArtworks();
  }, [objectIDs]);

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const interval = setInterval(() => {
      setLoadingIndex((prevIndex) => (prevIndex + 1) % loadingStates.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <main>
      <section className="browse__hero">
        <div className="container browse__hero-content">
          <h1 className="header__title">Browse Collection</h1>
          <SearchBar
            isLoading={isLoading}
            loadingMessage={loadingStates[loadingIndex]}
          />
        </div>
      </section>

      <section id="results">
        <div className="container">
          <div className="filter">
            <select
              id="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Sort Results</option>
              <option value="title-asc">Title A-Z</option>
              <option value="title-desc">Title Z-A</option>
              <option value="date-new">Newest First</option>
              <option value="date-old">Oldest First</option>
            </select>
          </div>

          <div className="artworks">
            {sortedArtworks.map((artwork) => (
              <ArtworkCard key={artwork.objectID} artwork={artwork} />
            ))}
          </div>

          <div className="pagination">
            <button
              className="pagination__button"
              onClick={() =>
                setSearchParams({ q: query, page: String(currentPage - 1) })
              }
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              ←
            </button>

            <button
              className="pagination__button"
              onClick={() =>
                setSearchParams({ q: query, page: String(currentPage + 1) })
              }
              aria-label="Next page"
            >
              →
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Browse;
