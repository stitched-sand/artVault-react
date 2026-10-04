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
  <main className="artwork-detail">
    <section className="container artwork-detail__container">
      <div className="artwork-detail__main">
        <div className="artwork-detail__image-wrapper">
          {artwork.primaryImage ? (
            <img
              src={artwork.primaryImage}
              alt={artwork.title}
              className="artwork-detail__img"
            />
          ) : (
            <div className="artwork-detail__no-image">
              Image unavailable
            </div>
          )}
        </div>

        <div className="artwork-detail__intro">
          <p className="artwork-detail__eyebrow">
            {artwork.department}
          </p>

          <h1 className="artwork-detail__title">
            {artwork.title}
          </h1>

          <p className="artwork-detail__artist">
            {artwork.artistDisplayName}
          </p>

          <p className="artwork-detail__date">
            {artwork.objectDate}
          </p>
        </div>
      </div>

      <section className="artwork-detail__metadata">
        <h2>Artwork Details</h2>

        <div className="artwork-detail__metadata-grid">
          {artwork.medium && (
            <div className="artwork-detail__metadata-item">
              <h3>Medium</h3>
              <p>{artwork.medium}</p>
            </div>
          )}

          {artwork.dimensions && (
            <div className="artwork-detail__metadata-item">
              <h3>Dimensions</h3>
              <p>{artwork.dimensions}</p>
            </div>
          )}

          {artwork.objectDate && (
            <div className="artwork-detail__metadata-item">
              <h3>Date</h3>
              <p>{artwork.objectDate}</p>
            </div>
          )}

          {artwork.artistDisplayName && (
            <div className="artwork-detail__metadata-item">
              <h3>Artist</h3>
              <p>{artwork.artistDisplayName}</p>
            </div>
          )}

          {artwork.objectName && (
            <div className="artwork-detail__metadata-item">
              <h3>Object</h3>
              <p>{artwork.objectName}</p>
            </div>
          )}

          {artwork.culture && (
            <div className="artwork-detail__metadata-item">
              <h3>Culture</h3>
              <p>{artwork.culture}</p>
            </div>
          )}

          {artwork.classification && (
            <div className="artwork-detail__metadata-item">
              <h3>Classification</h3>
              <p>{artwork.classification}</p>
            </div>
          )}

          {artwork.accessionNumber && (
            <div className="artwork-detail__metadata-item">
              <h3>Accession Number</h3>
              <p>{artwork.accessionNumber}</p>
            </div>
          )}

          {artwork.creditLine && (
            <div className="artwork-detail__metadata-item">
              <h3>Credit Line</h3>
              <p>{artwork.creditLine}</p>
            </div>
          )}
        </div>
      </section>
    </section>
  </main>
);

};

export default ArtworkDetail;
