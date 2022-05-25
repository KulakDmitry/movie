/// <reference types="cypress"/>

describe("home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should open movie page when click on the movie", () => {
    cy.intercept("GET", "https://api.themoviedb.org/3/movie/popular*", {
      fixture: "movies",
    });
    cy.get('[data-testid="movie-0"]').click();

    cy.hash("pathname").should("eq", "#/movie/414906");
  });

  it("should be disabled previous page button when first page is open", () => {
    cy.get('[aria-label="Previous page"]').should(
      "have.attr",
      "aria-disabled",
      "true"
    );
  });

  it("should open second page when click on the page button", () => {
    cy.intercept("GET", "https://api.themoviedb.org/3/movie/popular*").as(
      "getMovie"
    );
    cy.wait("@getMovie").then(() => {
      cy.get('[aria-label="Page 2"]').click();
      cy.hash("pathname").should("eq", "#/2");
    });
  });
});
