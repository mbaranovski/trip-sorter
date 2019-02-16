import WeightedDirectedGraph from "./WeightedDirectedGraph";

export default class TripSorter {
  distanceMap = {};
  unvisitedArray = [];
  visitedArray = [];

  constructor(deals) {
    if (!deals || !deals.length)
      throw new Error("No deals have been provided.");

    this.deals = deals;

    this.createCheapestAndShortestWeightedGraphs();
  }

  reset() {
    this.distanceMap = {};
    this.unvisitedArray = [];
    this.visitedArray = [];
  }

  getPathBasedOnmode(mode) {
    return {
      shortest: this.shortestPath,
      cheapest: this.cheapestPath
    }[mode];
  }

  createCheapestAndShortestWeightedGraphs() {
    this.cheapestPath = new WeightedDirectedGraph();
    this.shortestPath = new WeightedDirectedGraph();

    this.deals.forEach(deal => {
      const { cost, discount, duration } = deal;

      const costWeight = cost * (1 - discount / 100);
      const timeWeight =
        parseInt(duration.h, 10) * 60 + parseInt(duration.m, 10);

      this.addVerticesAndEdges(this.cheapestPath, deal, costWeight);
      this.addVerticesAndEdges(this.shortestPath, deal, timeWeight);
    });
  }

  addVerticesAndEdges(path, deal, weight) {
    const { departure, arrival, ...rest } = deal;

    path.addVertex(departure);
    path.addVertex(arrival);
    if (path.containsEdge(departure, arrival)) {
      weight < path.graph[departure].edges[arrival].weight &&
        path.addEdge(departure, arrival, weight, rest);
    } else {
      path.addEdge(departure, arrival, weight, rest);
    }
  }

  calculateInitialDistance(from, path) {
    for (let vertex in path.graph) {
      if (path.graph.hasOwnProperty(vertex)) {
        if (vertex === from) this.distanceMap[vertex] = { dist: 0, prev: null };
        else this.distanceMap[vertex] = { dist: Infinity, prev: null };

        this.unvisitedArray.push(vertex); // Fill cheapestUnvisitedVertices array
      }
    }
  }

  calculateDistance(path) {
    while (this.unvisitedArray.length !== 0) {
      const startVertex = this.findLowestDistanceUnvisitedNode();
      const edges = path.graph[startVertex].edges;
      for (let endVertex in edges) {
        if (edges.hasOwnProperty(endVertex)) {
          const weight = edges[endVertex].weight;
          const newDistance = this.distanceMap[startVertex].dist + weight;

          if (newDistance < this.distanceMap[endVertex].dist) {
            this.distanceMap[endVertex] = {
              dist: newDistance,
              prev: startVertex,
              ...path.graph[startVertex].edges[endVertex]
            };
          }
        }
      }

      this.visitedArray.push(this.unvisitedArray.splice(0, 1)[0]);
    }
  }

  findLowestDistanceUnvisitedNode() {
    return this.unvisitedArray.sort(
      (a, b) => this.distanceMap[a].dist - this.distanceMap[b].dist
    )[0];
  }

  findTrip(from, to, mode) {
    if (!from || !to || !mode) throw new Error("Missing arguments.");
    this.reset();

    const path = this.getPathBasedOnmode(mode);
    this.calculateInitialDistance(from, path);
    this.calculateDistance(path);

    return this.buildTrip(from, to);
  }

  buildTrip(from, to) {
    let arrCity = to;
    let depCity = this.distanceMap[to].prev;
    const trip = [];
    while (true) {
      trip.push({
        name: `${depCity} - ${arrCity}`,
        ...this.distanceMap[arrCity]
      });

      if (depCity === from) break;

      arrCity = depCity;
      depCity = this.distanceMap[arrCity].prev;
    }

    return trip.reverse();
  }
}
