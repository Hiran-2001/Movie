import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./Home.css";
function HomePage() {
  return (
    <div id="home-main">
      <div className="home-sub">
     <h1>THE WITCHER</h1>
    
      </div>
      <div id="button-div">
      <h3>WATCH MOVIE..</h3>  
       <Button id="button">
          <Link style={{ textDecoration: "none", color: "white" }} to="/movies">
            Get Started
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
