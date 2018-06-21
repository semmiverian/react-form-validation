export function defaultValidation(type) {
  switch (type) {
    case "required":
      return "field is required";
    case "email":
      return "Invalid email address";
    case "number":
      return "field has to be a numeric value";
    case "url":
      return "field has to be a valid Url";
    case "max":
      return;
    default:
      return "validation failed";
  }
}
