import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { fetchUserInfo } from "../../store/user";

class UserProfile extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    try {
      this.props.getUser(this.props.match.params.userId);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const user = this.props.user;
    console.log(user.videos);
    const userVideos = user.videos ? user.Videos : [];

    return (
      <div>
        <section>
          <h2>User Profile</h2>
          <img
            className="profile-picture"
            src="/icons/profile-picture-placeholder.png"
          />
          <h3>Name: {user.firstName + " " + user.lastName}</h3>
          <h3>Email: To Get From Props</h3>
        </section>
        <section>
          <h2>Your Products</h2>
          {userVideos.map((video) => {
            return (
              <div key={video.id}>
                <Link to={`/videos/${video.id}`}>
                  <img src={video.imageUrl} />
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
    );
  }
}

const mapState = (state) => ({
  user: state.user,
});

const mapDispatch = (dispatch) => ({
  getUser: (userId) => dispatch(fetchUserInfo(userId)),
});

export default connect(mapState, mapDispatch)(UserProfile);

// export default UserProfile;
