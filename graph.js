class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }


  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.forEach((vertex) => {
      this.addVertex(vertex);
    });
  }


  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
   
    if (!this.nodes.has(v1) || !this.nodes.has(v2)) {
      console.log("Not the same graph");
      return;
    }

    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    if (this.nodes.has(v1) && this.nodes.has(v2)) {
      v1.adjacent.delete(v2);
      v2.adjacent.delete(v1);
    } else {
      console.log("Not in the same graph...?");
    }
  }


  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex

  removeVertex(vertex) {
    if (!this.nodes.has(vertex)) {
      console.log("Not in the graph.");
      return;
    }

    this.nodes.forEach((node) => {
      node.adjacent.delete(vertex);
    });

    this.nodes.delete(vertex);
  }


  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const visited = new Set();
    const result = [];

    function dfs(node) {
      if (!visited.has(node)) {
        visited.add(node);
        result.push(node.value);

        node.adjacent.forEach((neighbor) => {
          dfs(neighbor);
        });
      }
    }

    dfs(start);
    return result;
  }


  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const visited = new Set();
    const result = [];
    const queue = [start];

    visited.add(start);

    while (queue.length > 0) {
      const current = queue.shift();
      result.push(current.value);

      current.adjacent.forEach((neighbor) => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }

    return result;
  }
}

module.exports = {Graph, Node}