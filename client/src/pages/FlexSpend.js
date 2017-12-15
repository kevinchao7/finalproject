import React, { Component } from "react";
import Card from "../components/Card";
import Alert from "../components/Alert";
import API from "../utils/API";
import { Input, FormBtn, DropDownList } from "../components/Form";
import { Link } from "react-router-dom";
const Highcharts = require('highcharts');

class FlexSpend extends Component {
  state = {
    item_name:'',
    cost:'',
    items: []
  };

  // When the component mounts, load the next dog to be displayed
  componentDidMount() {
    this.loadFlexSpendings();
    this.runChart();
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

  runChart = () => {
    Highcharts.chart('linechart', {
        title: {
            text: 'Spending History'
        },

        yAxis: {
            title: {
                text: '$ USD'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 2010
            }
        },

        series: [{
            name: 'Clothing',
            data: [125, 103, 77, 158, 71, 131, 233, 55]
        }, {
            name: 'Food',
            data: [36, 74, 94, 85, 90, 82, 32, 40]
        }, {
            name: 'Enertainment',
            data: [114, 122, 165, 177, 285, 247, 147, 387]
        }, {
            name: 'Electronics',
            data: [null, 300, 798, 509, null, null, 344, 427]
        }, {
            name: 'Other',
            data: [18, 48, 15, 38, 89, 16, 74, 11]
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });

    Highcharts.chart('semichart', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: '% Pie',
            align: 'center',
            verticalAlign: 'middle',
            y: 40
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            }
        },
        series: [{
            type: 'pie',
            name: 'history',
            innerSize: '50%',
            data: [
                ['Food',   10.38],
                ['Electronics',       56.33],
                ['Clothing', 24.03],
                ['Entertainment',    4.77],
                ['Other',     0.91],
                {
                    name: 'Flexible Spendings',
                    y: 0.2,
                    dataLabels: {
                        enabled: false
                    }
                }
            ]
        }]
    });

  }

  render() {


    var flexPercent = (this.state.flexSpendings / this.state.income * 100).toFixed(2);
    return (

      // <p>Monthly Income: {this.state.income}</p>
      // <p>Total Fixed Cost: {this.state.fixedCost}</p>
      // <p>Fixed Cost Percentage: {fixedPercent}</p>
      <div>
        <h4>Flexible Spending Percent: {flexPercent} of 30 %</h4>
        <div class="progress">
          <div className={(flexPercent > 29 ) ? "progress-bar progress-bar-warning progress-bar-striped active" : "progress-bar progress-bar-success progress-bar-striped"} role="progressbar" aria-valuenow={flexPercent} aria-valuemin="0" aria-valuemax="100" style={{"width":parseInt((parseFloat(flexPercent)/30)*100)+'%'}}>
            <span className="sr-only">40% Complete (success)</span>
          </div>
        </div>
        <div className="col-xs-8">
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
                              ${item.cost}
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
            <FormBtn
              disabled={!(this.state.cost && this.state.item_name)}
              onClick={this.handleFormSubmit}
            >
              Submit Flexible Spending Item
            </FormBtn>
          </form>
        </div>
        <div className="col-xs-12">
          <div id="linechart"></div>
          <div id="semichart"></div>
        </div>
    </div>

    );
  }
}

export default FlexSpend;
