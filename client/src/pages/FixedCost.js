import React, { Component } from "react";
import Card from "../components/Card";
import Alert from "../components/Alert";
import API from "../utils/API";
import { Link } from "react-router-dom";

class FixedCost extends Component {
  state = {
  };

  // When the component mounts, load the next dog to be displayed
  componentDidMount() {
    this.loadFixedCosts();
  }

  // handleBtnClick = event => {
  //   // Get the data-value of the clicked button
  //   const btnType = event.target.attributes.getNamedItem("data-value").value;
  //   // Clone this.state to the newState object
  //   // We'll modify this object and use it to set our component's state
  //   const newState = { ...this.state };
  //
  //   if (btnType === "pick") {
  //     // Set newState.match to either true or false depending on whether or not the dog likes us (1/5 chance)
  //     newState.match = 1 === Math.floor(Math.random() * 5) + 1;
  //
  //     // Set newState.matchCount equal to its current value or its current value + 1 depending on whether the dog likes us
  //     newState.matchCount = newState.match
  //       ? newState.matchCount + 1
  //       : newState.matchCount;
  //   } else {
  //     // If we thumbs down'ed the dog, we haven't matched with it
  //     newState.match = false;
  //   }
  //   // Replace our component's state with newState, load the next dog image
  //   this.setState(newState);
  //   this.loadNextDog();
  // };

  loadFixedCosts = () => {
    API.getFixedData().then((resp)=>{
      var totalCost = 0.0;
      resp.data.forEach((value)=>{
        totalCost += parseFloat(value.cost);
      });
      this.setState({fixedCost : totalCost, items:resp.data})
    });
  };

  render() {

    var fixedPercent = this.state.fixedCost / this.state.income * 100;
    return (

      // <p>Monthly Income: {this.state.income}</p>
      // <p>Total Fixed Cost: {this.state.fixedCost}</p>
      // <p>Fixed Cost Percentage: {fixedPercent}</p>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">SNo.</th>
            <th scope="col">Name of Item</th>
            <th scope="col">Amount</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {this.state.items.length ? (
                {this.state.items.map(item => (
                  <tr key={item.id}>
                      <strong>
                        {item.item_name}
                      </strong>
                      <p>
                        {item.cost}
                      </p>
                  </tr>
                ))}
          ) : (
            <h3>No Results to Display</h3>
          )}
        </tbody>
      </table>

      // <div>
      //   <h1 className="text-center">Make New Friends</h1>
      //   <h3 className="text-center">
      //     Thumbs up on any pups you'd like to meet!
      //   </h3>
      //   <Card image={this.state.image} handleBtnClick={this.handleBtnClick} />
      //   <h1 className="text-center">
      //     Made friends with {this.state.matchCount} pups so far!
      //   </h1>
      //   <Alert style={{ opacity: this.state.match ? 1 : 0 }} type="success">
      //     Yay! That Pup Liked You Too!!!
      //   </Alert>
      // </div>
    );
  }
}

export default FixedCost;
