import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
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
    const history = createMemoryHistory({
      initialEntries: [{ pathname: "/" }],
    });

    render(
      <MemoryRouter navigator={history} location={history.location}>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByTestId("location-display")).toHaveTextContent("/");

    await act(async () => {
      const secondPageBtn = await screen.findByText("2");
      fireEvent.click(secondPageBtn);
    });

    expect(axios.get).toHaveBeenCalledWith(
      "https://api.themoviedb.org/3/movie/popular",
      { params: { api_key: api_key, page: 2 } }
    );

    expect(screen.getByTestId("location-display")).toHaveTextContent("/2");
  });

  it("should redirect when click on movie", async () => {
    const history = createMemoryHistory({
      initialEntries: [{ pathname: "/" }],
    });

    axios.get.mockImplementationOnce(() => mockResults);

    render(
      <MemoryRouter navigator={history} location={history.location}>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByTestId("location-display")).toHaveTextContent("/");
    const movie = await screen.findByTestId("movie-0");
    fireEvent.click(movie);

    expect(screen.getByTestId("location-display")).toHaveTextContent(
      "/movie/414906"
    );
  });
});
