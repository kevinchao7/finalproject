import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import FixedCost from "./pages/FixedCost";
import FlexSpend from "./pages/FlexSpend";
import Goals from "./pages/Goals";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";

const App = () =>
  <Router>
    <div>
      <Navbar />
      <Wrapper>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/fixedcost" component={FixedCost} />
        <Route exact path="/flexspend" component={FlexSpend} />
        <Route exact path="/goal" component={Goals} />
      </Wrapper>
      <Footer />
    </div>
  </Router>

export default App;
