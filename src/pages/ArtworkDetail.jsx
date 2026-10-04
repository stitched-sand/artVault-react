import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ArtworkDetail = () => {

const { id } = useParams();
const [artwork, setArtwork] = useState(null);

useEffect(() => {
  const fetchArtwork = async () => {
    try {
      const response = await axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
      );
      setArtwork(response.data);
    } catch (error) {
      console.error("Error fetching artwork details:", error);
    }
  }
  fetchArtwork();
}, [id]);

if(!artwork) {
  return(
    <main>
      <p>Loading artwork...</p>
    </main>
  )
}

  return (
    <main>
      <section className="container">
        <h1>{artwork.title}</h1>
        <p>{artwork.artistDisplayName}</p>
        <p>{artwork.objectDate}</p>
        <img src={artwork.primaryImage} alt={artwork.title} className="artwork-detail__img"/>
        <p>{artwork.medium}</p>
        <p>{artwork.dimensions}</p>
        <p>{artwork.creditLine}</p>
      </section>
    </main>
  );
};

export default ArtworkDetail;
