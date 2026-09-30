import museumImage from "../assets/museum.svg";
import SearchBar from "../components/SearchBar"

const Home = () => {
  return (
    <main>
      <section id="landing">
        <div className="container">

          <div className="header__description">
            <h1 className="header__title">
              Unlock over 400,000 works of art
            </h1>

            <p className="header__subtitle">
              Search artists, paintings, sculptures and artifacts from the Met
              Museum Collection on <span className="purple">ArtVault</span>.
            </p>

            <SearchBar/>
          </div>

          <figure className="header__img--wrapper">
            <img src={museumImage} alt="Art Museum" />
          </figure>

        </div>
      </section>
    </main>
  );
};

export default Home;
