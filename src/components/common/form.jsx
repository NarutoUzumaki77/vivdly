import React, { Component } from "react";
import InputField from "./input";
import SelectOptionField from "./select";
import Joi from "joi-browser";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      errors: {},
      options: [],
      selectedOption: "",
    };
  }

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  handleSelected = (e) => {
    this.setState({
      selectedOption: e.target.value,
    });
  };

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <InputField
        name={name}
        value={data[name]}
        label={label}
        type={type}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label) {
    const { data, errors, options, selectedOption } = this.state;
    return (
      <SelectOptionField
        name={name}
        value={data[name]}
        label={label}
        options={options}
        selected={selectedOption}
        onChange={this.handleSelected}
        error={errors[name]}
      />
    );
  }
}

export default Form;
