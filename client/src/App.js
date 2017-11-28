import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import FixedCost from "./pages/FixedCost";
import About from "./pages/About";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";

const App = () =>
  <Router>
    <div>
      <Navbar />
      <Wrapper>
        <Route exact path="/" component={About} />
        <Route exact path="/about" component={About} />
        <Route exact path="/fixedcost" component={FixedCost} />
        <Route exact path="/search" component={Search} />
      </Wrapper>
      <Footer />
    </div>
  </Router>

export default App;
