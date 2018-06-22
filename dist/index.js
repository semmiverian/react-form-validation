!(function(e, t) {
  for (var r in t) e[r] = t[r];
})(
  exports,
  (function(e) {
    var t = {};
    function r(n) {
      if (t[n]) return t[n].exports;
      var a = (t[n] = { i: n, l: !1, exports: {} });
      return e[n].call(a.exports, a, a.exports, r), (a.l = !0), a.exports;
    }
    return (
      (r.m = e),
      (r.c = t),
      (r.d = function(e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
      }),
      (r.r = function(e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (r.t = function(e, t) {
        if ((1 & t && (e = r(e)), 8 & t)) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (
          (r.r(n),
          Object.defineProperty(n, "default", { enumerable: !0, value: e }),
          2 & t && "string" != typeof e)
        )
          for (var a in e)
            r.d(
              n,
              a,
              function(t) {
                return e[t];
              }.bind(null, a)
            );
        return n;
      }),
      (r.n = function(e) {
        var t =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return r.d(t, "a", t), t;
      }),
      (r.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (r.p = ""),
      r((r.s = 9))
    );
  })([
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n =
          Object.assign ||
          function(e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t];
              for (var n in r)
                Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
            }
            return e;
          },
        a = (function() {
          function e(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function(t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t;
          };
        })();
      var i = (function() {
        function e() {
          !(function(e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
            (this.errors = {});
        }
        return (
          a(e, [
            {
              key: "record",
              value: function(e) {
                return (this.errors = e), this;
              }
            },
            {
              key: "set",
              value: function(e, t) {
                return (
                  (this.errors = n(
                    {},
                    this.errors,
                    (function(e, t, r) {
                      return (
                        t in e
                          ? Object.defineProperty(e, t, {
                              value: r,
                              enumerable: !0,
                              configurable: !0,
                              writable: !0
                            })
                          : (e[t] = r),
                        e
                      );
                    })({}, e, t)
                  )),
                  this
                );
              }
            },
            {
              key: "get",
              value: function(e) {
                return this.errors[e] || null;
              }
            },
            {
              key: "has",
              value: function(e) {
                return !!this.errors[e];
              }
            },
            {
              key: "all",
              value: function() {
                return this.errors;
              }
            },
            {
              key: "clear",
              value: function(e) {
                var t = this;
                return e instanceof Array
                  ? (e.forEach(function(e) {
                      return delete t.errors[e];
                    }),
                    this)
                  : e
                    ? (delete this.errors[e], this)
                    : ((this.errors = {}), this);
              }
            }
          ]),
          e
        );
      })();
      t.default = i;
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = (function() {
          function e(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function(t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t;
          };
        })(),
        a = o(r(5)),
        i = o(r(0));
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var u = (function() {
        function e(t, r) {
          for (var n in ((function(e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
          (this.originalData = t),
          (this.validationRules = r),
          t))
            this[n] = t[n];
          (this.validator = new a.default(t)), (this.errors = new i.default());
        }
        return (
          n(e, [
            {
              key: "get",
              value: function(e) {
                return this[e];
              }
            },
            {
              key: "set",
              value: function(e, t) {
                this[e] = t;
                var r = this.validator.validate(this, this.validationRules);
                return (
                  r.validated
                    ? this.errors.clear(e)
                    : this.errors.record(r.error),
                  this
                );
              }
            },
            {
              key: "validated",
              value: function() {
                return this.validator.valid;
              }
            },
            {
              key: "setError",
              value: function(e) {
                return this.errors.record(e), this;
              }
            },
            {
              key: "validate",
              value: function() {
                var e = this.validator.validate(this, this.validationRules);
                return { validated: e.validated, errors: e.error };
              }
            }
          ]),
          e
        );
      })();
      t.default = u;
    },
    function(e, t, r) {
      e.exports = r(7)();
    },
    function(e, t) {
      e.exports = require("react");
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = (function() {
          function e(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function(t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t;
          };
        })(),
        a = r(3),
        i = (s(a), s(r(2))),
        o = s(r(1)),
        u = s(r(0));
      function s(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function l(e, t, r) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
            : (e[t] = r),
          e
        );
      }
      function f(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
      }
      var c = (function(e) {
        function t() {
          var e, r, n;
          !(function(e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, t);
          for (var a = arguments.length, i = Array(a), s = 0; s < a; s++)
            i[s] = arguments[s];
          return (
            (r = n = f(
              this,
              (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(
                e,
                [this].concat(i)
              )
            )),
            (n.state = { isValid: !0, errors: new u.default() }),
            (n.onChange = function(e) {
              var t = n.props,
                r = t.name,
                a = t.rules,
                i = e.target.value;
              n.setState(function(e) {
                return { errors: e.errors.clear([r]) };
              });
              var u = new o.default(l({}, r, i), l({}, r, a)).validate();
              u.validated ||
                n.setState(function(e) {
                  return { isValid: !1, errors: e.errors.record(u.errors) };
                }),
                n.props.onChangeValue(i);
            }),
            f(n, r)
          );
        }
        return (
          (function(e, t) {
            if ("function" != typeof t && null !== t)
              throw new TypeError(
                "Super expression must either be null or a function, not " +
                  typeof t
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            })),
              t &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, t)
                  : (e.__proto__ = t));
          })(t, a.Component),
          n(t, [
            {
              key: "render",
              value: function() {
                var e = this.state,
                  t = e.isValidate,
                  r = e.errors;
                return this.props.children({
                  isValidate: t,
                  errors: r,
                  onChange: this.onChange
                });
              }
            }
          ]),
          t
        );
      })();
      (c.propTypes = {
        value: i.default.oneOfType([i.default.string, i.default.number]),
        rules: i.default.string,
        name: i.default.string
      }),
        (t.default = c);
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function(e) {
                return typeof e;
              }
            : function(e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              },
        a = (function() {
          return function(e, t) {
            if (Array.isArray(e)) return e;
            if (Symbol.iterator in Object(e))
              return (function(e, t) {
                var r = [],
                  n = !0,
                  a = !1,
                  i = void 0;
                try {
                  for (
                    var o, u = e[Symbol.iterator]();
                    !(n = (o = u.next()).done) &&
                    (r.push(o.value), !t || r.length !== t);
                    n = !0
                  );
                } catch (e) {
                  (a = !0), (i = e);
                } finally {
                  try {
                    !n && u.return && u.return();
                  } finally {
                    if (a) throw i;
                  }
                }
                return r;
              })(e, t);
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          };
        })(),
        i = (function() {
          function e(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function(t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t;
          };
        })();
      function o(e, t, r) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
            : (e[t] = r),
          e
        );
      }
      function u(e) {
        return Array.isArray(e) ? e : Array.from(e);
      }
      var s = (function() {
          function e(t) {
            !(function(e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, e),
              l.call(this),
              (this.form = t),
              (this.valid = !1),
              (this.rawForm = {});
          }
          return (
            i(e, [
              {
                key: "required",
                value: function(e, t) {
                  return e instanceof Array && 0 === e.length
                    ? this.brokeValidation(t, "field is required", "required")
                    : e instanceof Object && 0 === Object.keys(e).length
                      ? this.brokeValidation(t, "field is required", "required")
                      : e
                        ? this.passValidation()
                        : this.brokeValidation(
                            t,
                            "field is required",
                            "required"
                          );
                }
              },
              {
                key: "email",
                value: function(e, t) {
                  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e)
                    ? this.passValidation()
                    : this.brokeValidation(t, "Invalid email address", "email");
                }
              },
              {
                key: "number",
                value: function(e, t) {
                  return isNaN(e)
                    ? this.brokeValidation(
                        t,
                        "field has to be a numeric value",
                        "number"
                      )
                    : this.passValidation();
                }
              },
              {
                key: "url",
                value: function(e, t) {
                  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
                    e
                  )
                    ? this.passValidation()
                    : this.brokeValidation(
                        t,
                        "field has to be a valid Url",
                        "url"
                      );
                }
              },
              {
                key: "max",
                value: function(e, t, r) {
                  var n = a(r, 1)[0];
                  return e.length <= n || !e
                    ? this.passValidation()
                    : this.brokeValidation(
                        t,
                        "field cannot exceed " + n + " characters",
                        "max"
                      );
                }
              },
              {
                key: "min",
                value: function(e, t, r) {
                  var n = a(r, 1)[0];
                  return e.length >= n || !e
                    ? this.passValidation()
                    : this.brokeValidation(
                        t,
                        "field must be at least " + n + " characters",
                        "min"
                      );
                }
              },
              {
                key: "lessThan",
                value: function(e, t, r) {
                  var n = a(r, 1)[0];
                  return parseInt(e) < parseInt(n) || !e
                    ? this.passValidation()
                    : this.brokeValidation(
                        t,
                        "field must be less than " + n,
                        "lessThan"
                      );
                }
              },
              {
                key: "greaterThan",
                value: function(e, t, r) {
                  var n = a(r, 1)[0];
                  return parseInt(e) > parseInt(n) || !e
                    ? this.passValidation()
                    : this.brokeValidation(
                        t,
                        "field must be greater than " + n,
                        "lessThan"
                      );
                }
              },
              {
                key: "between",
                value: function(e, t, r) {
                  var n = a(r, 2),
                    i = n[0],
                    o = n[1];
                  return e.length >= i && e.length <= o
                    ? this.passValidation()
                    : this.brokeValidation(
                        t,
                        "field must be at least " +
                          i +
                          " character and not exceed " +
                          o +
                          " characters",
                        "between"
                      );
                }
              },
              {
                key: "date",
                value: function(e, t) {
                  return isNaN(Date.parse(e))
                    ? this.brokeValidation(
                        t,
                        "field must be a valid Date",
                        "date"
                      )
                    : this.passValidation();
                }
              },
              {
                key: "ifExist",
                value: function(e, t, r) {
                  var n = u(r),
                    a = n[0],
                    i = n[1],
                    o = n.slice(2);
                  return this.rawForm[a]
                    ? this[i](e, t, o)
                    : this.passValidation();
                }
              },
              {
                key: "ifDoesntExist",
                value: function(e, t, r) {
                  var n = u(r),
                    a = n[0],
                    i = n[1],
                    o = n.slice(2);
                  return this.rawForm[a]
                    ? this.passValidation()
                    : this[i](e, t, o);
                }
              },
              {
                key: "whenTrue",
                value: function(e, t, r) {
                  var n = u(r),
                    a = n[0],
                    i = n[1],
                    o = n.slice(2);
                  return "true" === a
                    ? this[i](e, t, o)
                    : this.passValidation();
                }
              },
              {
                key: "whenFalse",
                value: function(e, t, r) {
                  var n = u(r),
                    a = n[0],
                    i = n[1],
                    o = n.slice(2);
                  return (
                    console.log(a),
                    "false" === a ? this[i](e, t, o) : this.passValidation()
                  );
                }
              },
              {
                key: "inArray",
                value: function(e, t, r) {
                  return r.includes(e)
                    ? this.passValidation()
                    : this.brokeValidation(t, "must be one of this", "in");
                }
              },
              {
                key: "endsWith",
                value: function(e, t, r) {
                  return r.find(function(t) {
                    return e.endsWith(t);
                  })
                    ? this.passValidation()
                    : this.brokeValidation(t, "must be end with", "endsWith");
                }
              },
              {
                key: "passValidation",
                value: function() {
                  return { error: !1 };
                }
              },
              {
                key: "brokeValidation",
                value: function(e, t, r) {
                  var n,
                    a,
                    i = this.rawForm.validationRules[e].message;
                  return i
                    ? (o((a = { error: !0 }), e, i[r] || i),
                      o(a, "key", e),
                      o(a, "type", r),
                      a)
                    : (o((n = { error: !0 }), e, e + " " + t),
                      o(n, "key", e),
                      o(n, "type", r),
                      n);
                }
              },
              {
                key: "toObject",
                value: function(e) {
                  return e.reduce(function(e, t) {
                    return (
                      e[t.key]
                        ? (e[t.key] = e[t.key] + ", " + t[t.key])
                        : (e[t.key] = t[t.key]),
                      e
                    );
                  }, {});
                }
              },
              {
                key: "validate",
                value: function(e, t) {
                  var r = this;
                  this.rawForm = e;
                  var n = Object.keys(t)
                    .reduce(function(n, a) {
                      var i = t[a];
                      if (r.isString(i)) {
                        var o = r.stringValidationhandler(e, i, a);
                        n = n.concat(o);
                      } else if (r.isObject(i)) {
                        var u = i.rules;
                        if (r.isArray(u)) {
                          var s = r.mapRules(e, u, a);
                          n = n.concat(s);
                        }
                        if (r.isString(u)) {
                          var l = r.stringValidationhandler(e, u, a);
                          n = n.concat(l);
                        }
                      } else if (r.isArray(i)) {
                        var f = r.mapRules(e, i, a);
                        n = n.concat(f);
                      }
                      return n;
                    }, [])
                    .filter(function(e) {
                      return e.error;
                    });
                  return 0 === n.length
                    ? ((this.valid = !0), { validated: !0 })
                    : ((this.valid = !1),
                      { validated: !1, error: this.toObject(n) });
                }
              }
            ]),
            e
          );
        })(),
        l = function() {
          var e = this;
          (this.stringValidationhandler = function(t, r, n) {
            var a = [];
            if (r.includes("|")) {
              var i = e.mapRules(t, r.split("|"), n);
              a = a.concat(i);
            } else a = a.concat(e.singleRules(t, r, n));
            return a;
          }),
            (this.mapRules = function(t, r, n) {
              return r.map(function(r) {
                if (r.includes(":")) {
                  var a = u(r.split(":")),
                    i = a[0],
                    o = a.slice(1);
                  return e[i](t[n], n, o);
                }
                return e[r](t[n], n);
              });
            }),
            (this.singleRules = function(t, r, n) {
              var a = [];
              if (r.includes(":")) {
                var i = u(r.split(":")),
                  o = i[0],
                  s = i.slice(1);
                a = a.concat(e[o](t[n], n, s));
              } else a = a.concat(e[r](t[n], n));
              return a;
            }),
            (this.isString = function(e) {
              return "string" == typeof e;
            }),
            (this.isArray = function(e) {
              return (
                "object" === (void 0 === e ? "undefined" : n(e)) &&
                Array.isArray(e)
              );
            }),
            (this.isObject = function(e) {
              return (
                "object" === (void 0 === e ? "undefined" : n(e)) &&
                !Array.isArray(e)
              );
            });
        };
      t.default = s;
    },
    function(e, t, r) {
      "use strict";
      e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    },
    function(e, t, r) {
      "use strict";
      var n = r(6);
      function a() {}
      e.exports = function() {
        function e(e, t, r, a, i, o) {
          if (o !== n) {
            var u = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw ((u.name = "Invariant Violation"), u);
          }
        }
        function t() {
          return e;
        }
        e.isRequired = e;
        var r = {
          array: e,
          bool: e,
          func: e,
          number: e,
          object: e,
          string: e,
          symbol: e,
          any: e,
          arrayOf: t,
          element: e,
          instanceOf: t,
          node: e,
          objectOf: t,
          oneOf: t,
          oneOfType: t,
          shape: t,
          exact: t
        };
        return (r.checkPropTypes = a), (r.PropTypes = r), r;
      };
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n =
          Object.assign ||
          function(e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t];
              for (var n in r)
                Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
            }
            return e;
          },
        a = (function() {
          return function(e, t) {
            if (Array.isArray(e)) return e;
            if (Symbol.iterator in Object(e))
              return (function(e, t) {
                var r = [],
                  n = !0,
                  a = !1,
                  i = void 0;
                try {
                  for (
                    var o, u = e[Symbol.iterator]();
                    !(n = (o = u.next()).done) &&
                    (r.push(o.value), !t || r.length !== t);
                    n = !0
                  );
                } catch (e) {
                  (a = !0), (i = e);
                } finally {
                  try {
                    !n && u.return && u.return();
                  } finally {
                    if (a) throw i;
                  }
                }
                return r;
              })(e, t);
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance"
            );
          };
        })(),
        i = (function() {
          function e(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function(t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t;
          };
        })(),
        o = r(3),
        u = (f(o), f(r(2))),
        s = f(r(1)),
        l = f(r(0));
      function f(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function c(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
      }
      var d = (function(e) {
        function t() {
          var e, r, i;
          !(function(e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, t);
          for (var o = arguments.length, u = Array(o), f = 0; f < o; f++)
            u[f] = arguments[f];
          return (
            (r = i = c(
              this,
              (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(
                e,
                [this].concat(u)
              )
            )),
            (i.toArray = function(e) {
              return Object.entries(e).reduce(function(e, t) {
                var r = a(t, 2),
                  n = r[0],
                  i = r[1];
                return e.concat({ key: n, value: i });
              }, []);
            }),
            (i.state = {
              isValid: !0,
              errors: new l.default(),
              data: i.toArray(i.props.data)
            }),
            (i.onChange = function(e) {
              return function(t) {
                var r = t.target.value;
                i.props.validateOnChange &&
                  i.validate(
                    (function(e, t, r) {
                      return (
                        t in e
                          ? Object.defineProperty(e, t, {
                              value: r,
                              enumerable: !0,
                              configurable: !0,
                              writable: !0
                            })
                          : (e[t] = r),
                        e
                      );
                    })({}, e, r)
                  ),
                  i.props.onChangeValue && i.props.onChangeValue(e, r);
              };
            }),
            (i.onSubmit = function(e) {
              var t = i.validate();
              i.props.onSubmit && i.props.onSubmit(e, t.validated);
            }),
            (i.validate = function(e) {
              var t = i.props,
                r = t.rules,
                a = t.data,
                o = n({}, a, e),
                u = new s.default(o, n({}, r)).validate();
              if (!u.validated)
                return (
                  i.setState(function(e) {
                    return { isValid: !1, errors: e.errors.record(u.errors) };
                  }),
                  u
                );
            }),
            c(i, r)
          );
        }
        return (
          (function(e, t) {
            if ("function" != typeof t && null !== t)
              throw new TypeError(
                "Super expression must either be null or a function, not " +
                  typeof t
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }
            })),
              t &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, t)
                  : (e.__proto__ = t));
          })(t, o.Component),
          i(t, [
            {
              key: "render",
              value: function() {
                var e = this.state,
                  t = e.isValidate,
                  r = e.errors,
                  n = e.data;
                return this.props.children({
                  isValidate: t,
                  errors: r,
                  onChange: this.onChange,
                  data: n,
                  onSubmit: this.onSubmit
                });
              }
            }
          ]),
          t
        );
      })();
      (d.propTypes = {
        data: u.default.object,
        rules: u.default.oneOfType([
          u.default.string,
          u.default.object,
          u.default.array
        ]),
        name: u.default.string
      }),
        (d.defaultProps = { validateOnChange: !0 }),
        (t.default = d);
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }), (t.Form = void 0);
      var n = a(r(8));
      a(r(4));
      function a(e) {
        return e && e.__esModule ? e : { default: e };
      }
      t.Form = n.default;
    }
  ])
);
