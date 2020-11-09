"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _score = _interopRequireDefault(require("../containers/score"));

var _modalUI = _interopRequireDefault(require("../containers/modalUI"));

var _deliusModes = require("../../config/deliusModes");

var _modalUI2 = require("../actions/modalUI");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class ModalTest extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      modes: _deliusModes.modes
    };
  }

  componentDidMount() {
    console.log("I've found these notes: ", document.querySelectorAll('.note'));
  }

  componentWillReceiveProps(nextProps) {
    // this is where we do app-specific logic for the modal UI
    if (this.props.modalUI.mode == "baseMode" && nextProps.modalUI.constituents.has("dynamics")) {
      // user has selected dynamics - clear selections, and switch modes
      this.props.clearConstituents();
      this.props.setMode("dynamicsMode");
    }
  }

  render() {
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("link", {
      rel: "stylesheet",
      href: "../../style/modalUI.css",
      type: "text/css"
    }), /*#__PURE__*/_react.default.createElement(_modalUI.default, {
      modes: this.state.modes,
      orientation: "wide"
    }), /*#__PURE__*/_react.default.createElement(_score.default, {
      uri: "http://meld.linkedmusic.org/mei/Late_Swallows-dolet-musescore-II.mei",
      onClick: e => this.handleScoreClick(e),
      ref: "score"
    }));
  }

  handleScoreClick(e) {
    console.log("score clicked: ", e);
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
    setMode: _modalUI2.setMode,
    clearConstituents: _modalUI2.clearConstituents
  }, dispatch);
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ModalTest);

exports.default = _default;