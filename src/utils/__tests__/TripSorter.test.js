import TripSorter from "../TripSorter";
import { mockedResponse } from "./mockedResponse";

test("Check if TripSorter throws error when deals are empty or not provided", () => {
  expect(() => new TripSorter()).toThrowError("No deals have been provided.");
  expect(() => new TripSorter([])).toThrowError("No deals have been provided.");
});

test("Creates cheapest graph based on provided deals", () => {
  const tripSorter = new TripSorter(mockedResponse.deals);

  tripSorter.createCheapestAndShortestWeightedGraphs();

  expect(tripSorter.cheapestPath.graph).toMatchSnapshot();
});

test("Creates shortest graph based on provided deals", () => {
  const tripSorter = new TripSorter(mockedResponse.deals);

  tripSorter.createCheapestAndShortestWeightedGraphs();

  expect(tripSorter.shortestPath.graph).toMatchSnapshot();
});

test("Calculates initial distance for each node from London", () => {
  const tripSorter = new TripSorter(mockedResponse.deals);

  tripSorter.createCheapestAndShortestWeightedGraphs();
  tripSorter.calculateInitialDistance("London", tripSorter.cheapestPath);

  expect(tripSorter.distanceMap).toMatchSnapshot();
});

test("Calculates initial distance for each node from Paris", () => {
  const tripSorter = new TripSorter(mockedResponse.deals);

  tripSorter.createCheapestAndShortestWeightedGraphs();
  tripSorter.calculateInitialDistance("Paris", tripSorter.shortestPath);

  expect(tripSorter.distanceMap).toMatchSnapshot();
});

test("Calculates Dijkastra distance for every node for cheapest scenario from London", () => {
  const tripSorter = new TripSorter(mockedResponse.deals);

  tripSorter.createCheapestAndShortestWeightedGraphs();
  tripSorter.calculateInitialDistance("London", tripSorter.cheapestPath);
  tripSorter.calculateDistance(tripSorter.cheapestPath);

  expect(tripSorter.distanceMap).toMatchSnapshot();
});

test("Calculates Dijkastra distance for every node for shortest scenario from Paris", () => {
  const tripSorter = new TripSorter(mockedResponse.deals);

  tripSorter.createCheapestAndShortestWeightedGraphs();
  tripSorter.calculateInitialDistance("Paris", tripSorter.shortestPath);
  tripSorter.calculateDistance(tripSorter.shortestPath);

  expect(tripSorter.distanceMap).toMatchSnapshot();
});

test("Find cheapest trip from London to Warsaw", () => {
  const tripSorter = new TripSorter(mockedResponse.deals);

  expect(tripSorter.findTrip("Paris", "Stockholm", "cheapest")).toHaveLength(4);
});
