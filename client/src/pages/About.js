import React, {Component} from "react";
import Hero from "../components/Hero";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import API from "../utils/API";

class About extends Component {
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
      var totalCost = 0.0;
      var totalTime = 0;
      resp.data.forEach((value)=>{
        totalCost += parseFloat(value.cost);
        totalTime += parseInt(value.duration);
      });
      this.setState({goals : parseInt(totalCost/totalTime)})
    });
  }

  render(){
    function calcPercent(cost,income){
      return cost / income * 100;
    }
    var fixedPercentage = calcPercent(this.state.fixedCost,this.state.income);
    var flexPercentage = calcPercent(this.state.flexSpend,this.state.income);
    var goalsPercentage = calcPercent(this.state.goals,this.state.income);
    var savings = this.state.income - this.state.fixedCost - this.state.flexSpend -this.state.goals;
    var savingsPercentage = calcPercent(savings,this.state.income);


    return (
      <div>
        <Hero backgroundImage="https://www.europol.europa.eu/sites/default/files/images/finance_budget.jpg">
          <h1>Financial Budget App</h1>
          <h2>Start Saving Now!</h2>
        </Hero>
        <Container style={{ marginTop: 30 }}>
          <Row>
            <Col size="md-12">
              <h1>Dashboard</h1>
            </Col>
          </Row>
          <Row>
            <Col size="md-12">

              <p>Name: {this.state.client_name}</p>

              <div className="progress">
                <div className="progress-bar progress-bar-striped progress-bar-success" role="progressbar" style={{"width":fixedPercentage+"%" }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                <div className="progress-bar progress-bar-striped progress-bar-info" role="progressbar" style={{"width":flexPercentage+"%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                <div className="progress-bar progress-bar-striped progress-bar-warning" role="progressbar" style={{"width":goalsPercentage+"%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                <div className="progress-bar progress-bar-striped progress-bar-danger" role="progressbar" style={{"width":savingsPercentage+"%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div className="progress col-xs-2" style={{"display": "inline"}}>
                <div className="progress-bar progress-bar-striped progress-bar-success" role="progressbar" style={{"width":"100%" }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">Fixed Costs</div>
              </div>
              <div className="progress col-xs-2" style={{"display": "inline"}}>
                <div className="progress-bar progress-bar-striped progress-bar-info" role="progressbar" style={{"width":"100%" }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                  Flexible Spendings
                </div>
              </div>
              <div className="progress col-xs-2" style={{"display": "inline"}}>
                <div className="progress-bar progress-bar-striped progress-bar-warning" role="progressbar" style={{"width":"100%" }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                  Financial Goals
                </div>
              </div>
              <div className="progress col-xs-2" style={{"display": "inline"}}>
                <div className="progress-bar progress-bar-striped progress-bar-danger" role="progressbar" style={{"width":"100%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                  Savings
                </div>
              </div>


              <p>Monthly Income: {this.state.income}</p>
              <div className="progress">
                <div className="progress-bar" role="progressbar" style={{"width":"100%" }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <p>Fixed Costs: {this.state.fixedCost}</p>
              <div className="progress">
                <div className="progress-bar" role="progressbar" style={{"width":fixedPercentage+"%" }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <p>
                Flexible Spending: {this.state.flexSpend}
                <div className="progress">
                  <div className="progress-bar" role="progressbar" style={{"width":flexPercentage+"%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </p>
              <p>
                Financial Goals: {this.state.goals}
                <div className="progress">
                  <div className="progress-bar" role="progressbar" style={{"width":goalsPercentage+"%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </p>
              <p>
                Savings: {savings}
                <div className="progress">
                  <div className="progress-bar" role="progressbar" style={{"width":savingsPercentage+"%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
// const About = () =>
//   <div>
//     <Hero backgroundImage="https://www.europol.europa.eu/sites/default/files/images/finance_budget.jpg">
//       <h1>Financial Budget App</h1>
//       <h2>Start Saving Now!</h2>
//     </Hero>
//     <Container style={{ marginTop: 30 }}>
//       <Row>
//         <Col size="md-12">
//           <h1>Dashboard - Flexible Spending</h1>
//         </Col>
//       </Row>
//       <Row>
//         <Col size="md-12">
//           <p>Name: {data2}</p>
//           <p>Fixed Costs: </p>
//           <p>
//             Email:
//           </p>
//         </Col>
//       </Row>
//     </Container>
//   </div>;

export default About;
