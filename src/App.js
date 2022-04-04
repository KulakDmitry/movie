import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage/HomePage";
import MoviePage from "./components/Moviepage/MoviePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/page/:page/movie/:id" element={<MoviePage />} />
      <Route path="/page/:page" element={<HomePage />}></Route>
    </Routes>
  );
}

export default App;
