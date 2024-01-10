import React, { useState } from "react";
import { message, Input, Button, Rate } from "antd";
import { FaCircleArrowDown } from "react-icons/fa6";
import { AiFillDelete } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

const FormComponent = () => {
  const [name, setName] = useState("");
  const [years, setYears] = useState("");
  const [movieInfo, setMovieInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchedMovie, setSearchedMovie] = useState("");
  const [favorites, setFavorites] = useState([]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleYearsChange = (e) => {
    setYears(e.target.value);
  };
  const handleSearch = () => {
    setLoading(true);

    const apiUrl = `https://corsproxy.io/?http://www.omdbapi.com/?i=tt3896198&apikey=83fd19f6&t=${name}&y=${years}&plot=${years}&r=${years}`;

    axios({
      method: "get",
      url: apiUrl,
      responseType: "json" ? "json" : "xml",
    })
      .then((response) => {
        if ("json") {
          setMovieInfo(response.data);
        } else {
          setMovieInfo(response.data);
        }
        setSearchedMovie(`${name} (${years})`);
      })
      .catch((error) => {
        console.error("Error fetching movie info:", error);
        setMovieInfo("Error fetching movie information");
        setSearchedMovie(`${name} (${years})`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addToFavorites = (movieInfo) => {
    if (favorites.some((movie) => movie.imdbID === movieInfo.imdbID)) {
      message.error("You have already added this movie to favorites.");
      // alert("You have already added this movie to favorites.");
    } else {
      setFavorites([...favorites, movieInfo]);
    }
  };

  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter((m) => m.imdbID !== movie.imdbID));
  };

  const handleReset = () => {
    setName("");
    setYears("");
    setMovieInfo("");
    setSearchedMovie("");
  };
  const ratings = movieInfo?.Ratings?.map((item) => item?.Value);
  const firstRating = ratings && ratings.length > 0 ? ratings[0] : null;
  const ratingValue = firstRating
    ? parseFloat(firstRating.split("/")[0])
    : null;
  
  return (
    <>
      <section>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "30px",
          }}
        >
          <Input
            placeholder="Name of movie"
            value={name}
            onChange={handleNameChange}
            style={{ width: "30%", height: "70px", margin: "30px" }}
          />
          <Input
            placeholder="Number of Years"
            value={years}
            onChange={handleYearsChange}
            style={{ width: "30%", height: "70px" }}
          />
        </div>

        <div>
          <Button
            type="primary"
            onClick={handleSearch}
            style={{ width: "10%", height: "40px", margin: "30px" }}
          >
            {loading ? "Loading..." : "Search"}
          </Button>
          <Button
            onClick={handleReset}
            style={{ width: "10%", height: "40px" }}
          >
            Reset
          </Button>
        </div>
      </section>
      {searchedMovie && (
        <div style={{ textAlign: "center" }}>
          <h2>Searched Movie:</h2>
          <p>{searchedMovie}</p>
          <div>
            <FaCircleArrowDown
              style={{
                color: "#43ac6a",
                fontSize: "84px",
                marginBottom: "30px",
              }}
            />
          </div>
        </div>
      )}
      {movieInfo && movieInfo.Response === "True" && (
        <>
          <div
            style={{
              borderRadius: "30px",
              width: "60%",
              border: "3px solid gray",
              marginLeft: "20%",
              marginBottom: "50px",
              paddingBottom: "40px",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2>Movie Information:</h2>
            <h1>{movieInfo.Title}</h1>
            <h3 style={{ color: "blue" }}> year: {movieInfo.Year}</h3>
            <img alt="" src={movieInfo.Poster} />
            <div
              style={{
                border: "4px dashed purple",
                borderRadius: "30px",
                width: "80%",
                marginTop: "30px",
              }}
            >
              <p>{movieInfo.Plot}</p>
            </div>
            <p style={{ fontWeight: "bolder" }}>
              {" "}
              Runtime: {movieInfo.Runtime}
            </p>

            <p style={{ fontWeight: "bold" }}>Genre: '{movieInfo.Genre}'</p>
            <p> Country: "{movieInfo.Country}" </p>

            <p style={{ fontWeight: "bold" }}>Actors: "{movieInfo.Actors}"</p>

            <div
              style={{
                width: "40%",
                backgroundColor: "gray",
                padding: "10px",
                borderRadius: "30px",
              }}
            >
              <Rate value={ratingValue} allowHalf count={10} disabled />
            </div>
            <Button
              onClick={() => addToFavorites(movieInfo)}
              style={{ marginTop: "40px" }}
            >
              <FaHeart />
            </Button>
          </div>
        </>
      )}
      {movieInfo && movieInfo.Response === "False" && (
        <div
          style={{
            border: "3px solid gray",
            marginRight: "70px",
            marginLeft: "70px",
            marginBottom: "50px",
            paddingBottom: "40px",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2>Movie Information:</h2>
          <p>
            Sorry, we couldn't find the movie you were looking for. Please try
            again.
          </p>
        </div>
      )}
      {favorites.length > 0 && (
        <div>
          <h2>My Favorites</h2>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexWrap: "wrap",
              width: "94%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {favorites.map((movie, index) => (
              <li
                key={movie.imdbID}
                style={{
                  marginTop: "30px",
                  width: "30%",
                  clear: index % 3 === 0 ? "center" : "none",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "720px",
                    border: "6px dashed pink",
                    paddingTop: "40px",
                  }}
                >
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    style={{ width: "300px" }}
                  />
                  <h3>{movie.Title}</h3>
                  <p>Genre: '{movieInfo.Genre}'</p>
                  <p> Runtime: {movieInfo.Runtime} </p>
                  <div
                    style={{
                      marginTop: "30px",
                      marginLeft: "10px",
                      width: "90%",
                      backgroundColor: "gray",
                      padding: "10px",
                      borderRadius: "30px",
                    }}
                  >
                    <Rate value={ratingValue} allowHalf count={10} disabled />
                  </div>
                  <Button
                    onClick={() => removeFromFavorites(movie)}
                    style={{ marginTop: "20px" }}
                  >
                    <AiFillDelete />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default FormComponent;
