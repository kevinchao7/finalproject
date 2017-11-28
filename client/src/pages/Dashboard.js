import React, {Component} from "react";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import API from "../utils/API";
import {BarChart, Legend} from 'react-easy-chart';


class Dashboard extends Component {
  state = {
  };

  componentDidMount() {
    API.getData().then((resp)=>{this.setState(
      {client_name : resp.data.client_name, income: parseFloat(resp.data.monthly_income)}
      )
      console.log(resp.data.monthly_income);
    });

    API.getFixedData().then((resp)=>{
      var totalCost = 0.0;
      resp.data.forEach((value)=>{
        totalCost += parseFloat(value.cost);
      });
      this.setState({fixedCost : totalCost})
    });

    API.getFlexData().then((resp)=>{
      var totalCost = 0.0;
      resp.data.forEach((value)=>{
        totalCost += parseFloat(value.cost);
      });
      this.setState({flexSpend : totalCost})
    });

    API.getGoalData().then((resp)=>{
      var goal = 0.0;
      resp.data.forEach((value)=>{
        
        goal += parseFloat(value.cost)/parseInt(value.duration);
      });
      this.setState({goals : goal})
    });
  }

  render(){
    function calcPercent(cost,income){
      return cost / income * 100;
    }
    const fixedPercentage = calcPercent(this.state.fixedCost,this.state.income);
    const flexPercentage = calcPercent(this.state.flexSpend,this.state.income);
    const goalsPercentage = calcPercent(this.state.goals,this.state.income);
    const savings = this.state.income - this.state.fixedCost - this.state.flexSpend -this.state.goals;
    const savingsPercentage = calcPercent(savings,this.state.income);

    const config = [
      {color: '#D9534F'},
      {color: '#5BC0DE'},
      {color: '#F2B968'},
      {color: '#5CB85C'}
    ];

    return (
      <div>
        <Container>
          <Row>
            <Col size="md-12">

              <h1>{this.state.client_name}</h1>
              <div className="col-xs-12">
                <div className="large progress">
                  <div className="progress-bar progress-bar-striped progress-bar-danger" role="progressbar" style={{"width":fixedPercentage+"%" }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                  <div className="progress-bar progress-bar-striped progress-bar-info" role="progressbar" style={{"width":flexPercentage+"%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                  <div className="progress-bar progress-bar-striped progress-bar-warning" role="progressbar" style={{"width":goalsPercentage+"%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                  <div className="progress-bar progress-bar-striped progress-bar-success" role="progressbar" style={{"width":savingsPercentage+"%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
              <center>
                <Legend horizontal data={[
                  {key: 'Fixed'},
                  {key: 'Flexible Spending'},
                  {key: 'Financial Goals'},
                  {key: 'Savings'}
                ]} dataId={'key'} config={config} />
              </center>
              <div className="col-xs-12">
                <h3>Monthly Income: <b>${this.state.income}</b></h3>
                <h3>Fixed Costs: <b>${this.state.fixedCost}</b></h3>
                <h3>Flexible Spending: <b>${this.state.flexSpend}</b></h3>
                <h3>Financial Goals: <b>${parseInt(this.state.goals)}</b></h3>
                <h3>Savings: <b>${parseInt(savings)}</b></h3>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
