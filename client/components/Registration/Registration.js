import React from "react";
import {connect} from "react-redux";
import {authenticate} from "../../store";

class Registration extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      reenter: "",
      msg: "",
      msgBool: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value,
    });
  }

  message() {
    return <p>{this.state.msg}</p>;
  }

  render() {
    const {name, displayName, handleSubmit, error} = this.props;
    return (
      <div>
        <h1>Register</h1>
        <h4>Register and start learning!</h4>
        {this.state.msgBool ? this.message() : null}
        <form onSubmit={handleSubmit} name={name}>
          <label>
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <input
              name="reenter"
              type="password"
              placeholder="Re-Enter Password"
              value={this.state.reenter}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Register" />
        </form>
      </div>
    );
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDisaptch = (dispatch) => {
  return {
    handleSubmit(event) {
      event.preventDefault();
      const name = event.target.name;
      const username = event.target.username.value;
      const password = event.target.password.value;
      dispatch(authenticate(username, password, name));
    }
  }
}

export default connect(mapSignup, mapDisaptch)(Registration);