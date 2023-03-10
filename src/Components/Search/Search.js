import React, {  useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import "./Search.css";
import logo from "../../assets/logo.jpg";
import { Link } from "react-router-dom";
function Search() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  // search input handling

  const searchChange = (e) => {
    const typeResult = e.target.value;
    console.log(typeResult);
    setSearch(() => {
      return typeResult;
    });
    console.log(search);
  };

  // api call

  const apiUrl = "https://www.omdbapi.com/?apikey=29c12e28";
  const searchApiCall = async () => {
    const res = await axios.post(apiUrl + "&s=" + search);
    const fetchResult = res.data.Search;
    
    if (fetchResult) {
      console.log("loading");
      setLoading(false);
      setSearchResult(res.data.Search);
    } else {
      console.log("no result");
      setLoading(true);
    }
   
  };


    

  return (
    <div>
      <div id="search">
        <Link to="/">
          <img style={{ height: "5rem", width: "10rem" }} src={logo} alt="" />
        </Link>

        <TextField
          style={{ width: "30rem", height: "10px" }}
          onChange={searchChange}
          id="outlined-basic"
          label="Search"
          variant="outlined"
          autoComplete="off"
        />

        <Button
          style={{
            height: "3.5rem",
            borderRadius: "0px 5px 5px 0px",
            backgroundColor: "red",
          }}
          onClick={searchApiCall}
          variant="contained"
        >
          Search
        </Button>
      </div>

      <div className="category">
        

        <div id="movies-div">
          <h1 style={{ textAlign: "start", marginLeft: "2rem" }}>Movies</h1>
          <div className="movies">
            {loading ? (
              <h1>No Movies Found</h1>
            ) : (
              searchResult
                .filter((sr) => sr.Type === "movie")
                .map((e) => {
                  return (
                    <div id="movie-single-div" style={{ marginLeft: "2rem" }}>
                      <img
                        style={{
                          height: "20rem",
                          width: "15rem",
                          marginBottom: "1rem",
                          borderRadius: "15px 15px 0 0",
                        }}
                        src={e.Poster}
                        alt="Loading"
                      />

                      <h6>{e.Title}</h6>
                      <h6>{e.Year}</h6>
                    </div>
                  );
                })
            )}
          </div>
        </div>

        <div id="series-div">
          <h1 style={{ textAlign: "start", marginLeft: "2rem" }}>Series</h1>
          <div id="series">
            {loading ? (
              <h1>No Series Found</h1>
            ) : (
              searchResult
                .filter((sr) => sr.Type === "series") 
                .map((e) => {
                  return (
                    <div id="series-single-div" style={{ marginLeft: "2rem" }}>
                      <img
                        style={{
                          height: "20rem",
                          width: "15rem",
                          marginBottom: "1rem",
                          borderRadius: "15px 15px 0 0",
                        }}
                        src={e.Poster}
                        alt="Loading..."
                      />
                      <h6>{e.Title}</h6>
                      <h6>{e.Year}</h6>
                    </div>
                  );
                })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
