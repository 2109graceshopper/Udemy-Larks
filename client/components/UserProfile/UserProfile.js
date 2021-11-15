import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import { connect } from 'react-redux';

import { fetchSingleUser } from '../../store/userProfile';

class UserProfile extends React.Component {
  componentDidMount() {
    try {
      this.props.getUser(this.props.match.params.userId);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const user = this.props.user;

    return (
      <div>
        <section>
          <h2>User Profile</h2>
          <img className='profile-picture' src={user.userimageURL} />
          <h3>Name: {`${user.firstName} ${user.lastName}`}</h3>
          <h3>Email: {user.username}</h3>
        </section>
        <section>
          <h2>Your Products</h2>
          {user.ownedVideos.map((video) => {
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
