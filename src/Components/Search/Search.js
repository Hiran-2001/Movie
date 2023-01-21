import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import "./Search.css";
import logo from "../../assets/logo.jpg";
import Movies from "../Results/Movies";
import Series from "../Results/Series";
import { Link } from "react-router-dom";
function Search() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [movie, setMovie] = useState([]);
  const [series, setSeries] = useState([]);
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
    // console.log(fetchResult);
    //  console.log(setLoading());
    if (fetchResult) {
      console.log("loading");
      setLoading(false);
      console.log(loading);
      setSearchResult(res.data.Search);
    } else {
      console.log("no result");
      setLoading(true);
      console.log(loading);
    }
    // console.log(res.data.Search);
  };


    const trendingMovie=async()=>{
        const res = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=bc3ab4f2543c6cf7322eda5564ceacfa`)
        console.log(res);
    }

    useEffect(() => {
      trendingMovie()
    }, []);

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
        {/* <div className="movie-series-btn">
          <Button style={{ height: "3rem" }} variant="text">
            Movie
          </Button>
          <Button style={{ height: "3rem" }} variant="text">
            Series
          </Button>
        </div> */}

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
                        alt="Loading Image..."
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
                        alt="Image Loading..."
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
