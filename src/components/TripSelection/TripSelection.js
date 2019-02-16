import React from "react";
import PropTypes from "prop-types";
import Select from "../Select/Select";
import "./TripSelection.css";

export default class TripSelection extends React.Component {
  state = {
    departureField: "",
    arrivalField: "",
    mode: "shortest"
  };

  async componentDidMount() {
    const { deals } = await (await fetch("./response.json")).json();
    this.setState({ deals });
  }

  handleFieldChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  changeSearchMode = mode => e => {
    e.preventDefault();
    if (mode === this.state.mode) return;

    this.setState({ mode });
  };

  render() {
    const { findTrip, cities } = this.props;
    const { departureField, arrivalField, mode } = this.state;

    return (
      <div className="tripSorter__selectionContainer">
        <div className="tripSorter__select">
          <Select
            label={""}
            fieldName={"departureField"}
            fieldValue={departureField}
            fieldValues={cities}
            compareField={arrivalField}
            defaultText={"Departure city"}
            handleFieldChange={this.handleFieldChange}
          />
          <i className="fas fa-arrow-right tripSorter__select--arrow" />
          <Select
            label={""}
            fieldName={"arrivalField"}
            fieldValue={arrivalField}
            fieldValues={cities}
            compareField={departureField}
            defaultText={"Arrival city"}
            handleFieldChange={this.handleFieldChange}
          />
        </div>

        <div className="tripSorter__mode">
          <div
            className={`tripSorter__mode--btn tripSorter__mode--btn--left ${
              mode === "cheapest" ? "active" : ""
            }`}
            onClick={this.changeSearchMode("cheapest")}
          >
            Cheapest
          </div>
          <div
            className={`tripSorter__mode--btn tripSorter__mode--btn--right ${
              mode === "shortest" ? "active" : ""
            }`}
            onClick={this.changeSearchMode("shortest")}
          >
            Fastest
          </div>
        </div>
        <div className="tripSorter__search">
          <div
            className="tripSorter__search--btn"
            onClick={findTrip(departureField, arrivalField, mode)}
          >
            Search
          </div>
        </div>
      </div>
    );
  }
}

TripSelection.propTypes = {
  findTrip: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired
};
