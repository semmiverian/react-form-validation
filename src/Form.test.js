import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import Form from "./Form";

const FormComponent = (data, rules, extraProps) => {
  return (
    <Form
      data={data}
      rules={rules}
      // onSubmit={this.onSubmit}
      {...extraProps}
    >
      {({ isValidate, errors, onChange, data, onSubmit }) => {
        return (
          <form onSubmit={onSubmit} data-testid={"form"}>
            {data.map(item => {
              return (
                <div key={item.key}>
                  <label>{item.key}</label>
                  <input
                    type="text"
                    data-testid={item.key}
                    onChange={onChange(item.key)}
                  />
                  {!isValidate && (
                    <span className="has-tex-error" data-testid="error-message">
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
};

afterEach(cleanup);

it("should run on submit when onSubmit children function is trigger", () => {
  const data = {
    email: "",
    password: ""
  };

  const rules = {
    email: "required",
    password: "required"
  };

  const onSubmit = jest.fn();

  const { getByText, getByTestId } = render(
    FormComponent(data, rules, { onSubmit })
  );

  fireEvent.submit(getByTestId("form"));

  expect(onSubmit).toHaveBeenCalledTimes(1);
});

it("should show an error message when the validation is failed whenever onSubmit is triggered with invalid data", () => {
  const data = { email: "", password: "" };

  const rules = { email: "required", password: "required" };

  const onSubmit = jest.fn();

  const { getAllByTestId, getByTestId } = render(
    FormComponent(data, rules, {
      onSubmit
    })
  );

  fireEvent.submit(getByTestId("form"));

  expect(getAllByTestId("error-message").length).toBe(Object.keys(data).length);
});

it("should run onChange whenever we change the value and trigger the function", () => {
  const data = { email: "", password: "" };

  const rules = { email: "required", password: "required" };

  const onChangeValue = jest.fn();

  const { getByTestId } = render(FormComponent(data, rules, { onChangeValue }));

  const email = getByTestId("email");
  const password = getByTestId("password");

  email.value = "semmivp1@gmail.com";
  password.value = "super-secret";

  fireEvent.change(email);
  fireEvent.change(password);

  expect(onChangeValue).toHaveBeenCalledTimes(2);
  expect(onChangeValue).toHaveBeenNthCalledWith(1, "email", email.value);
  expect(onChangeValue).toHaveBeenLastCalledWith("password", password.value);
});
