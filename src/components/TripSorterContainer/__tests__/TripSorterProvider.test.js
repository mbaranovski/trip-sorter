import React from "react";

import {
  render,
  wait,
  fireEvent,
  renderIntoDocument
} from "react-testing-library";
import "dom-testing-library/extend-expect";
import TripSorterProvider from "../TripSorterProvider";
const fetchMock = require("fetch-mock");
const fs = require("fs");

fetchMock.mock(
  "./response.json",
  fs.readFileSync("src/data/response.json", "utf8")
);

test("Renders TripSorterProvider component and checks for children's inital UI state", async () => {
  const { queryByTestId, queryByText } = render(<TripSorterProvider />);

  // Before loading fetching deals we expect to show Loading...
  expect(queryByText("Loading...")).toBeInTheDOM();

  // Component fetches deals and renders TripSelection Component
  await wait(() => {
    expect(queryByText("Loading...")).not.toBeInTheDOM();

    expect(queryByTestId("arrivalField-select")).toBeInTheDOM();
    expect(queryByTestId("departureField-select")).toBeInTheDOM();

    expect(queryByText("Cheapest")).toBeInTheDOM();
    expect(queryByText("Fastest")).toBeInTheDOM();
    expect(queryByText("Search")).toBeInTheDOM();
  });
});

test("Find and render trip from Stockholm to Amsterdam", async () => {
  const {
    getByTestId,
    getByText,
    queryByText,
    queryByTestId
  } = renderIntoDocument(<TripSorterProvider />);

  await wait(); // Work around to wait for the async componentDidMount to return

  expect(queryByText("Your trip")).not.toBeInTheDOM();

  const departureField = getByTestId("departureField-select");
  departureField.value = "Stockholm";
  fireEvent.change(departureField);

  const arrivalField = getByTestId("arrivalField-select");
  arrivalField.value = "Amsterdam";
  fireEvent.change(arrivalField);

  fireEvent.click(getByText("Fastest"));
  fireEvent.click(getByText("Search"));

  expect(queryByText("Your trip:")).toBeInTheDOM();

  expect(queryByText("Stockholm - Warsaw")).toBeInTheDOM();
  expect(queryByTestId("cost-0")).toBeInTheDOM();
  expect(queryByTestId("normal-cost-0")).toBeInTheDOM();
  expect(queryByText("TSW0500")).toBeInTheDOM();
  expect(queryByTestId("time-0")).toBeInTheDOM();
  expect(queryByTestId("transport-0")).toBeInTheDOM();

  expect(queryByText("Warsaw - Amsterdam")).toBeInTheDOM();
  expect(queryByTestId("cost-1")).toBeInTheDOM();
  expect(queryByTestId("normal-cost-1")).not.toBeInTheDOM();
  expect(queryByText("CWA0415")).toBeInTheDOM();
  expect(queryByTestId("time-1")).toBeInTheDOM();
  expect(queryByTestId("transport-1")).toBeInTheDOM();
});
