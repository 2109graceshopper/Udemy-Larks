import React from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";
// import Registration from "./components/Registration/Registration";
import Header from "./components/Header";
import SignIn from "./components/SignIn/SignIn";


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Header />
      <SignIn />
    </div>
  );
};

export default App;
