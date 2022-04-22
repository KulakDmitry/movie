import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import MoviePage from "./MoviePage";
import "@testing-library/jest-dom";
import HomePage from "../Homepage/HomePage";
import { act } from "react-dom/test-utils";

jest.mock("axios");

const MockHomePage = () => {
  return (
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
};

const MockMoviePage = () => {
  return (
    <MemoryRouter>
      <MoviePage />
    </MemoryRouter>
  );
};

describe("MoviePage", () => {
  let responseHomePage;
  let responseMoviePage;
  beforeEach(() => {
    responseHomePage = {
      data: {
        results: [
          { title: "first", id: 1 },
          { title: "second", id: 2 },
          { title: "third", id: 3 },
          { title: "fourth", id: 4 },
          { title: "fifth", id: 5 },
        ],
      },
    };
    responseMoviePage = {
      data: {
        title: "movieName",
        id: 1,
        overview: "description...",
        genres: [{ name: "detective" }, { name: "fantasy" }],
        vote_average: "10",
        release_date: "12.12.12",
        runtime: "120",
        budget: 1000,
      },
    };
  });

  it("should render moviepage when click on movie", async () => {
    axios.get.mockImplementationOnce(() => responseMoviePage);

    await act(async () => render(<MockMoviePage />));

    expect(axios.get).toBeCalledTimes(1);

    expect(screen.queryByText(/most popular movies/i));
    expect(screen.getByText(/movieName/i)).toBeInTheDocument();
    expect(screen.getByText(/description.../i)).toBeInTheDocument();
    expect(screen.getByText(/Duration/i)).toBeInTheDocument();
  });

  it("should redirect when click on movie", async () => {
    axios.get.mockImplementationOnce(() => responseHomePage);
    render(<MockHomePage />);

    const movie = await screen.findByTestId("movie-0");
    fireEvent.click(movie);

    axios.get.mockImplementationOnce(() => responseMoviePage);
    await act(async () => render(<MockMoviePage />));

    expect(screen.getByTestId("movieID")).toBeInTheDocument();
  });

  it("fetch error data from an API", async () => {
    const errorMessage = "Network Error";

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );
  });
});
