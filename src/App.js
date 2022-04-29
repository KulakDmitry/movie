import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage/HomePage";
import MoviePage from "./components/Moviepage/MoviePage";

function App() {
  return (
    <Routes>
      <Route path="/:page" element={<HomePage />} />
      <Route path="/movie/:id" element={<MoviePage />} />
    </Routes>
  );
}

export default App;
