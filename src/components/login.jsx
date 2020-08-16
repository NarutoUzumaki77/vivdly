import React, { Component } from "react";
import InputField from "./common/input";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {
        username: "",
        password: "",
      },
      errors: {},
    };
  }

  validate = () => {
    const errors = {};

    const { account } = this.state;
    if (account.username.trim() === "")
      errors.username = "Username is required.";
    if (account.password.trim() === "")
      errors.password = "Password is required.";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    // call server
    console.log("Submitted");
  };

  validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "Username is required.";
    }
    if (name === "password") {
      if (value.trim() === "") return "Password is required.";
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;

    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Login</h1>
        <InputField
          name="username"
          value={account.username}
          label="Username"
          type="text"
          onChange={this.handleChange}
          error={errors.username}
        />
        <InputField
          name="password"
          value={account.password}
          label="Password"
          type="password"
          onChange={this.handleChange}
          error={errors.password}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default LoginForm;
