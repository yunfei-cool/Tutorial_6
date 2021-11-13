"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

function IssueRow(props) {
  var issue = props.issue;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, issue.id), /*#__PURE__*/React.createElement("td", null, issue.name), /*#__PURE__*/React.createElement("td", null, issue.phone), /*#__PURE__*/React.createElement("td", null, issue.time.toDateString()));
}

function IssueTable(props) {
  var issueRows = props.issues.map(function (issue) {
    return /*#__PURE__*/React.createElement(IssueRow, {
      key: issue.id,
      issue: issue
    });
  });
  return /*#__PURE__*/React.createElement("table", {
    className: "bordered-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Phone"), /*#__PURE__*/React.createElement("th", null, "Time"))), /*#__PURE__*/React.createElement("tbody", null, issueRows));
}

var IssueAdd = /*#__PURE__*/function (_React$Component) {
  _inherits(IssueAdd, _React$Component);

  var _super = _createSuper(IssueAdd);

  function IssueAdd() {
    var _this;

    _classCallCheck(this, IssueAdd);

    _this = _super.call(this);
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(IssueAdd, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var form = document.forms.issueAdd;
      var issue = {
        name: form.name.value,
        phone: form.phone.value,
        time: form.time.value
      };
      this.props.createIssue(issue);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("form", {
        name: "issueAdd",
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "name",
        placeholder: "Name"
      }), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "phone",
        placeholder: "Phone"
      }), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "time",
        placeholder: "Time"
      }), /*#__PURE__*/React.createElement("button", null, "Add"));
    }
  }]);

  return IssueAdd;
}(React.Component);

var IssueDelete = /*#__PURE__*/function (_React$Component2) {
  _inherits(IssueDelete, _React$Component2);

  var _super2 = _createSuper(IssueDelete);

  function IssueDelete() {
    var _this2;

    _classCallCheck(this, IssueDelete);

    _this2 = _super2.call(this);
    _this2.handleSubmit = _this2.handleSubmit.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(IssueDelete, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var form = document.forms.issueDelete;
      var issue = {
        name: form.name.value
      };
      this.props.deleteIssue(issue);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("form", {
        name: "issueDelete",
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "name",
        placeholder: "Name"
      }), /*#__PURE__*/React.createElement("button", null, "Delete"));
    }
  }]);

  return IssueDelete;
}(React.Component);

var IssueShow = /*#__PURE__*/function (_React$Component3) {
  _inherits(IssueShow, _React$Component3);

  var _super3 = _createSuper(IssueShow);

  function IssueShow() {
    var _this3;

    _classCallCheck(this, IssueShow);

    _this3 = _super3.call(this);
    _this3.handleSubmit = _this3.handleSubmit.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  _createClass(IssueShow, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var form = document.forms.issueShow;
      this.props.loadData();
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("form", {
        name: "issueShow",
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/React.createElement("button", null, "Show"));
    }
  }]);

  return IssueShow;
}(React.Component);

function graphQLFetch(_x) {
  return _graphQLFetch.apply(this, arguments);
}

function _graphQLFetch() {
  _graphQLFetch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(query) {
    var variables,
        response,
        body,
        result,
        error,
        details,
        _args4 = arguments;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            variables = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
            _context4.prev = 1;
            _context4.next = 4;
            return fetch('/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query: query,
                variables: variables
              })
            });

          case 4:
            response = _context4.sent;
            _context4.next = 7;
            return response.text();

          case 7:
            body = _context4.sent;
            result = JSON.parse(body, jsonDateReviver);

            if (result.errors) {
              error = result.errors[0];

              if (error.extensions.code == 'BAD_USER_INPUT') {
                details = error.extensions.exception.errors.join('\n ');
                alert("".concat(error.message, ":\n ").concat(details));
              } else {
                alert("".concat(error.extensions.code, ": ").concat(error.message));
              }
            }

            return _context4.abrupt("return", result.data);

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](1);
            alert("Error in sending data to server: ".concat(_context4.t0.message));

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 13]]);
  }));
  return _graphQLFetch.apply(this, arguments);
}

var IssueList = /*#__PURE__*/function (_React$Component4) {
  _inherits(IssueList, _React$Component4);

  var _super4 = _createSuper(IssueList);

  function IssueList() {
    var _this4;

    _classCallCheck(this, IssueList);

    _this4 = _super4.call(this);
    _this4.state = {
      issues: [],
      isShow: 'none'
    };
    _this4.createIssue = _this4.createIssue.bind(_assertThisInitialized(_this4));
    _this4.deleteIssue = _this4.deleteIssue.bind(_assertThisInitialized(_this4));
    _this4.loadData = _this4.loadData.bind(_assertThisInitialized(_this4));
    return _this4;
  } // componentDidMount() {
  //   this.loadData();
  // }


  _createClass(IssueList, [{
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var query, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "query {\n      issueList {\n        id name phone time\n      }\n    }";
                _context.next = 3;
                return graphQLFetch(query);

              case 3:
                data = _context.sent;

                if (data) {
                  this.setState({
                    issues: data.issueList,
                    isShow: 'block'
                  });
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadData() {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "createIssue",
    value: function () {
      var _createIssue = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(issue) {
        var query, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = "mutation issueAdd($issue: IssueInputs!) {\n      issueAdd(issue: $issue) {\n        id\n      }\n    }";
                _context2.next = 3;
                return graphQLFetch(query, {
                  issue: issue
                });

              case 3:
                data = _context2.sent;

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function createIssue(_x2) {
        return _createIssue.apply(this, arguments);
      }

      return createIssue;
    }()
  }, {
    key: "deleteIssue",
    value: function () {
      var _deleteIssue = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(issue) {
        var query, data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = "mutation issueDelete($issue: Issue_2!) {\n      issueDelete(issue:$issue) {\n        id\n      }\n    }";
                _context3.next = 3;
                return graphQLFetch(query, {
                  issue: issue
                });

              case 3:
                data = _context3.sent;

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function deleteIssue(_x3) {
        return _deleteIssue.apply(this, arguments);
      }

      return deleteIssue;
    }()
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Hotel California Waitlist System"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
        style: {
          display: this.state.isShow
        }
      }, " ", /*#__PURE__*/React.createElement(IssueTable, {
        issues: this.state.issues
      }), " "), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueAdd, {
        createIssue: this.createIssue
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueDelete, {
        deleteIssue: this.deleteIssue
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueShow, {
        loadData: this.loadData
      }));
    }
  }]);

  return IssueList;
}(React.Component);

var element = /*#__PURE__*/React.createElement(IssueList, null);
ReactDOM.render(element, document.getElementById('contents'));