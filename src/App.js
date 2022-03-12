import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/Homepage/HomePage";
import MoviePage from "./components/Moviepage/MoviePage";

function App() {
  const [movieInfo, setMovieInfo] = useState([]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage setMovieInfo={setMovieInfo} />} />
        <Route path="movie/:id" element={<MoviePage movieInfo={movieInfo} />} />
      </Routes>
    </div>
  );
}

export default App;
