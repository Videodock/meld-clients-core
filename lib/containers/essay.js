"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _tei = _interopRequireDefault(require("../containers/tei"));

var _image = _interopRequireDefault(require("../containers/image"));

var _index = require("..//actions/index");

var _reactTabs = require("react-tabs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//import Score from 'meld-client/src/containers/score';
//import TEI from '../containers/tei';
const MEIManifestation = "meldterm:MEIManifestation";
const TEIManifestation = "meldterm:TEIManifestation";
const IIIFManifestation = "meldterm:IIIFManifestation";
const VideoManifestation = "meldterm:VideoManifestation";
const AudioManifestation = "meldterm:AudioManifestation";
const ImageManifestation = "meldterm:ImageManifestation";
const Carousel = "meldterm:MEICarousel";
const CarouselClassic = "meldterm:MEIClassicCarousel";
const FOR_ORCHESTRA = "http://id.loc.gov/authorities/performanceMediums/2013015516";
const HAS_PIANO = "http://id.loc.gov/authorities/performanceMediums/2013015550";

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect(); // FIXME: Hardwired values

  return rect.top >= 110 && // Based on the TEI container's CSS 
  rect.left >= (window.innerWidth || document.documentElement.clientWidth) / 2 - 350 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) - 190 && rect.right <= (window.innerWidth || document.documentElement.clientWidth) / 2 + 350;
}

class Essay extends _react.Component {
  constructor(props) {
    super(props);
  }

  inViewRefs() {
    var refs = document.getElementsByTagName('tei-link');
    refs = Array.from(refs).filter(isElementInViewport);
    this.props.updateLinks(refs);
  }

  componentDidUpdate() {}

  render() {
    return /*#__PURE__*/_react.default.createElement(_tei.default, {
      key: this.props.uri,
      uri: this.props.uri // motif={ this.props.current }
      ,
      scrollFun: this.inViewRefs.bind(this)
    });
  }

}

exports.default = Essay;