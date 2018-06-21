import React, { Component } from "react";
import PropTypes from "prop-types";
import Form from "./utils/index";
import Error from "./utils/Error";

export default class FormComponent extends Component {
  toArray = object => {
    return Object.entries(object).reduce((carry, [key, value]) => {
      return carry.concat({
        key,
        value
      });
    }, []);
  };

  state = {
    isValid: true,
    errors: new Error(),
    data: this.toArray(this.props.data)
  };

  static propTypes = {
    data: PropTypes.object,
    rules: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    name: PropTypes.string
  };

  onChange = key => e => {
    const value = e.target.value;

    const validation = this.validate({ [key]: value });
    // check nanti dia mau ngevalidasi setiap change apa engga? kalau iya kirim hasil validasi nya
    this.props.onChangeValue(key, value);
  };

  onSubmit = e => {
    const validation = this.validate();

    this.props.onSubmit(e, validation.validated);
  };

  validate = overrideData => {
    const { rules, data } = this.props;
    const override = { ...data, ...overrideData };

    const form = new Form(override, { ...rules });
    const validation = form.validate();

    if (!validation.validated) {
      this.setState(({ errors }) => {
        return {
          isValid: false,
          errors: errors.record(validation.errors)
        };
      });

      return validation;
    }
  };

  render() {
    const { isValidate, errors, data } = this.state;

    return this.props.children({
      isValidate,
      errors,
      onChange: this.onChange,
      data,
      onSubmit: this.onSubmit
    });
  }
}
