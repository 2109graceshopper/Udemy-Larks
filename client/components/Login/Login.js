import React from "react";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      msg: "",
      msgBool: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.password === this.state.reenter) {
      //Register account
      this.setState({
        username: "",
        password: "",
        reenter: "",
        msg: "Account created!",
        msgBool: true,
      });
    } else {
      this.setState({ password: "", reenter: "" });
      this.setState({ msg: "Passwords do not match", msgBool: true,  });
    }
  }

  message() {
    return <p>{this.state.msg}</p>;
  }

  render() {
    return (
      <div onSubmit={this.handleSubmit}>
        <h1>Sign In</h1>
        <h4>Sign in and start Learning!</h4>
        {this.state.msgBool ? this.message() : null}
        <form>
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

export default SignIn;
