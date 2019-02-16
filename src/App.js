import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import TripSorterProvider from "./components/TripSorterContainer/TripSorterProvider";

class App extends Component {
  render() {
    return (
      <div className="App tripSorter__topBackground">
        <header className={"tripSorter__header"}>
          Plan your trip with TripSorter
        </header>
        <div className="tripSorter__header tripSorter__header--sub">
          Choose either <span className={"text-green"}>cheapest</span> or{" "}
          <span className={"text-red"}>fastest</span> option
        </div>
        <div className="tripSorter__container">
          <TripSorterProvider />
        </div>
      </div>
    );
  }
}

export default App;
