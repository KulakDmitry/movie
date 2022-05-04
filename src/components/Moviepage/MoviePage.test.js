import { render, screen } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import MoviePage from "./MoviePage";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

jest.mock("axios", () => ({
  get: jest.fn(),
}));

const renderMoviePage = () => {
  return (
    <MemoryRouter>
      <MoviePage />
    </MemoryRouter>
  );
};

describe("MoviePage", () => {
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
  it("should render moviepage when get movie data", async () => {
    axios.get.mockImplementationOnce(() => responseMoviePage);

    await act(async () => render(renderMoviePage()));

    expect(axios.get).toBeCalledTimes(1);

    expect(screen.queryByText("Most popular movies")).not.toBeInTheDocument();
    expect(screen.getByText(/movieName/i)).toBeInTheDocument();
    expect(screen.getByText(/description.../i)).toBeInTheDocument();
    expect(screen.getByText(/Duration/i)).toBeInTheDocument();
  });
});
