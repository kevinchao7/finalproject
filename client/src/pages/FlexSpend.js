import React, { Component } from "react";
import Card from "../components/Card";
import Alert from "../components/Alert";
import API from "../utils/API";
import { Input, FormBtn, DropDownList } from "../components/Form";
import { Link } from "react-router-dom";

class FlexSpend extends Component {
  state = {
    item_name:'',
    cost:'',
    items: []
  };

  // When the component mounts, load the next dog to be displayed
  componentDidMount() {
    this.loadFlexSpendings();
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

  loadFlexSpendings = () => {
    API.getData().then((resp)=>{
      this.setState({income: parseFloat(resp.data.monthly_income)});
    });
    API.getFlexData().then((resp)=>{
      var totalCost = 0.0;
      resp.data.forEach((value)=>{
        totalCost += parseFloat(value.cost);
      });
      this.setState({flexSpendings : totalCost, items: resp.data})
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.cost && this.state.item_name) {
      var tmpObj = {
        cost : this.state.cost,
        item_name : this.state.item_name,
        clientId: 2
      }
      API.saveFlexData(tmpObj).then((resp)=>{
        console.log(resp);
        this.setState({
          cost : '',
          item_name:''
        })
        this.loadFlexSpendings();
      }).catch((err)=>{throw err});
    }
  };

  handleClick(itemId, event){
    API.deleteFlexData(itemId).then((resp)=>{
      this.loadFlexSpendings();
    }).catch((err)=>{
      throw err;
    })
  }

  render() {

    var flexPercent = (this.state.flexSpendings / this.state.income * 100).toFixed(2);
    return (

      // <p>Monthly Income: {this.state.income}</p>
      // <p>Total Fixed Cost: {this.state.fixedCost}</p>
      // <p>Fixed Cost Percentage: {fixedPercent}</p>
      <div>
        <p>Flexible Spending Percent: {flexPercent}%</p>
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
                this.state.items.map(item => {
                  return (
                    <tr>
                      <td>
                        <strong>{item.id}</strong>
                      </td>
                      <td>
                        <strong>
                          {item.item_name}
                        </strong>
                      </td>
                      <td>
                        <p>
                          {item.cost}
                        </p>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger" id={item.id}
                          onClick={(e) => this.handleClick(item.id,e)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  )
                })
          ) : (
            <h3>No Results to Display</h3>
          )}
        </tbody>
      </table>

      <form>
        <label>Item Name</label>
        <Input
          value={this.state.item_name}
          onChange={this.handleInputChange}
          name="item_name"
          placeholder="Enter an item name"
        />
        <label>Item Cost</label>
        <Input
          value={this.state.cost}
          onChange={this.handleInputChange}
          name="cost"
          placeholder="Enter cost of item"
        />
        <FormBtn
          disabled={!(this.state.cost && this.state.item_name)}
          onClick={this.handleFormSubmit}
        >
          Submit Flexible Spending Item
        </FormBtn>
      </form>
    </div>

    );
  }
}

export default FlexSpend;
