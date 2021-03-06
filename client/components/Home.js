import React from "react";
import { connect } from "react-redux";

import LandingPage from "./LandingPage/LandingPage";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div>
      {username ? <h2>Welcome, {username}</h2> : <h2>Welcome!</h2>}
      <LandingPage />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
