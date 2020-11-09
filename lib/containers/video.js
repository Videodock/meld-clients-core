"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _reactMediaPlayer = require("react-media-player");

var _reactMediaPlayerPlayPause = _interopRequireDefault(require("../containers/react-media-player-play-pause"));

var _index = require("../actions/index");

var _reactTabs = require("react-tabs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const {
  defaultPlayPause,
  CurrentTime,
  Progress,
  SeekBar,
  Duration,
  MuteUnmute,
  Volume,
  Fullscreen
} = _reactMediaPlayer.controls;

class Video extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      jumpedTime: false,
      lastMediaTick: 0
    };
    this.tick = this.tick.bind(this); //		this.clearCursor= this.clearCursor.bind(this);
  }

  inViewRefs() {}

  componentWillReceiveProps() {
    if (this.state.jumpedTime) this.setState({
      jumpedTime: false
    });
  }

  componentWillMount() {//		clockProvider = this.props.uri;
    //		this.props.registerClock(this.props.uri);
  }

  componentDidMount() {}

  componentDidUpdate() {}

  tick(id, t) {
    if (Math.floor(t.currentTime) > this.state.lastMediaTick || // if we've progressed across the next second boundary, 
    t.currentTime < this.state.lastMediaTick) {
      // OR if we've gone back in time (user did a seek)...
      this.setState({
        lastMediaTick: Math.floor(t.currentTime)
      }); // keep track of this time tick)
      // dispatch a "TICK" action 
      // any time-sensitive component subscribes to it, 
      // triggering time-anchored annotations triggered as appropriate

      this.props.tickTimedResource(id, Math.floor(t.currentTime));
    }
  }

  render() {
    console.log(this.props.timesync);
    var cT = this.props.timesync && "mediaResources" in this.props.timesync && this.props.uri in this.props.timesync.mediaResources ? this.props.timesync.mediaResources[this.props.uri]['currentTime'] : 0;
    /*
    console.log(this.props.timesync);
    if(this.props.timesync && "mediaResources" in this.props.timesync
    	 && clockProvider in this.props.timesync.mediaResources){
    	cT = this.props.timesync.mediaResources[clockProvider]['currentTime'];
    	var syncs = this.props.timesync.mediaResources[clockProvider]['times'];
    	var times = Object.keys(syncs).map((t)=> Number(t));
    	console.log(times, syncs);
    }*/

    return /*#__PURE__*/_react.default.createElement(_reactMediaPlayer.Media, {
      key: this.props.uri,
      className: "videoEssay"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "media videoEssay"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "media-player"
    }, /*#__PURE__*/_react.default.createElement(_reactMediaPlayer.Player, {
      width: "700px",
      src: this.props.uri,
      onTimeUpdate: t => {
        this.tick(this.props.uri, t);
      },
      defaultCurrentTime: cT
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "media-controls"
    }, /*#__PURE__*/_react.default.createElement(_reactMediaPlayerPlayPause.default, null), /*#__PURE__*/_react.default.createElement(SeekBar, null), /*#__PURE__*/_react.default.createElement("div", {
      className: "media-info"
    }, /*#__PURE__*/_react.default.createElement(CurrentTime, null), /*#__PURE__*/_react.default.createElement("span", null, "/"), /*#__PURE__*/_react.default.createElement(Duration, null)))));
  }

}

function mapStateToProps({
  graph,
  timesync
}) {
  return {
    graph,
    timesync
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    registerClock: _index.registerClock,
    tickTimedResource: _index.tickTimedResource
  }, dispatch);
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Video);

exports.default = _default;