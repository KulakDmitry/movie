import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";
import "@testing-library/jest-dom";

jest.mock("axios");

const MockHomePage = () => {
  return (
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
};

describe("Homepage", () => {
  let response;
  beforeEach(() => {
    response = {
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
  });

  it("should render header when render homepage", async () => {
    render(<MockHomePage />);
    expect(screen.getByText(/most popular movies/i)).toBeInTheDocument();
  });

  it("fetches successfully data from an API", async () => {
    axios.get.mockImplementationOnce(() => response);
    render(<MockHomePage />);
    expect(axios.get).toBeCalledTimes(1);

    const movie = await screen.findByTestId("movie-0");
    expect(movie).toBeInTheDocument();
  });

  it("should render movies when render homepage", async () => {
    axios.get.mockImplementationOnce(() => response);
    render(<MockHomePage />);
    const movies = await screen.findAllByTestId(/movie-/i);
    expect(movies.length).toBe(5);
  });

  it("should render buttons when render homepage", async () => {
    render(<MockHomePage />);
    const previousPage = await screen.findByText("previous");
    const firstPage = await screen.findByText("1");
    const lastPage = await screen.findByText("500");

    expect(previousPage).toBeInTheDocument();
    expect(firstPage).toBeInTheDocument();
    expect(lastPage).toBeInTheDocument();
  });

  it("should render another page when click on button", async () => {
    render(<MockHomePage />);
    expect(axios.get).toBeCalledTimes(1);

    const secondPage = await screen.findByText("2");
    fireEvent.click(secondPage);

    expect(axios.get).toBeCalledTimes(2);
    render(<MockHomePage />);
  });

  it("fetch error data from an API", async () => {
    const errorMessage = "Network Error";

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );
  });
});
