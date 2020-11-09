"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _index = require("../actions/index");

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _reactRouter = require("react-router");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class StartTheClimb extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreUri: "http://127.0.0.1:5000/score/basecamp",
      sessionsUri: "http://127.0.0.1:5000/sessions"
    }; // Following binding required to make 'this' work in the callback

    this.startClimb = this.startClimb.bind(this);
  }

  render() {
    console.log(this.props.sessionControl.newSessionUri);

    if (this.props.sessionControl.newSessionUri) {
      window.location.assign('/Climb?session=' + this.props.sessionControl.newSessionUri);
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "loading"
      }, "Loading session");
    } else {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "sessionControls"
      }, /*#__PURE__*/_react.default.createElement("button", {
        onClick: this.startClimb
      }, "Start the climb!"));
    }
  } //	handleChange(event) { 
  //		this.setState({performerUri: event.target.value});
  //	}


  startClimb() {
    this.props.createSession(this.state.sessionsUri, this.state.scoreUri);
  }

}

function mapStateToProps({
  sessionControl
}) {
  return {
    sessionControl
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    createSession: _index.createSession
  }, dispatch);
}

(0, _reactRouter.withRouter)(StartTheClimb);

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(StartTheClimb);

exports.default = _default;