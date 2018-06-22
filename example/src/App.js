import React, { Component } from "react";
// import { Form } from "react-form-validation-render-props";
import { Form } from "./dist/index";

class App extends Component {
  state = {
    email: "",
    password: ""
  };

  rules = {
    email: ["required", "email"],
    password: ["required", "between:5:10"]
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
          onChangeValue={this.onChangeValue}
          onSubmit={this.onSubmit}
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
      </div>
    );
  }
}

export default App;
