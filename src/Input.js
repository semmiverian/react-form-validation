import React, { Component } from "react";
import PropTypes from "prop-types";
import Form from "./utils/index";
import Error from "./utils/Error";

export default class Input extends Component {
  state = {
    isValid: true,
    errors: new Error()
  };

  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    rules: PropTypes.string,
    name: PropTypes.string
  };

  onChange = e => {
    const { name, rules } = this.props;
    const value = e.target.value;

    this.setState(({ errors }) => ({ errors: errors.clear([name]) }));
    const form = new Form({ [name]: value }, { [name]: rules });
    const validation = form.validate();

    if (!validation.validated) {
      this.setState(({ errors }) => {
        return {
          isValid: false,
          errors: errors.record(validation.errors)
        };
      });
    }

    this.props.onChangeValue(value);
  };

  render() {
    const { isValidate, errors } = this.state;

    return this.props.children({ isValidate, errors, onChange: this.onChange });
  }
}
