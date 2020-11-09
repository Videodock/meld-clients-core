"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactLeaflet = require("react-leaflet");

var _reactLeafletIiif = _interopRequireDefault(require("react-leaflet-iiif"));

var _leaflet = _interopRequireDefault(require("leaflet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class IIIF extends _react.Component {
  constructor(props) {
    super(props); // console.log("Hello, got props: ", this.props)

    const lat = "lat" in this.props ? this.props.lat : 0;
    const lng = "lng" in this.props ? this.props.lng : 0;
    const zoom = "zoom" in this.props ? this.props.zoom : 1;
    const className = "className" in this.props ? this.props.className : "map";
    const iiifTileLayer = "iiifTileLayer" in this.props ? this.props.iiifTileLayer : /*#__PURE__*/_react.default.createElement(_reactLeafletIiif.default, {
      url: this.props.url
    });
    const map = "map" in this.props ? this.props.map : /*#__PURE__*/_react.default.createElement(_reactLeaflet.Map, {
      className: className,
      center: [lat, lng],
      zoom: zoom,
      crs: _leaflet.default.CRS.Simple
    }, iiifTileLayer);
    this.state = {
      map
    };
  }

  render() {
    // console.log("STATE: ", this.state);
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "LeafletWrapper"
    }, /*#__PURE__*/_react.default.createElement("link", {
      rel: "stylesheet",
      href: "../style/leaflet.css"
    }), /*#__PURE__*/_react.default.createElement("link", {
      rel: "stylesheet",
      href: "../style/iiif.css"
    }), this.state.map);
  }

}

exports.default = IIIF;