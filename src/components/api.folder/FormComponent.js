import React, { useState } from "react";
import { Input, Button, Rate } from "antd";
import { FaCircleArrowDown } from "react-icons/fa6";
import axios from "axios";


const FormComponent = () => {
 const [name, setName] = useState("");
 const [years, setYears] = useState("");
 const [movieInfo, setMovieInfo] = useState("");
 console.log(movieInfo, "movieInfo");
 const [loading, setLoading] = useState(false);
 const [searchedMovie, setSearchedMovie] = useState("");
 const [selectedFormat, setSelectedFormat] = useState("json", "xml");


 const handleNameChange = (e) => {
    setName(e.target.value);
 };

 const handleYearsChange = (e) => {
    setYears(e.target.value);
 };

 // const handleFormatChange = (value) => {
 //   setSelectedFormat(value);
 // };

 const handleSearch = () => {
    setLoading(true);

    const apiUrl = `https://corsproxy.io/?http://www.omdbapi.com/?i=tt3896198&apikey=83fd19f6&t=${name}&y=${years}&plot=${years}&r=${years}`;

    axios({
      method: "get",
      url: apiUrl,
      responseType: selectedFormat === "json" ? "json" : "xml",
    })
      .then((response) => {
        if (selectedFormat === "json") {
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
 console.log(ratingValue, "firstRating");
 return (
    <>
      <section
        style={{
          // display: "flex",
          // flexDirection: "column",
          // 
          // margin: "30px",
        }}
      >
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent:"center",
          margin: "30px",
          
        }}>
        <Input
       
          placeholder="Name of movie"
          value={name}
          onChange={handleNameChange}
          style={{ width: "30%", height: "70px",margin:"30px" }}
        />
        <Input
          placeholder="Number of Years"
          value={years}
          onChange={handleYearsChange}
          style={{ width: "30%", height: "70px" }}
        />
        </div>
        
        <div>
        <Button type="primary" onClick={handleSearch} style={{ width: "10%", height: "40px",margin:"30px" }}>
          {loading ? "Loading..." : "Search"}
        </Button>
        <Button onClick={handleReset} style={{ width: "10%", height: "40px", }}>Reset</Button>
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
          <h1>{movieInfo.Title}</h1>
          <h3 style={{ color: "blue" }}> year: {movieInfo.Year}</h3>
          <div style={{ border: "4px dashed purple", width: "80%" }}>
            <p>{movieInfo.Plot}</p>
          </div>
          <p style={{ fontWeight: "bolder" }}> Runtime: {movieInfo.Runtime}</p>
          <img src={movieInfo.Poster} />

          <p style={{ fontWeight: "bold" }}>Genre: '{movieInfo.Genre}'</p>
          <p>Country:"{movieInfo.Country}"</p>

          <p style={{ fontWeight: "bold" }}>Actors: "{movieInfo.Actors}"</p>

          <div
            style={{ width: "20%", backgroundColor: "gray", padding: "10px", borderRadius:"30px"}}
          >
            <Rate
              value={ratingValue}
              allowHalf
              count={10}
              disabled
            />
          </div>

          {/* <textarea
            value={movieInfo}
            
            rows={10}
            cols={60}
            style={{ width: "80%" }}
          /> */}
        </div>
      ) 
      
      }
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
          <p>Sorry, we couldn't find the movie.</p>
        </div>
      )}
    </>
 );
};

export default FormComponent;