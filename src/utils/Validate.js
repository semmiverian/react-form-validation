export default class Validator {
  constructor(form) {
    this.form = form;
    this.valid = false;
    this.rawForm = {};
  }

  required(data, key) {
    if (data instanceof Array && data.length === 0) {
      return this.brokeValidation(key, "field is required", "required");
    }

    if (data instanceof Object && Object.keys(data).length === 0) {
      return this.brokeValidation(key, "field is required", "required");
    }

    if (!!data) {
      return this.passValidation();
    }

    return this.brokeValidation(key, "field is required", "required");
  }

  email(data, key) {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data)) {
      return this.brokeValidation(
        key,
        "field is invalid email address",
        "email"
      );
    }

    return this.passValidation();
  }

  number(data, key) {
    if (!isNaN(data)) {
      return this.passValidation();
    }
    return this.brokeValidation(key, "field is not a numeric value", "number");
  }

  url(data, key) {
    const check = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      data
    );
    // const check = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(data)

    if (check) {
      return this.passValidation();
    }

    return this.brokeValidation(key, "field is not a valid Url", "url");
  }

  max(data, key, params) {
    const [max] = params;
    if (data.length <= max || !data) {
      return this.passValidation();
    }

    return this.brokeValidation(
      key,
      `field cannot exceed ${max} characters`,
      "max"
    );
  }

  min(data, key, params) {
    const [min] = params;
    if (data.length >= min || !data) {
      return this.passValidation();
    }

    return this.brokeValidation(
      key,
      `field must be at least ${min} characters`,
      "min"
    );
  }

  lessThan(data, key, params) {
    const [max] = params;

    if (parseInt(data) < parseInt(max) || !data) {
      return this.passValidation();
    }

    return this.brokeValidation(
      key,
      `field must be less than ${max}`,
      "lessThan"
    );
  }

  greaterThan(data, key, params) {
    const [min] = params;

    if (parseInt(data) > parseInt(min) || !data) {
      return this.passValidation();
    }

    return this.brokeValidation(
      key,
      `field must be greater than ${min}`,
      "lessThan"
    );
  }

  between(data, key, params) {
    const [min, max] = params;

    if (data.length >= min && data.length <= max) {
      return this.passValidation();
    }

    return this.brokeValidation(
      key,
      `field must be at least ${min} character and not exceed ${max} characters`,
      "between"
    );
  }

  date(data, key) {
    if (!isNaN(Date.parse(data))) {
      return this.passValidation();
    }

    return this.brokeValidation(key, "field is an invalid Date", "date");
  }

  ifExist(data, key, params) {
    const [comparison, otherRule, ...rest] = params;
    if (this.rawForm[comparison]) {
      return this[otherRule](data, key, rest);
    }

    return this.passValidation();
  }

  ifDoesntExist(data, key, params) {
    const [comparison, otherRule, ...rest] = params;

    if (!this.rawForm[comparison]) {
      return this[otherRule](data, key, rest);
    }

    return this.passValidation();
  }

  whenTrue(data, key, params) {
    const [whenCondition, otherRule, ...rest] = params;

    if (whenCondition === "true") {
      return this[otherRule](data, key, rest);
    }

    return this.passValidation();
  }

  whenFalse(data, key, params) {
    const [whenCondition, otherRule, ...rest] = params;

    if (whenCondition === "false") {
      return this[otherRule](data, key, rest);
    }

    return this.passValidation();
  }

  inArray(data, key, params) {
    if (params.includes(data)) {
      return this.passValidation();
    }

    return this.brokeValidation(
      key,
      `is not included in this array ${params}`,
      "in"
    );
  }

  endsWith(data, key, params) {
    if (params.find(param => data.endsWith(param))) {
      return this.passValidation();
    }

    return this.brokeValidation(
      key,
      `must be end with one of this word ${params}`,
      "endsWith"
    );
  }

  passValidation() {
    return { error: false };
  }

  brokeValidation(key, message, type) {
    const customMessage = this.rawForm.validationRules[key].message;
    if (customMessage) {
      const errorMessage = customMessage[type] || customMessage;

      return { error: true, [key]: errorMessage, key, type };
    }
    return { error: true, [key]: `${key} ${message}`, key, type };
  }

  toObject(errors) {
    return errors.reduce((carry, item) => {
      const isUsingGlobalCustomMessage = this.isString(
        this.rawForm.validationRules[key].message
      );

      if (isUsingGlobalCustomMessage) {
        carry[item.key] = item[item.key];
      } else if (carry[item.key]) {
        carry[item.key] = carry[item.key] + ", " + item[item.key];
      } else {
        carry[item.key] = item[item.key];
      }

      return carry;
    }, {});
  }

  validate(form, rule) {
    this.rawForm = form;
    const errors = Object.keys(rule).reduce((carry, key) => {
      const validationRule = rule[key];

      if (this.isString(validationRule)) {
        const validationData = this.stringValidationhandler(
          form,
          validationRule,
          key
        );

        carry = carry.concat(validationData);
      } else if (this.isObject(validationRule)) {
        const rules = validationRule.rules;
        if (this.isArray(rules)) {
          const validationData = this.mapRules(form, rules, key);

          carry = carry.concat(validationData);
        }

        if (this.isString(rules)) {
          const validationData = this.stringValidationhandler(form, rules, key);

          carry = carry.concat(validationData);
        }
      } else if (this.isArray(validationRule)) {
        const validationData = this.mapRules(form, validationRule, key);

        carry = carry.concat(validationData);
      }

      return carry;
    }, []);

    const filterError = errors.filter(item => item.error);

    if (filterError.length === 0) {
      this.valid = true;
      return { validated: true };
    }

    this.valid = false;
    return { validated: false, error: this.toObject(filterError) };
  }

  stringValidationhandler = (form, rule, item) => {
    let carry = [];
    if (rule.includes("|")) {
      const splitData = this.mapRules(form, rule.split("|"), item);

      carry = carry.concat(splitData);
    } else {
      carry = carry.concat(this.singleRules(form, rule, item));
    }

    return carry;
  };

  mapRules = (form, rules, key) => {
    return rules.map(rule => {
      if (rule.includes(":")) {
        const [name, ...params] = rule.split(":");
        return this[name](form[key], key, params);
      }
      return this[rule](form[key], key);
    });
  };

  singleRules = (form, rule, key) => {
    let carry = [];

    if (rule.includes(":")) {
      const [name, ...params] = rule.split(":");
      carry = carry.concat(this[name](form[key], key, params));
    } else {
      carry = carry.concat(this[rule](form[key], key));
    }

    return carry;
  };

  isString = item => typeof item === "string";

  isArray = item => typeof item === "object" && Array.isArray(item);

  isObject = item => typeof item === "object" && !Array.isArray(item);
}
