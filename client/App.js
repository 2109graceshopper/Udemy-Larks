import React from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";
// import Registration from "./components/Registration/Registration";
import Header from "./components/Header";


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Header />
      {/* <Registration />  */}
    </div>
  );
};

export default App;
