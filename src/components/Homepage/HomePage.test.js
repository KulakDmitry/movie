import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import MoviePage from "../Moviepage/MoviePage";
import { createMemoryHistory } from "history";

const api_key = process.env.REACT_APP_API_KEY;

jest.mock("axios", () => ({
  get: jest.fn(),
}));

const renderHomePage = () => {
  return (
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
};

const renderMoviePage = () => {
  return (
    <MemoryRouter>
      <MoviePage />
    </MemoryRouter>
  );
};

describe("Homepage", () => {
  const mockResults = {
    data: {
      results: [
        {
          adult: false,
          backdrop_path: "/5P8SmMzSNYikXpxil6BYzJ16611.jpg",
          genre_ids: [80, 9648, 53],
          id: 414906,
          original_language: "en",
          original_title: "The Batman",
          overview:
            "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
          popularity: 20503.385,
          poster_path: "/74xTEgt7R36Fpooo50r9T25onhq.jpg",
          release_date: "2022-03-01",
          title: "The Batman",
          video: false,
          vote_average: 7.9,
          vote_count: 3703,
        },
        {
          adult: false,
          backdrop_path: "/2n95p9isIi1LYTscTcGytlI4zYd.jpg",
          genre_ids: [18, 53, 80],
          id: 799876,
          original_language: "en",
          original_title: "The Outfit",
          overview:
            "Leonard is an English tailor who used to craft suits on London’s world-famous Savile Row. After a personal tragedy, he’s ended up in Chicago, operating a small tailor shop in a rough part of town where he makes beautiful clothes for the only people around who can afford them: a family of vicious gangsters.",
          popularity: 6429.525,
          poster_path: "/zyGDRV8eJXsaeYg11i5Y2PUSMNF.jpg",
          release_date: "2022-02-25",
          title: "The Outfit",
          video: false,
          vote_average: 7,
          vote_count: 112,
        },
      ],
    },
  };

  const responseMoviePage = {
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

  it("should render header when render homepage", () => {
    render(renderHomePage());
    expect(screen.getByText("Most popular movies")).toBeInTheDocument();
  });

  it("fetches successfully data from an API", async () => {
    axios.get.mockImplementationOnce(() => mockResults);
    render(renderHomePage());
    expect(axios.get).toBeCalledTimes(1);

    const movie = await screen.findByTestId("movie-0");
    expect(movie).toBeInTheDocument();
  });

  it("should render movies when render homepage", async () => {
    axios.get.mockImplementationOnce(() => mockResults);
    render(renderHomePage());
    const movies = await screen.findAllByTestId(/movie-/i);
    expect(movies.length).toBe(mockResults.data.results.length);
  });

  it("should render buttons when render homepage", async () => {
    render(renderHomePage());
    const previousPage = await screen.findByText("previous");
    const firstPage = await screen.findByText("1");
    const lastPage = await screen.findByText("500");

    expect(previousPage).toBeInTheDocument();
    expect(firstPage).toBeInTheDocument();
    expect(lastPage).toBeInTheDocument();
  });

  it("should render another page when click on button", async () => {
    const history = createMemoryHistory();

    render(
      <MemoryRouter history={history}>
        <HomePage />
      </MemoryRouter>
    );

    const secondPage = await screen.findByText("2");
    fireEvent.click(secondPage);

    expect(axios.get).toHaveBeenCalledWith(
      "https://api.themoviedb.org/3/movie/popular",
      { params: { api_key: api_key, page: 2 } }
    );

    expect(history.location.pathname).toMatch("/2");
  });

  it("should redirect when click on movie", async () => {
    const history = createMemoryHistory();

    history.push = jest.fn();

    axios.get.mockImplementationOnce(() => mockResults);

    render(
      <MemoryRouter history={history}>
        <HomePage />
      </MemoryRouter>
    );

    const movie = await screen.findByTestId("movie-0");
    fireEvent.click(movie);

    axios.get.mockImplementationOnce(() => responseMoviePage);

    await act(async () => render(renderMoviePage()));

    expect(history.push).toHaveBeenCalledWith(
      `/movie/${mockResults.data.results[0].id}`
    );

    expect(history.location.pathname).toMatch(
      `/movie/${mockResults.data.results[0].id}`
    );

    expect(screen.getByTestId("movie-id")).toBeInTheDocument();
  });
});
