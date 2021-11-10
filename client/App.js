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
      Body Goes Here! Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Integer eleifend erat eu odio tincidunt mattis. Fusce sodales pellentesque
      enim eget sagittis.
    </div>
  );
};

export default App;
