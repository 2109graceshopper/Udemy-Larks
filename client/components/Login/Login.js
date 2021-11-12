import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../../store";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
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
        <h1>Sign In</h1>
        <h4>Sign in and start learning!</h4>
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
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(event) {
      event.preventDefault();
      const name = event.target.name;
      const username = event.target.username.value;
      const password = event.target.password.value;
      dispatch(authenticate(username, password, name));
    },
  };
};

export default connect(mapLogin, mapDispatch)(Login);
