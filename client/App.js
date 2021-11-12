import React from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";
import Header from "./components/Header";
import { AllProducts } from "./components/AllProducts/AllProducts";

const App = () => {
  return (
    <div>
      <Header />
      <Routes />
      {/* forced rendering for testing below, can update with routes later*/}
      {/* Body Goes Here! Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Integer eleifend erat eu odio tincidunt mattis. Fusce sodales pellentesque
      enim eget sagittis. */}
      {/* <AllProducts /> */}
    </div>
  );
};

export default App;
