"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactMediaPlayer = require("react-media-player");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const {
  PlayPause,
  CurrentTime,
  Progress,
  SeekBar,
  Duration,
  MuteUnmute,
  Volume,
  Fullscreen
} = _reactMediaPlayer.controls;

class MediaPlayer extends _react.Component {
  render() {
    console.log("MEDIA PLAYER HAS PROPS: ", this.props);
    return /*#__PURE__*/_react.default.createElement(_reactMediaPlayer.Media, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "media"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "media-player"
    }, /*#__PURE__*/_react.default.createElement(_reactMediaPlayer.Player, {
      src: this.props.uri
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "media-controls"
    }, /*#__PURE__*/_react.default.createElement(PlayPause, null), /*#__PURE__*/_react.default.createElement(CurrentTime, null), /*#__PURE__*/_react.default.createElement(SeekBar, null), /*#__PURE__*/_react.default.createElement(Duration, null), /*#__PURE__*/_react.default.createElement(MuteUnmute, null), /*#__PURE__*/_react.default.createElement(Volume, null), /*#__PURE__*/_react.default.createElement(Fullscreen, null))));
  }

}

var _default = MediaPlayer;
exports.default = _default;