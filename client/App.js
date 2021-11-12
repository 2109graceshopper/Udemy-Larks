import React from "react";

import Header from "./components/Header";
import { AllProducts } from "./components/AllProducts/AllProducts";
import Routes from "./Routes";

const App = () => {
  return (
    <div>
      <Header />
      <Routes />
    </div>
  );
};

export default App;
