"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _prefixes = require("../../lib/library/prefixes");

var _reactMediaPlayer = require("react-media-player");

var _index = require("../actions/index");

var _reactMediaPlayerPlayPause = _interopRequireDefault(require("../containers/react-media-player-play-pause"));

var _reactTabs = require("react-tabs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

class VideoLinks extends _react.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {}

  videoPlayer(url) {
    return /*#__PURE__*/_react.default.createElement(_reactMediaPlayer.Media, {
      key: url
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "media"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "media-player"
    }, /*#__PURE__*/_react.default.createElement(_reactMediaPlayer.Player, {
      src: url
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "media-controls"
    }, /*#__PURE__*/_react.default.createElement(_reactMediaPlayerPlayPause.default, null))));
  }

  isIteration(thing) {
    if (typeTest("https://meld.linkedmusic.org/companion/vocab/MotifIteration", thing)) return true;
    if (this.props.iterations.find(x => x['@id'] === thing['@id'])) return true;
    return false;
  }

  isIterationSegment(thing) {
    //		console.log(thing);
    if (typeTest("https://meld.linkedmusic.org/companion/vocab/MotifIterationSegment", thing)) return true;
    if (this.props.iterations.find(x => x.iterationSegments.find(y => y['@id'] === thing['@id']))) return true;
    return false;
  }

  makeLinks(links) {
    var linkMedia = [];
    var TM = [];
    var compares = []; //		console.log(links);

    for (var i = 0; i < links.length; i++) {
      var targets = links[i].targets;

      for (var j = 0; j < targets.length; j++) {
        if (this.isIteration(targets[j])) {
          var targetID = targets[j]['@id'];
          var iterationNo = this.props.iterations.findIndex(x => x['@id'] == targetID);
          var iteration = this.props.iterations[iterationNo];
          var audio = iteration.embodimentLists.MP3 ? this.videoPlayer(iteration.embodimentLists.MP3[0]) : /*#__PURE__*/_react.default.createElement("div", null);
          linkMedia[iterationNo] = /*#__PURE__*/_react.default.createElement("div", {
            className: "motifBlock",
            key: "vl-" + targetID
          }, /*#__PURE__*/_react.default.createElement("div", {
            className: "motifName",
            onClick: this.props.inspectMotive.bind(null, targets[j]['@id'])
          }, iteration["http://www.w3.org/2000/01/rdf-schema#label"]), audio);
        } else if (this.isIterationSegment(targets[j])) {
          var targetID = targets[j]['@id'];
          var iterationNo = this.props.iterations.findIndex(x => x.iterationSegments.find(y => y['@id'] == targetID));
          var iteration = this.props.iterations[iterationNo];
          var segment = iteration.iterationSegments.find(x => x['@id'] == targetID);
          var audio = iteration.embodimentLists.MP3 ? this.videoPlayer(iteration.embodimentLists.MP3[0]) : /*#__PURE__*/_react.default.createElement("div", null);
          var segmentName = segment["http://purl.org/vocab/frbr/core#realizationOf"]["http://www.w3.org/2000/01/rdf-schema#label"];

          if (!segmentName) {
            //FIXME: HACK because of JSON-LD framing issues
            var pos = segment["http://purl.org/vocab/frbr/core#realizationOf"]['@id'].lastIndexOf('-');
            segmentName = segment["http://purl.org/vocab/frbr/core#realizationOf"]['@id'].substring(pos + 1);
          }

          linkMedia[iterationNo] = /*#__PURE__*/_react.default.createElement("div", {
            className: "motifBlock",
            key: "vl-" + targetID
          }, /*#__PURE__*/_react.default.createElement("div", {
            className: "motifName"
          }, /*#__PURE__*/_react.default.createElement("span", {
            className: "motif",
            onClick: this.props.inspectMotive.bind(null, iteration['@id'])
          }, iteration["http://www.w3.org/2000/01/rdf-schema#label"], " "), /*#__PURE__*/_react.default.createElement("span", {
            className: "segment",
            onClick: this.props.inspectMotive.bind(null, iteration['@id'], targetID)
          }, segmentName + " segment")), audio);
        } else if (typeTest("https://meld.linkedmusic.org/companion/vocab/TimeMachine", targets[j])) {
          var TM = [/*#__PURE__*/_react.default.createElement("div", {
            className: "motifBlock",
            key: "TMlink",
            onClick: this.props.timeMachine
          }, "TimeMachine")];
        } else if (typeTest("https://meld.linkedmusic.org/companion/vocab/Compare", targets[j])) {
          var LID = targets[j]["https://meld.linkedmusic.org/companion/vocab/LeftMotif"]['@id'];
          var RID = targets[j]["https://meld.linkedmusic.org/companion/vocab/RightMotif"]['@id'];
          var iterationL = this.props.iterations.find(x => x['@id'] == LID);
          var iterationR = this.props.iterations.find(x => x['@id'] == RID);
          compares.push( /*#__PURE__*/_react.default.createElement("div", {
            className: "motifBlock",
            key: "c-" + LID + "---" + RID
          }, /*#__PURE__*/_react.default.createElement("div", {
            className: "motifName motifNames",
            onClick: this.props.compare.bind(null, LID, RID)
          }, "Compare ", iterationL[_prefixes.prefix.rdfs + "label"], " & ", iterationR[_prefixes.prefix.rdfs + 'label'])));
        }
      }
    }

    return TM.concat(Object.values(linkMedia), compares);
  }

  render() {
    var cT = 0; //		console.log(this.props.timesync);

    var links = [];

    if (this.props.timesync && "mediaResources" in this.props.timesync && this.props.uri in this.props.timesync.mediaResources) {
      cT = this.props.timesync.mediaResources[this.props.uri]['currentTime'];
      var syncs = this.props.timesync.mediaResources[this.props.uri]['times'];

      if (syncs) {
        var times = Object.keys(syncs).map(t => Number(t));
        var window = 5;

        for (var i = 0; i < times.length; i++) {
          if (cT > times[i] && cT < (syncs[times[i]].end ? syncs[times[i]].end : times[i] + window)) {
            links.push(syncs[times[i]]);
          }
        }
      } else console.log("no syncs", this.props.timesync, this.props.uri);
    }

    var linkDivs = this.makeLinks(links);
    /*		if(document.getElementsByTagName('tei-link').item(0)){
    			var linkDivs = this.allRefsIndex();
    		} else {
    			setTimeout(this.props.advanceTime, 0.2);
    		}*/
    // var visibles = this.props.visible ? this.visibleLinks() : [];
    // if(visibles.length==1) visibles = visibles[0];
    //		console.log(linkDivs);

    return /*#__PURE__*/_react.default.createElement("div", {
      className: "videoLinks linksTab"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "tabHeading"
    }, "Links"), linkDivs.length == 1 ? linkDivs[0] : linkDivs);
  }

}

function typeTest(type, jldObj) {
  if (jldObj['@type']) {
    if (typeof jldObj['@type'] == 'string') {
      return jldObj['@type'] == type;
    } else {
      return jldObj['@type'].indexOf(type) > -1;
    }
  } else return false;
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

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(VideoLinks);

exports.default = _default;