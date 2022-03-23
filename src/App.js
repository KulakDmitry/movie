import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage/HomePage";
import MoviePage from "./components/Moviepage/MoviePage";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage isLoading={isLoading} setIsLoading={setIsLoading} />}
      />
      <Route
        path="/movie/:id"
        element={
          <MoviePage isLoading={isLoading} setIsLoading={setIsLoading} />
        }
      />
      <Route
        path="/page/:page/movie/:id"
        element={
          <MoviePage isLoading={isLoading} setIsLoading={setIsLoading} />
        }
      />
      <Route
        path="/page/:page"
        element={<HomePage isLoading={isLoading} setIsLoading={setIsLoading} />}
      ></Route>
    </Routes>
  );
}

export default App;
