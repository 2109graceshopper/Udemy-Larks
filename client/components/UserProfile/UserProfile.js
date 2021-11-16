import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import { connect } from 'react-redux';

import { fetchSingleUser } from '../../store/userProfile';

class UserProfile extends React.Component {
  componentDidMount() {
    try {
      this.props.getUser(this.props.match.params.id);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const user = this.props.user;
    const userProfile = user.dataValues ? user.dataValues : [];
    const videosArray = user.userUniqueVideos ? user.userUniqueVideos : [];

    return (
      <div>
        <section>
          <h2>User Profile</h2>
          <img className='profile-picture' src={userProfile.userimageURL} />
          <h3>Name: {`${userProfile.firstName} ${userProfile.lastName}`}</h3>
          <h3>Email: {userProfile.username}</h3>
        </section>
        <section>
          <h2>Your Products</h2>
          {videosArray.map((video) => {
            return (
              <div key={video.id}>
                <Link to={`/videos/${video.id}`}>
                  <img src={video.imageUrl} />
                  <div>
                    <h3>{video.title}</h3>
                    <h5>Created by: {video.authorName}</h5>
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

const mapStateToProps = (state) => ({
  user: state.singleUser,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: (id) => dispatch(fetchSingleUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
