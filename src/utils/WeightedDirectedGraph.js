export default class WeightedDirectedGraph {
  graph = {};

  contains(node) {
    return !!this.graph[node];
  }

  containsEdge(startNode, endNode) {
    return !!this.graph[startNode].edges[endNode];
  }

  addVertex(node) {
    if (!this.contains(node)) {
      this.graph[node] = { edges: {} };
    }
  }

  removeVertex(node) {
    if (this.contains(node)) {
      for (let connectedNode in this.graph[node].edges) {
        if (this.graph[node].edges.hasOwnProperty(connectedNode))
          this.removeEdge(node, connectedNode);
      }
      delete this.graph[node];
    }
  }

  addEdge = (startNode, endNode, weight, rest) => {
    if (this.contains(startNode) && this.contains(endNode)) {
      this.graph[startNode].edges[endNode] = { weight, ...rest };
    }
  };

  removeEdge = (startNode, endNode) => {
    if (this.contains(startNode) && this.contains(endNode)) {
      delete this.graph[startNode].edges[endNode];
    }
  };
}
