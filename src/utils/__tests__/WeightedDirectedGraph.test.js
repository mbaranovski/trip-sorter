import WeightedDirectedGraph from "../WeightedDirectedGraph";

test("Creates an instance of WeightedDirectedGraph and adds/removes simple vertices and edges", () => {
  const graph = new WeightedDirectedGraph();

  graph.addVertex("A");
  graph.addVertex("B");
  graph.addVertex("C");

  graph.addEdge("A", "B", 1, { ref: "AB1" });
  graph.addEdge("B", "A", 2, { ref: "BA1" });
  graph.addEdge("B", "C", 5, { ref: "BC1" });

  expect(graph.graph).toMatchSnapshot();

  graph.removeEdge("B", "A");
  graph.removeVertex("B");

  expect(graph.graph).toMatchSnapshot();
});
