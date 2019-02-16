import React from "react";
import PropTypes from "prop-types";
import "./TripViewer.css";

class TripViewer extends React.Component {
  render() {
    const { trips, currency, handleReset } = this.props;
    let totalCost = 0;
    let totalDuration = 0;
    return (
      <div className={""}>
        <div className={"tripSorter_tripHeading"}>Your trip:</div>

        {trips.map((trip, i) => {
          const afterDiscount = trip.cost * (1 - trip.discount / 100);
          totalCost += afterDiscount;
          totalDuration =
            totalDuration + +trip.duration.h * 60 + +trip.duration.m;
          return (
            <div className={"tripSorter__journeyContainer"} key={`trip-${i}`}>
              <div
                className={
                  "tripSorter__journeyContainer--side tripSorter__journeyContainer--transport"
                }
                data-testid={`transport-${i}`}
              >
                <i className={`fas fa-${trip.transport}`} />
              </div>
              <div className={"tripSorter__journeyName"}>{trip.name}</div>
              <div className={"tripSorter__journeyLabelContainer"}>
                <div className={"tripSorter__journeyLabel"}>Ref:</div>
                <div className={"tripSorter__journeyLabelValue"}>
                  {trip.reference}
                </div>
              </div>
              <div
                data-testid={`time-${i}`}
                className={"tripSorter__journeyLabelContainer"}
              >
                <div className={"tripSorter__journeyLabel"}>Duration:</div>
                <div className={"tripSorter__journeyLabelValue"}>
                  {trip.duration.h}h:{trip.duration.m}
                </div>
              </div>
              <div
                className={
                  "tripSorter__journeyContainer--side tripSorter__journeyContainer--cost"
                }
                data-testid={`cost-${i}`}
              >
                <div className={"tripSorter__journeyContainer--cost-title"}>
                  Cost
                </div>
                <div
                  className={"tripSorter__journeyContainer--cost-afterDiscount"}
                >
                  {afterDiscount} <small>{currency}</small>
                </div>
                {afterDiscount !== trip.cost && (
                  <div
                    data-testid={`normal-cost-${i}`}
                    className={"tripSorter__journeyContainer--cost-normal"}
                  >
                    {trip.cost} <small>{currency}</small>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div className={"tripSorter__journeySummary"}>
          <div onClick={handleReset} className={"tripSorter__resetBtn"}>
            Reset
          </div>
          <div>
            <strong>Total:</strong> {Math.floor(totalDuration / 60)}h{" "}
            {totalDuration % 60}
            {"m "}
            {totalCost}
            <small>{currency}</small>
          </div>
        </div>
      </div>
    );
  }
}

export default TripViewer;

TripViewer.propTypes = {
  trips: PropTypes.array.isRequired
};
