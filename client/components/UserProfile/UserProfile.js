import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import { fetchUserInfo } from '../../store/user';
import { me } from '../../store/auth';

class UserProfile extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    try {
      const token = window.localStorage.getItem('token');
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

    return (
      <div>
        <section>
          <h2>User Profile</h2>
          <img className='profile-picture' src={user.userimageURL} />
          <h3>Name: {user.firstName + ' ' + user.lastName}</h3>
          <h3>Email: {user.username}</h3>
        </section>
        <section>
          <h2>Your Products</h2>
          {userVideos.map((video) => {
            return (
              <div key={video.id}>
                <Link to={`/videos/${video.id}`}>
                  <img src={video.imageURL} />
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
  getUser: (userId, header) => dispatch(fetchUserInfo(userId, header)),
});

export default connect(mapState, mapDispatch)(UserProfile);
