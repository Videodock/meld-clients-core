"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactMediaPlayer = require("react-media-player");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class CustomPlayPause extends _react.Component {
  constructor(props) {
    super(props);
    this._handlePlayPause = this.__handlePlayPause.bind(this);
  }

  __handlePlayPause() {
    this.props.media.playPause();
  }

  render() {
    const {
      media: {
        isPlaying
      },
      className
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("svg", {
      role: "button",
      width: "36px",
      height: "36px",
      viewBox: "0 0 36 36",
      className: className,
      onClick: this._handlePlayPause
    }, /*#__PURE__*/_react.default.createElement("circle", {
      fill: "#FFA500",
      cx: "18",
      cy: "18",
      r: "18"
    }), isPlaying && /*#__PURE__*/_react.default.createElement("g", {
      key: "pause",
      style: {
        transformOrigin: '0% 50%'
      }
    }, /*#__PURE__*/_react.default.createElement("rect", {
      x: "12",
      y: "11",
      fill: "#FFFFFF",
      width: "4",
      height: "14"
    }), /*#__PURE__*/_react.default.createElement("rect", {
      x: "20",
      y: "11",
      fill: "#FFFFFF",
      width: "4",
      height: "14"
    })), !isPlaying && /*#__PURE__*/_react.default.createElement("polygon", {
      key: "play",
      fill: "#FFFFFF",
      points: "14,11 26,18 14,25",
      style: {
        transformOrigin: '100% 50%'
      }
    }));
  }

}

var _default = (0, _reactMediaPlayer.withMediaProps)(CustomPlayPause);

exports.default = _default;