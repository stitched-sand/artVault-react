import { Link } from "react-router-dom";

const ArtworkCard = ({ artwork }) => {
  return (
    <Link to={`/artwork/${artwork.objectID}`} className="artwork">
      <img
        src={artwork.primaryImageSmall}
        alt={artwork.title}
        className="artwork__img"
      />

      <div className="artwork__info">
        <h3>{artwork.title}</h3>
        <p>{artwork.artistDisplayName}</p>
        <p>{artwork.objectDate}</p>
      </div>
    </Link>
  );
};

export default ArtworkCard;
