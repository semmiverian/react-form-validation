import Validate from "./../Validate";

function makeValidate(data = {}) {
  const validationClass = new Validate(data);
  validationClass.rawForm = {
    ...data,
    validationRules: data
  };

  return validationClass;
}

describe("Our Validation rules is working as we expected ", () => {
  it("required should fail with empty object, string, array and null", () => {
    const validation = makeValidate({ email: {} });

    const requiredObject = validation.required({}, "email");
    const requiredArray = validation.required([], "email");
    const requiredString = validation.required("", "email");
    const requiredNull = validation.required(null, "email");
    const requiredUndefined = validation.required(undefined, "email");

    expect(requiredObject.error).toBeTruthy();
    expect(requiredArray.error).toBeTruthy();
    expect(requiredString.error).toBeTruthy();
    expect(requiredNull.error).toBeTruthy();
    expect(requiredUndefined.error).toBeTruthy();
  });

  it("email should fail with invalid email", () => {
    const validation = makeValidate({ email: {} });

    const email1 = validation.email("semmivp1@gmail.com", "email");
    const email2 = validation.email("verian_semmi@yahoo.co.id", "email");
    const emailFailed = validation.email("semmi verian", "email");

    expect(email1.error).toBeFalsy();
    expect(email2.error).toBeFalsy();
    expect(emailFailed.error).toBeTruthy();
  });

  it("number should fail with NaN number given", () => {
    const validation = makeValidate({ number: {} });

    const number = validation.number(100, "number");
    const float = validation.number(10.12, "number");
    const string = validation.number("semmi verian", "number");

    expect(number.error).toBeFalsy();
    expect(float.error).toBeFalsy();
    expect(string.error).toBeTruthy();
  });

  it("url should fail with unproperly formatted url", () => {
    const validation = makeValidate({ url: {} });

    const validUrl1 = validation.url("https://www.google.com", "url");
    // const validUrl2 = validation.url('www.google.com', 'url')
    // const validUrl3 = validation.url('google.com', 'url')
    const invalidUrl = validation.url("google", "url");

    expect(validUrl1.error).toBeFalsy();
    // expect(validUrl2.error).toBeFalsy();
    // expect(validUrl3.error).toBeFalsy();
    expect(invalidUrl.error).toBeTruthy();
  });

  it("max should fail when the given string character exceed the parameter", () => {
    const validation = makeValidate({ max: {} });

    const validMax = validation.max("semmiverian", "max", [11]);
    const invalidMax = validation.max("semmiverian", "max", [10]);

    expect(validMax.error).toBeFalsy();
    expect(invalidMax.error).toBeTruthy();
  });

  it("min should fail when the given string character less than the parameter", () => {
    const validation = makeValidate({ min: {} });

    const validMin = validation.min("semmiverian", "min", [1]);
    const invalidMin = validation.min("semmiverian", "min", [12]);

    expect(validMin.error).toBeFalsy();
    expect(invalidMin.error).toBeTruthy();
  });

  it("less than should fail when number is less than the parameter", () => {
    const validation = makeValidate({ lessThan: {} });

    const validLessThan = validation.lessThan(10, "lessThan", [20]);
    const invalidLessThan = validation.lessThan(10, "lessThan", [5]);

    expect(validLessThan.error).toBeFalsy();
    expect(invalidLessThan.error).toBeTruthy();
  });

  it("greater than should fail when number is greater than the parameter", () => {
    const validation = makeValidate({ greaterThan: {} });

    const validGreaterThan = validation.greaterThan(10, "greaterThan", [8]);
    const invalidGreaterThan = validation.greaterThan(10, "greaterThan", [11]);

    expect(validGreaterThan.error).toBeFalsy();
    expect(invalidGreaterThan.error).toBeTruthy();
  });

  it("between should fail when character string is not between the parameters given", () => {
    const validation = makeValidate({ between: {} });

    const validBetween = validation.between("semmi verian", "between", [1, 12]);
    const invalidBetween = validation.between("semmi verian", "between", [
      15,
      20
    ]);

    expect(validBetween.error).toBeFalsy();
    expect(invalidBetween.error).toBeTruthy();
  });

  it("date should fail when the given data is not a valid data", () => {
    const validation = makeValidate({ date: {} });

    const validDate = validation.date("2018-06-28", "date");
    const validDate2 = validation.date("2018-06-28T07:48:00", "date");
    const invalidDate = validation.date("semmi verian", "date");

    expect(validDate.error).toBeFalsy();
    expect(validDate2.error).toBeFalsy();
    expect(invalidDate.error).toBeTruthy();
  });

  it("if exist should fail when the data is exist and the given validation is failed", () => {
    const validation = makeValidate({
      ifExist: {},
      email: "semmivp1@gmail.com"
    });

    const validIfExist = validation.ifExist(
      "data that will be passed to required",
      "ifExist",
      ["email", "required"]
    );
    const validIfExist2 = validation.ifExist(
      "data that will be passed to required",
      "ifExist",
      ["non-existence-key", "required"]
    );
    const invalidIfExist = validation.ifExist("", "ifExist", [
      "email",
      "required"
    ]);

    expect(validIfExist.error).toBeFalsy();
    expect(validIfExist2.error).toBeFalsy();
    expect(invalidIfExist.error).toBeTruthy();
  });

  it("if doesnt exist should fail when the data is exist and the given validation is failed", () => {
    const validation = makeValidate({
      ifDoesntExist: {},
      email: "semmivp1@gmail.com"
    });

    const validIfDoesntExist = validation.ifDoesntExist(
      "data that will be passed to required",
      "ifDoesntExist",
      ["email", "required"]
    );
    const validIfDoesntExist2 = validation.ifDoesntExist(
      "data that will be passed to required",
      "ifDoesntExist",
      ["non-existence-key", "required"]
    );
    const invalidIfDoesntExist = validation.ifDoesntExist("", "ifDoesntExist", [
      "non-existence-key",
      "required"
    ]);

    expect(validIfDoesntExist.error).toBeFalsy();
    expect(validIfDoesntExist2.error).toBeFalsy();
    expect(invalidIfDoesntExist.error).toBeTruthy();
  });

  it("when true should fail if the given validation is failed and string true is available", () => {
    const validation = makeValidate({ whenTrue: "", required: "" });

    const validWhenTrue = validation.whenTrue(
      "data that will be passed",
      "whenTrue",
      ["true", "required"]
    );
    const validWhenTrue2 = validation.whenTrue(
      "data that will be passed",
      "whenTrue",
      ["non-true-string", "required"]
    );
    const invalidWhenTrue = validation.whenTrue("", "whenTrue", [
      "true",
      "required"
    ]);

    expect(validWhenTrue.error).toBeFalsy();
    expect(validWhenTrue2.error).toBeFalsy();
    expect(invalidWhenTrue.error).toBeTruthy();
  });

  it("when false should fail if the given validation is failed and string false is available", () => {
    const validation = makeValidate({ whenFalse: "", required: "" });

    const validWhenFalse = validation.whenFalse(
      "data that will be passed",
      "whenFalse",
      ["false", "required"]
    );
    const validWhenFalse2 = validation.whenFalse(
      "data that will be passed",
      "whenFalse",
      ["non-true-string", "required"]
    );
    const invalidWhenFalse = validation.whenFalse("", "whenFalse", [
      "false",
      "required"
    ]);

    expect(validWhenFalse.error).toBeFalsy();
    expect(validWhenFalse2.error).toBeFalsy();
    expect(invalidWhenFalse.error).toBeTruthy();
  });

  it("in Array shoudl fail if the given data is not exists at available array data", () => {
    const data = ["indonesia", "singapore", "malaysia"];
    const validation = makeValidate({ inArray: "" });

    const validInArray = validation.inArray("indonesia", "inArray", data);
    const invalidInArray = validation.inArray("brunei", "inArray", data);

    expect(validInArray.error).toBeFalsy();
    expect(invalidInArray.error).toBeTruthy();
  });

  it("start with should fail if the array of parameters doesnot start with the given data", () => {
    const data = ["indonesia", "singapore", "malaysia"];
    const validation = makeValidate({ startsWith: "" });

    const validStartWiths = validation.startsWith("indo", "startsWith", data);
    const invalidStartWiths = validation.startsWith("brun", "startsWith", data);

    expect(validStartWiths.error).toBeFalsy();
    expect(invalidStartWiths.error).toBeTruthy();
  });

  it("end with should fail if the array of parameters doesnot end with the given data", () => {
    const data = ["indonesia", "singapore", "malaysia"];
    const validation = makeValidate({ endsWith: "" });

    const validEndsWith = validation.endsWith("nesia", "endsWith", data);
    const invalidEndsWith = validation.endsWith("brun", "endsWith", data);

    expect(validEndsWith.error).toBeFalsy();
    expect(invalidEndsWith.error).toBeTruthy();
  });
});
