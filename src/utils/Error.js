export default class Error {
  constructor() {
    this.errors = {};
  }

  record(errors) {
    this.errors = errors;

    return this;
  }

  set(key, val) {
    this.errors = {
      ...this.errors,
      [key]: val
    };

    return this;
  }

  get(field) {
    return this.errors[field] || null;
  }

  has(field) {
    return !!this.errors[field];
  }

  all() {
    return this.errors;
  }

  clear(field) {
    if (field instanceof Array) {
      field.forEach(field => delete this.errors[field]);

      return this;
    }

    if (field) {
      delete this.errors[field];

      return this;
    }

    this.errors = {};

    return this;
  }
}
