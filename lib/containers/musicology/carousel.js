"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _react3dCarousel = _interopRequireDefault(require("react-3d-carousel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class MEICarousel extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: {},
      width: 400,
      layout: this.props.layout,
      ease: 'linear',
      duration: 400
    };
    this.handleChange = this.handleChange.bind(this);
  }
  /*
  componentWillMount() {
      this.onSides = function (event) {
          this.setState( { images: this.props.images }});
      }.bind(this);
      this.onLayout = function (event) {
          this.setState({layout: event.target.value});
      }.bind(this);
      this.onDuration = function (event) {
          this.setState({duration: parseInt(event.target.value) });
      }.bind(this);
     // this.onEase = function (event) {
     //     this.setState({ease:  event.target.value});
     // }.bind(this);
  }
  */


  render() {
    console.log("Carousel sees :", this.props.score);

    if ("MEI" in this.props.score && Object.keys(this.props.score["MEI"]).length) {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "carouselWrapper"
      }, /*#__PURE__*/_react.default.createElement(_react3dCarousel.default, {
        width: this.state.width,
        images: Object.keys(this.props.score.MEI).map(k => k.replace(".mei", ".svg")),
        motif: this.props.motif,
        onMotifChange: this.props.onMotifChange,
        ease: this.state.ease,
        duration: this.state.duration,
        layout: this.state.layout
      }));
    }

    return /*#__PURE__*/_react.default.createElement("div", null);
  }

}

function mapStateToProps({
  score
}) {
  return {
    score
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({}, dispatch);
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MEICarousel);

exports.default = _default;