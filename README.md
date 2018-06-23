# React Form Validation

## Table of content

## Introduction

Wrapper component with ability to validating any user input with various available rules using render props pattern.
Inspired by laravel validation rules

# Installation

Using Npm

```
npm install react-form-validation-render-prop
```

Using Yarn

```
yarn add react-form-validation-render-props
```

## Example

```javascript
import React, { Component } from "react";
import Form from "react-form-validation-render-props";

class App extends Component {
  state = {
    email: "",
    password: ""
  };

  // rules using array
  // rules = {
  //   email: ["required", "email"],
  //   password: ["required", "between:5:10"]
  // };

  // rules using string
  // rules = {
  //   email: 'required|email',
  //   password: 'required|between:5:10'
  // }

  // rules using object and custom global message and custom message
  rules = {
    email: {
      rules: ["required", "email"],
      message: "Please allow me to filling your inbox"
    },
    password: {
      rules: "required|between:5:10",
      message: {
        required: "Allow yourself to come to our system",
        between: "Make yourself secure"
      }
    }
  };

  onChangeValue = (key, value) => {
    this.setState({ [key]: value });
  };

  onSubmit = (e, valid) => {
    e.preventDefault();
    console.log(valid);
  };

  render() {
    return (
      <Form
        data={this.state}
        rules={this.rules}
        onSubmit={this.onSubmit}
        validateOnChange={false}
      >
        {({ isValidate, errors, onChange, data, onSubmit }) => {
          return (
            <form onSubmit={onSubmit}>
              {data.map(item => {
                return (
                  <div key={item.key}>
                    <label>{item.key}</label>
                    <input type="text" onChange={onChange(item.key)} />
                    {!isValidate && (
                      <span className="has-tex-error">
                        {errors.get(item.key)}
                      </span>
                    )}
                  </div>
                );
              })}
              <button type="submit">Masuk</button>
            </form>
          );
        }}
      </Form>
    );
  }
}

export default App;
```

## Available Props

## Available Rules

> [key] is the given data name

say your validation rule is an object like this

```javascript
rules = {
  email: ["required", "email"],
  password: ["required", "between:5:10"]
};
```

then if your email validation is failed in any rules that fail the `[key]` at yout error message will be replace with `email`

Link to using parameters

| Name          | Extra Parameter(s)                            | Default Error Message                                                        | Invalid Condition                                                                                                       |
| ------------- | --------------------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| required      | <center>-                                     | [key] field is required                                                      | 1. empty array <br /> 2. Empty Object <br /> 3. `null` or empty data                                                    |
| email         | <center>-                                     | [key] field is invalid email address                                         | Invalid email address with regex validation                                                                             |
| number        | <center>-                                     | [key] field is not a numeric value                                           | Not a Number `NaN`                                                                                                      |
| url           | <center>-                                     | [key] field is not a valid Url                                               | Invalid Url with regex validation                                                                                       |
| max           | <center>{max}                                 | [key] field cannot exceed {max} characters                                   | Data `(string)` characters length is exceed the given maximum character                                                 |
| min           | <center>{min}                                 | [key] field must be at least {min} characters                                | Data `(string)` characters length is less than the given minimun character                                              |
| lessThan      | <center>{max}                                 | [key] field must be less than {max}                                          | Data `(number)` is greater than the given maximum number                                                                |
| greaterThan   | <center>{min}                                 | [key] field must be greater than {max}                                       | Data `(number)` is less than the given minimum number                                                                   |
| between       | <center>{min}, {max}                          | [key] field must be at least {min} character and not exceed {max} characters | Data `(String)` characters length is less than the given minimum character and greater than the given maximum character |
| date          | <center>-                                     | [key] field is an invalid Date                                               | Invalid Date with javascript built in date validation                                                                   |
| ifExist       | <center>{otherField} , {otherRule}, {...rest} | the error message will be the same like the {otherRule} validation message   | When the {otherField} is exist and fail the {otherRule} validation rules.                                               |
| ifDoesntExist | <center>{otherField}, {otherRule}, {...rest}  | the error message will be the same like the {otherRule} validation message   | When the {otherField} is not exist and fail the {otherRule} validation rules.                                           |
| whenTrue      | <center> {condition}, {otherRule}, {...rest}  | the error message will be the same like the {otherRule} validation message   | when the {condtion} given is `true as a String` and fail the {otherRule} validation rules                               |
| whenFalse     | <center> {condition}, {otherRule}, {...rest}  | the error message will be the same like the {otherRule} validation message   | when the {condtion} given is `false as a String` and fail the {otherRule} validation rules                              |
| inArray       | {arrays}                                      | [key] is not included in this array {params}                                 | Data given is not included in the {arrays} arguments.                                                                   |
| startsWith    | {startWith}                                   | [key] must be start with one of this characters {params}                     | Data given is not start with the given {startWith} arguments.                                                           |
| endsWith      | {endsWith}                                    | [key] must be end with one of this characters {params}                       | Data given is not start with the given {endsWith} arguments.                                                            |

## To do

## Thanks to
