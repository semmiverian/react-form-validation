import React, { Component } from "react";
import { Form } from "react-form-validation-render-props";
// import { Form } from "./dist/index";

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
  //   email: "required|email",
  //   password: "required|between:5:10"
  // };

  // rules using object and custom global message and custom message
  // errror ketika custom message nya cuman 1 padahal ada dua validation yang failed
  rules = {
    email: {
      rules: ["required", "email"],
      message: "Please allow me to filling your inbox"
    },
    password: {
      rules: "required|between:5:10",
      message: {
        required: "Allow yourself to come to our system"
        // between: "Make yourself secure"
      }
    }
  };

  onChangeValue = (key, value) => {
    this.setState({ [key]: value });
  };

  onSubmit = (e, valid) => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="App">
        <Form
          data={this.state}
          rules={this.rules}
          onSubmit={this.onSubmit}
          // validateOnChange={false}
        >
          {({ isValidate, errors, onChange, data, onSubmit }) => {
            return (
              <form onSubmit={onSubmit}>
                {data.map(item => {
                  console.log(item.key);
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
      </div>
    );
  }
}

export default App;
