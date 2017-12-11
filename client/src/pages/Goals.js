import React, { Component } from "react";
import Card from "../components/Card";
import Alert from "../components/Alert";
import GoalListItems from "../components/GoalListItems";
import API from "../utils/API";
import { Input, FormBtn, DropDownList } from "../components/Form";
import { Link } from "react-router-dom";

class Goals extends Component {
  state = {
    item_name:'',
    cost:'',
    monthly_recurring:'',
    items: [],
  };

  // When the component mounts, load the next dog to be displayed
  componentDidMount() {
    this.loadGoals();
  }

  // handleBtnClick = event => {
  //   // Get the data-value of the clicked button
  //   const btnType = event.target.attributes.getNamedItem("data-value").value;
  //   // Clone this.state to the newState object
  //   // We'll modify this object and use it to set our component's state
  //   const newState = { ...this.state };``
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

  loadGoals = () => {
    API.getData().then((resp)=>{
      this.setState({income: parseFloat(resp.data.monthly_income)});
    });
    API.getGoalData().then((resp)=>{
      var totalCost = 0.0;
      resp.data.forEach((value)=>{
        totalCost += parseFloat(value.monthly_recurring);
      });
      this.setState({goals : totalCost, items: resp.data})
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
    if (this.state.cost && this.state.item_name && this.state.monthly_recurring) {
      var tmpObj = {
        cost : this.state.cost,
        item_name : this.state.item_name,
        monthly_recurring: this.state.monthly_recurring,
        total_invested: 0,
        clientId: 2
      }
      API.saveGoalData(tmpObj).then((resp)=>{
        console.log(resp);
        this.setState({
          cost : '',
          item_name:'',
          monthly_recurring:''
        })
        this.loadGoals();
      }).catch((err)=>{throw err});
    }
  };

  handleDeleteRequest(itemID, event){
    API.deleteGoalData(itemID).then((resp)=>{
      this.loadGoals();
    }).catch((err)=>{
      throw err;
    })
  }

  handleTransferRequest(itemID){
    this.state.items.forEach((resp)=>{
      if(resp.id === itemID){
        this.setState({
          transferName: resp.item_name,
          transferInvestedFunds: resp.total_invested
        })
      }
    });
  }

  render() {

    var goalPercent = (this.state.goals / this.state.income * 100).toFixed(2);

    return (

      // <p>Monthly Income: {this.state.income}</p>
      // <p>Total Fixed Cost: {this.state.fixedCost}</p>
      // <p>Fixed Cost Percentage: {fixedPercent}</p>
      <div>
        <p>Financial Goal Percent: {goalPercent}%</p>
        <div className="col-xs-8">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">SNo.</th>
                <th scope="col">Goal Name</th>
                <th scope="col">Goal Cost</th>
                <th scope="col">Monthly Recurring</th>
                <th scope="col">Total Invested</th>
                <th scope="col">Months Left</th>
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
                              ${parseFloat(item.cost).toFixed(2)}
                            </p>
                          </td>
                          <td>
                            <p>
                              ${item.monthly_recurring}
                            </p>
                          </td>
                          <td>
                            <p>
                              ${item.total_invested}
                            </p>
                          </td>
                          <td>
                            <p>
                              {((item.cost - item.total_invested)/item.monthly_recurring).toFixed(0)}
                            </p>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger" id={item.id}
                              onClick={(e) => this.handleDeleteRequest(item.id,e)}
                            >
                              Remove
                            </button>
                          </td>
                          <td>
                            <button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal" id={item.id} onClick={(e) => this.handleTransferRequest(item.id,e)}>
                              Transfer
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
        </div>
        <div className="col-xs-4">
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
            <label>Monthly Investment</label>
            <Input
              value={this.state.monthly_recurring}
              onChange={this.handleInputChange}
              name="monthly_recurring"
              placeholder="Enter monthly investment towards this goal"
            />
            <FormBtn
              disabled={!(this.state.cost && this.state.item_name && this.state.monthly_recurring)}
              onClick={this.handleFormSubmit}
            >
              Submit Goal Item
            </FormBtn>
          </form>
        </div>

        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title text-center" id="exampleModalLabel">Transfering Invested Goal Funds</h3>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">

                <h4>Goal : {this.state.transferName}</h4>
                <h4>Invested : ${this.state.transferInvestedFunds}</h4>
                <form>
                  <label>Transfer Amount</label>
                  <Input
                    value={this.state.transfer_amount}
                    onChange={this.handleInputChange}
                    name="transfer_amount"
                    placeholder="Enter amount to transfer"
                  />
                  <div>
                    <GoalListItems items={this.state.items} />
                  </div>
                  <div Style="overflow: auto">
                    <FormBtn
                      disabled={!(this.state.transfer_amount)}
                      onClick={this.handleTransferForm}
                    >
                      Transfer Funds
                    </FormBtn>
                  </div>
                </form>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

      </div>


    );
  }
}

export default Goals;
