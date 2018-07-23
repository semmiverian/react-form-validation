import Form from "./../index";

describe("Validation with different type of rules being called", () => {
  it("can validate data with rules using string", () => {
    const rules = {
      email: "required|email",
      password: "required|between:5:10"
    };

    const data = {
      email: "semmivp1@gmail.com",
      password: "secret"
    };

    const form = new Form(data, rules);

    const validation = form.validate();

    expect(validation.validated).toBeTruthy();
    expect(validation.errors).toBeUndefined();
  });

  it("can validate data with rules using array", () => {
    const rules = {
      email: ["required", "email"],
      password: ["required", "between:5:10"]
    };

    const data = { email: "semmivp1@gmail.com", password: "secret" };

    const form = new Form(data, rules);

    const validation = form.validate();

    expect(validation.validated).toBeTruthy();
    expect(validation.errors).toBeUndefined();
  });

  it("can validate data with rules using object", () => {
    const rules = {
      email: {
        rules: ["required", "email"]
      }
    };

    const data = {
      email: "semmivp1@gmail.com"
    };

    const form = new Form(data, rules);

    const validation = form.validate();
    expect(validation.validated).toBeTruthy();
    expect(validation.errors).toBeUndefined();
  });
});

describe("Validation will show error message when failed the validation rules", () => {
  it("should show default message when failed the validation rules", () => {
    const rules = {
      email: "required|email",
      password: "required|between:5:10"
    };

    const data = {
      email: "",
      password: ""
    };

    const form = new Form(data, rules);

    const validaton = form.validate();

    expect(validaton.validated).toBeFalsy();

    expect(validaton.errors.email).toBe(
      "email field is required, email field is invalid email address"
    );
    expect(validaton.errors.password).toBe(
      "password field is required, password field must be at least 5 character and not exceed 10 characters"
    );
  });

  it("should show global custom message if provided using object rules validation", () => {
    const rules = {
      email: {
        rules: ["required", "email"],
        message: "Please allow me to filling your inbox"
      }
    };

    const data = { email: "" };

    const form = new Form(data, rules);

    const validation = form.validate();

    expect(validation.validated).toBeFalsy();
    expect(validation.errors.email).toBe(
      "Please allow me to filling your inbox"
    );
  });

  it("should show custom message for each provided key in the message object", () => {
    const rules = {
      email: {
        rules: ["required", "email"],
        message: {
          required: "You shall pass if you fill this",
          email: "Allow me to spam your mail"
        }
      }
    };

    const data = { email: "" };

    const form = new Form(data, rules);

    const validation = form.validate();

    expect(validation.validated).toBeFalsy();

    expect(validation.errors.email).toBe(
      "You shall pass if you fill this, Allow me to spam your mail"
    );
  });

  it("can mix custom message and default message if the key for failed validation not exist", () => {
    const rules = {
      email: {
        rules: ["required", "email"],
        message: {
          required: "You shall pass if you fill this"
        }
      }
    };

    const data = { email: "" };

    const form = new Form(data, rules);

    const validation = form.validate();

    expect(validation.validated).toBeFalsy();

    expect(validation.errors.email).toBe(
      "You shall pass if you fill this, email field is invalid email address"
    );
  });
});
