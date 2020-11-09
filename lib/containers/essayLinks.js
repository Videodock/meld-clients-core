"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _prefixes = require("../library/prefixes");

var _tei = _interopRequireDefault(require("../containers/tei"));

var _image = _interopRequireDefault(require("../containers/image"));

var _reactMediaPlayer = require("react-media-player");

var _reactMediaPlayerPlayPause = _interopRequireDefault(require("../containers/react-media-player-play-pause"));

var _index = require("../actions/index");

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

function getParagraph(node) {
  node.closest('tei-p');
}

function findTextInPara(node, characters) {
  var parentPara = node.closest('tei-p');
  var prec = '';
  var foll = '';
  var precCut, match;
  var context = [];
  if (!parentPara) return;
  var iterator = document.createNodeIterator(parentPara);
  var currentNode;

  while (currentNode = iterator.nextNode()) {
    if (currentNode == node) {
      var pos = prec.lastIndexOf(" ", prec.length - characters);
      precCut = prec.substring(pos);
    } else if (currentNode.nodeType !== Node.TEXT_NODE) {
      continue;
    } else if (precCut && !match) {
      match = node.textContent;
    } else if (precCut) {
      foll += currentNode.textContent;

      if (foll.length > characters) {
        foll = foll.substring(0, characters);
        break;
      }
    } else {
      prec += currentNode.textContent;
    }
  }

  return [precCut, match, foll];
}

function getContext(node) {
  var prec = "";
  var characters = 50;
  var textBits = findTextInPara(node, characters);
  if (!textBits) return false;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "motifList",
    onClick: x => node.scrollIntoView()
  }, "...", /*#__PURE__*/_react.default.createElement("span", {
    className: "preContent"
  }, textBits[0]), /*#__PURE__*/_react.default.createElement("span", {
    className: "content"
  }, textBits[1]), /*#__PURE__*/_react.default.createElement("span", {
    className: "postContent"
  }, textBits[2]), "...");
}

class EssayLinks extends _react.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {}

  allRefsIndex() {
    var refObj = document.getElementsByTagName('tei-link');
    var refs = [...refObj];
    var blocks = [];

    for (var i = 0; i < this.props.iterations.length; i++) {
      var ID = this.props.iterations[i]['@id'];
      var relevant = refs.filter(x => x.getAttributeNS(null, 'target') == ID);
      var linkDivs = relevant.map(getContext);

      if (linkDivs.length) {
        blocks.push( /*#__PURE__*/_react.default.createElement("div", {
          className: "motifBlock"
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "motifName"
        }, this.props.iterations[i][_prefixes.prefix.rdfs + "label"]), linkDivs));
      }
    }

    return blocks;
  }

  linkForIteration(uri) {
    var iteration = this.props.iterations.find(x => x['@id'] == uri);
    var iName = iteration['http://www.w3.org/2000/01/rdf-schema#label'];
    var audioURI = iteration.embodimentLists.MP3 ? iteration.embodimentLists.MP3[0] : false;
    var audio = iteration.embodimentLists.MP3 ? /*#__PURE__*/_react.default.createElement(_reactMediaPlayer.Media, {
      key: iteration.embodimentLists.MP3[0]
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "media"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "media-player"
    }, /*#__PURE__*/_react.default.createElement(_reactMediaPlayer.Player, {
      src: iteration.embodimentLists.MP3[0]
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "media-controls"
    }, /*#__PURE__*/_react.default.createElement(_reactMediaPlayerPlayPause.default, null)))) : /*#__PURE__*/_react.default.createElement("div", null);
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "linkBlock",
      key: "itLink" + uri
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "itname"
    }, iName, audio), /*#__PURE__*/_react.default.createElement("div", {
      className: "inspectLink",
      onClick: this.props.inspectFun.bind(null, uri)
    }, "Inspect"));
  }

  visibleLinks() {
    var visibleIts = this.props.visible.reduce((acc, val) => {
      if (acc[val.getAttributeNS(null, 'target')]) {
        acc[val.getAttributeNS(null, 'target')].push(val);
      } else {
        acc[val.getAttributeNS(null, 'target')] = [val];
      }

      ;
      return acc;
    }, {});
    var links = Object.keys(visibleIts);
    var iterations = this.props.iterations.map(x => x['@id']);
    var linkDivs = [];

    for (var i = 0; i < links.length; i++) {
      if (iterations.indexOf(links[i]) > -1) {
        linkDivs.push(this.linkForIteration(links[i]));
      }
    }

    return linkDivs;
  }

  render() {
    if (document.getElementsByTagName('tei-link').item(0)) {
      var linkDivs = this.allRefsIndex();
    } else {
      setTimeout(this.props.advanceTime, 0.2);
    }

    var visibles = this.props.visible ? this.visibleLinks() : [];
    if (visibles.length == 1) visibles = visibles[0];
    return /*#__PURE__*/_react.default.createElement(_reactTabs.Tabs, {
      defaultIndex: 0,
      className: "linksTab"
    }, /*#__PURE__*/_react.default.createElement(_reactTabs.TabList, null, /*#__PURE__*/_react.default.createElement(_reactTabs.Tab, null, "Links"), /*#__PURE__*/_react.default.createElement(_reactTabs.Tab, null, "Motifs")), /*#__PURE__*/_react.default.createElement(_reactTabs.TabPanel, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "links"
    }, visibles)), /*#__PURE__*/_react.default.createElement(_reactTabs.TabPanel, null, " ", /*#__PURE__*/_react.default.createElement("div", {
      className: "motifListBox"
    }, linkDivs)));
  }

}

exports.default = EssayLinks;