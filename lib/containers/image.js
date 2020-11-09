"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class MyImage extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      positions: {}
    };
    this.handleClick = this.handleClick.bind(this);
  }

  resize() {
    var rules = document.styleSheets[0].cssRules || document.stylesheets[0].rules;
    var i = 0;

    while (!rules[i].selectorText || rules[i].selectorText.indexOf("img") === -1) {
      i++;
    }

    if (i == rules.length) {
      document.styleSheets[0].insertRule('.wrapper img {width:' + this.props.width + "px, height: " + this.props.height + "}");
    } else {
      var declaration = rules[i].style;
      declaration.setProperty('max-height', this.props.height + "px");
      declaration.setProperty('max-width', this.props.width + "px");
    }
  }

  render() {
    if (this.props.height) {
      this.resize();
    }

    return /*#__PURE__*/_react.default.createElement("img", {
      src: this.props.uri,
      onClick: this.handleClick
    });
  }

  handleClick() {
    if (this.props.uri.indexOf("_thumb") > -1) {
      let fullFatImage = this.props.uri;
      fullFatImage = fullFatImage.replace("_thumb", "");
      console.log("Thumb:", this.props.uri, "Full fat: ", fullFatImage);
      window.open(fullFatImage);
    }
  }

}

exports.default = MyImage;