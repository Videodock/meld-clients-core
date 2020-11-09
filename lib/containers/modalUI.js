"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _modalUI = require("../actions/modalUI");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class ModalUI extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: this.props.orientation ? this.props.orientation : "wide"
    };
  }

  componentDidMount() {
    // set the mode
    let mode; // if our configuration has specified a default, use that

    if (this.props.modes.hasOwnProperty("_default")) {
      mode = this.props.modes["_default"];
    } else {
      // otherwise use the first non-default
      mode = Object.keys(this.props.modes).filter(m => m !== "_default")[0];
    }

    mode = mode ? mode : "_NO_MODE_DEFINED";
    this.props.setMode(mode);
  }

  render() {
    if (this.props.modalUI.mode) {
      const mode = this.props.modalUI["mode"];
      console.log("Looking up ", mode, " in ", this.props.modes);
      console.log(this.props.modes[mode]);
      const constituents = this.props.modes[mode].map(c => {
        const classNameString = this.props.modalUI.constituents.has(c["id"]) ? "constituent active" : "constituent";
        return /*#__PURE__*/_react.default.createElement("div", {
          className: classNameString,
          key: c["id"],
          id: c["id"],
          onClick: e => this.props.constituentClicked(e)
        }, c.hasOwnProperty("image") && /*#__PURE__*/_react.default.createElement("img", {
          src: c["image"],
          alt: c["label"],
          title: c["label"]
        }), !c.hasOwnProperty("image") && /*#__PURE__*/_react.default.createElement("div", {
          className: "label"
        }, c["label"]));
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        id: "modalPane",
        className: this.state.orientation
      }, constituents);
    } else {
      return /*#__PURE__*/_react.default.createElement("div", null, "Loading...");
    }
  }

}

function mapStateToProps({
  modalUI
}) {
  return {
    modalUI
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    constituentClicked: _modalUI.constituentClicked,
    setMode: _modalUI.setMode
  }, dispatch);
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ModalUI);

exports.default = _default;