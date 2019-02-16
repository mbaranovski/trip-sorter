import React from "react";
import TripSelection from "../TripSelection/TripSelection";
import TripSorter from "../../utils/TripSorter";
import TripViewer from "../TripViewer/TripViewer";

export default class TripSorterProvider extends React.Component {
  state = {
    tripSorter: null,
    trips: [],
    cities: [],
    currency: "EUR"
  };

  async componentDidMount() {
    const { deals, currency } = await (await fetch("./response.json")).json();
    const tripSorter = new TripSorter(deals);

    // Does not matter if we build cities list from cheapest or shortest path.
    const cities = Object.keys(tripSorter.cheapestPath.graph);
    this.setState({ tripSorter, cities, currency });
  }

  findTrip = (from, to, mode) => () => {
    if (!from || !to) {
      alert("Destination and arrival city must be first selected.");
      return;
    }
    this.setState({ trips: this.state.tripSorter.findTrip(from, to, mode) });
  };

  handleReset = () => {
    this.setState({ trips: [] });
  };

  render() {
    const { trips, tripSorter, cities, currency } = this.state;
    if (!tripSorter) return <div>Loading...</div>;

    return (
      <React.Fragment>
        <TripSelection cities={cities} findTrip={this.findTrip} />
        {trips && trips.length ? (
          <TripViewer
            handleReset={this.handleReset}
            currency={currency}
            trips={trips}
          />
        ) : null}
      </React.Fragment>
    );
  }
}
