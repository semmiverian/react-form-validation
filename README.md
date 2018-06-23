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
      message: "Please allow me to fill your inbox"
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
        onChangeValue={ths.onChangeValue}
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

| Name             | Type                     | Description                                                                                                        | Example                                                                                    | Parameters                                                                                                               |
| ---------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| data             | `Object`                 | Data that will be validated                                                                                        | `data={email: 'semmivp1@gmail.com, fullName: 'semmi verian}`                               |
| rules            | `Object/ String / Array` | Collection of rules that will run the validation                                                                   | [More Detail](#rules)                                                                      |
| onChangeValue    | `function`               | Function that will be called whenever internal `onChange` function is triggered                                    | the `key` and the `value` of what data is being updated.                                   | 1. `key` => the key of data which is being updated <br /> 2. `value` => the updated value                                |
| onSubmit         | `function`               | Function that will be called whenever interval `onSubmit` function is triggered                                    | `onSubmit=function onSubmit (e, valid) { // code here }`                                   | 1. `e` => event that being triggered <br /> 2. `valid` => flag that will tell whether the validation is passed or failed |
| children         | `function`               | Children function that will be rendered whatever view you want with utilities given from the library               | `children=({ isValidate, errors, onChange, data, onSubmit }) => {})` <br /> Link ke detail | [More Detail](#children-function)                                                                                        |
| validateOnChange | `boolean`                | Flag that tell library to validate user input whenever internal `onChange` function is triggered default to `true` | validateOnChange={true}                                                                    |

## Children Function

By Using Children function you have 100% authority to use whatever style you want that will be apply to this library.

There are two options for you to define the Children props. You can choose what ever style you prefer to define the children function.

The First Option

```Javascript
<Form
children={({ isValidate, errors, onChange, data, onSubmit }) => {
    return (<form></form>)
}}></Form>
```

The Second Option

```javascript
<Form>
  {({ isValidate, errors, onChange, data, onSubmit }) => {
    return <form />;
  }}
</Form>
```

#### Arguments in the children function

In this section we will cover each argument that available inside our children function

Example

```javascript
<Form>
  {({ isValidate, errors, onChange, data, onSubmit }) => {
    return <form />;
  }}
</Form>
```

##### data

is an `Array` that you can use to reference what data is available for you to render.

data structure

```javascript
[
  { key: "email", value: "semmivp1@gmail.com" },
  { key: "fullName", value: "semmi verian putera" }
];
```

example

```javascript
{
  ({ isValidate, errors, onChange, data, onSubmit }) => {
    return (
      <form onSubmit={onSubmit}>
        {data.map(item => {
          return (
            <div key={item.key}>
              <label>{item.key}</label>
              <input type="text" onChange={onChange(item.key)} />
              {!isValidate && (
                <span className="has-tex-error">{errors.get(item.key)}</span>
              )}
            </div>
          );
        })}
        <button type="submit">Masuk</button>
      </form>
    );
  };
}
```

In above example we use the `data` arguments to map all available data from our inner component to render at consumer component.

##### isValidate

is a `boolean` to tell you whether all the validation rules is success or failed

##### errors

is a `Class` that will tell you what are the errors for the failed validation

to get the errors for the given key you can use our function like this

```javascript
<span className="has-tex-error">{errors.get(item.key)}</span>
```

it will return whatever error message that exist at the given key.

##### onChange

is a `function` that you should apply to let our internal component know what changes from the consumer component and will trigger the validation rules if you set the `validateOnChange` flag to `true`. Whenever this function is called our internal component will trigger a props function `onChangeValue` so you can update your state whenever the input is changing. This function need one arguments which is the key will be updated by the new value. In the above example if we define `"email"` as the argument then our component will update the `"email"` value at our internal component state.

example

```javascript
 <input type="text" onChange={onChange("email")}
```

#### onSubmit

is a `function` that will trigger our validation to run to every data. Whenever it called it will trigger the props `onSubmit` with two arguments `e` and `valid`.

example

```javascript
{
  ({ isValidate, errors, onChange, onSubmit }) => {
    return <form onSubmit={onSubmit} />;
  };
}
```

## Rules

##### Relation between Rule and Data

every rules need an object with `[key]: [value]` pair like this example.

```javascript
 rules = {
    email: ["required", "email"],
    password: ["required", "between:5:10"]
  };

 data = {
    email: "semmivp1@gmail.com",
    password: "secret"
  }

  <Form data={data} rules={rules}></Form>
```

the key `email` at rules object will be used to find the value at data object to be validate.

so in the above example the rule `required and email` in the `email` key at rules object will be validate against `semmivp1@gmail.com` in the `email` key at data object.

##### Using Parameters

Some Validation rules need more arguments beside the `data` to be working properly, you can defining arguments in every rules type `Array|String|Object` by using separator `:` the first encounter `:` will be first arguments and so on and so forth.

Example

```javascript
// between validation
{
  password: "between:5:10";
}
```

in above example 5 will be the first argument and define as variable `min` in our `between` validation rule and 10 will be the second argument and define as variable `max` in our `between` validation rule.

##### Rules As Array

You can use Array as your rules collection like this

```javascript
rules = {
  email: ["required", "email"],
  password: ["required", "between:5:10"]
};
```

##### Rules As String

You can use String as your rules collection like this. You can use multiple validation rule for one data by using separator `|`

```javascript
rules = {
  email: "required|email",
  password: "required|between:5:10"
};
```

##### Rules As Object and Custom error message

By using Object you will have to define two key for the rule working properly the first one is `rule` that will tell what `rule` should be implemented and the other will be the message that will overwrite the default error message

###### Custom message For every fail rule

```javascript
{
    email: {
      rules: ["required", "email"],
      message: "Please allow me to fill your inbox"
    }
}
```

by using `String` as the `message` value that string will override every fail validation rules.

###### Custom message For detail fail rule

```javascript
{
    password: {
      rules: "required|between:5:10",
      message: {
        required: "Allow yourself to come to our system",
        between: "Make yourself secure"
      }
    }
}
```

by using `Object` as the `message` value the error message will be override the key provided by user.

as default required error message is

```
    field is required
```

but if you are using the custom message for the required (key) the error will be override with the given message.

```
Allow yourself to come to our system
```

##### Available Rules

```
 [key] is the given data name
```

say your validation rule is an object like this

```javascript
rules = {
  email: ["required", "email"],
  password: ["required", "between:5:10"]
};
```

then if your email validation is failed in any rules that fail the `[key]` at yout error message will be replace with `email`

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
