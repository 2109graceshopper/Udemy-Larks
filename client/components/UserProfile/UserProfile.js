import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { fetchUserInfo } from "../../store/user";
import { me } from "../../store/auth";

class UserProfile extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    try {
      const token = window.localStorage.getItem("token");
      this.props.getUser(this.props.match.params.id, {
        headers: { authorization: token },
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const user = this.props.user;
    const userVideos = user.userUniqueVideos ? user.userUniqueVideos : [];
    console.log(user);
    return !Array.isArray(user) ? (
      <div>
        <section className="userProfile">
          <div className="userProfile__card">
            <h2>User Profile</h2>
            <img className="" src={user.userimageURL} />
            <h3>Name: {user.firstName + " " + user.lastName}</h3>
            <h3>Email: {user.username}</h3>
            <h3>Address: {user.address}</h3>
          </div>
        </section>
        <section>
          <h2>Your Products</h2>
          {userVideos.map((video) => {
            return (
              <div key={video.id}>
                <Link to={`/videos/${video.id}`}>
                  <img className="userProfile__image" src={video.imageURL} />
                  <div>
                    <h3>{video.title}</h3>
                    <h4>{video.description}</h4>
                  </div>
                </Link>
              </div>
            );
          })}
        </section>
      </div>
    ) : (
      <div>
        <h2>You currently don't have access to this user profile!</h2>
      </div>
    );
  }
}

const mapState = (state) => ({
  user: state.user,
});

const mapDispatch = (dispatch) => ({
  getUser: (userId, header) => dispatch(fetchUserInfo(userId, header)),
});

export default connect(mapState, mapDispatch)(UserProfile);
