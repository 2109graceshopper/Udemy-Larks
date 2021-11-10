import React from "react";

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
    if(this.state.username) {
      //check if username is taken
    } else if (this.state.password === this.state.reenter) {
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
        <h1>Register</h1>
        <h4>Register and start learning!</h4>
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

export default Registration;
