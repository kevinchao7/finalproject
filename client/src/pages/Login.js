import React from "react";
import Hero from "../components/Hero";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import API from "../utils/API";

const About = () =>
  <div>
    <Hero backgroundImage="https://www.europol.europa.eu/sites/default/files/images/finance_budget.jpg">
      <h1>Financial Budget App</h1>
      <h2>Start Saving Now!</h2>
    </Hero>
    <Container style={{ marginTop: 30 }}>
      <Row>
        <Col size="md-12">
          <p>Please Log In.</p>
          <button onClick={API.getLogin} className="btn btn-danger"><span className="fa fa-google-plus"></span> Google</button>
        </Col>
      </Row>
    </Container>
  </div>;

export default About;
