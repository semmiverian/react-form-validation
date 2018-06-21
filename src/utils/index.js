import Validate from "./Validate";
import Error from "./Error";

export default class Form {
  constructor(data, validationRules) {
    this.originalData = data;
    this.validationRules = validationRules;

    for (let field in data) {
      this[field] = data[field];
    }

    this.validator = new Validate(data);
    this.errors = new Error();
  }

  get(key) {
    return this[key];
  }

  set(data, value) {
    this[data] = value;
    const formData = this;
    let validation = this.validator.validate(formData, this.validationRules);

    if (validation.validated) {
      this.errors.clear(data);
    } else {
      this.errors.record(validation.error);
    }

    return this;
  }

  validated() {
    return this.validator.valid;
  }

  setError(errors) {
    this.errors.record(errors);

    return this;
  }

  validate() {
    const formData = this;

    let validation = this.validator.validate(formData, this.validationRules);

    return {
      validated: validation.validated,
      errors: validation.error
    };
  }
}
