import { Link } from "react-router-dom";
import { useState } from "react";

const ArtworkCard = ({ artwork }) => {
  const [imageError, setImageError] = useState(false);
  const imageUrl = artwork.primaryImageSmall;  

  return (
    <Link to={`/artwork/${artwork.objectID}`} className="artwork">
     {imageUrl && !imageError ? (
      <img
      src = {imageUrl}
      alt= {artwork.title}
      className="artwork__img"
      onError={() => setImageError(true)}
      />
     ) : (
      <div className="artwork__no-image">
        <span>IMAGE UNAVAILABLE</span>
      </div>
     )

     }

      <div className="artwork__info">
        <h3>{artwork.title}</h3>
        <p>{artwork.artistDisplayName}</p>
        <p>{artwork.objectDate}</p>
      </div>
    </Link>
  );
};

export default ArtworkCard;
