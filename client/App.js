import React from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";
import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Header />
    </div>
  );
};

export default App;
