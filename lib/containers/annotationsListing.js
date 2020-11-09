"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _index = require("../actions/index");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class AnnotationsListing extends _react.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("annolisting props: ", this.props);

    if (Object.keys(this.props.score).length && Object.keys(this.props.score.componentTargets).length) {
      // filter out undefined annotations
      const anno = annotations.filter(annotation => {
        return annotation;
      }); // order by timestamp

      anno.sort(function (a, b) {
        return a["dct:created"] < b["dct:created"] ? -1 : 1;
      });
      console.log("--Annotations: ", anno);
      console.log("--Props: ", this.props);
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "annotationsWrapper"
      }, /*#__PURE__*/_react.default.createElement("div", null, "Events:"), anno.map(annotation => {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "annotationListing",
          key: annotation["@id"]
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "annotationTarget"
        }, annotation["oa:hasTarget"].map(t => {
          if (t["@id"] in this.props.score.componentTargets) {
            return /*#__PURE__*/_react.default.createElement("span", {
              className: annotation["oa:motivatedBy"]["@id"].replace(":", "_"),
              title: t["@id"],
              key: t["@id"],
              onClick: () => {
                this.props.scorePageToComponentTarget( // TODO: Implement "startsWith" to pick correct
                // first MEI target in future
                this.props.score.componentTargets[t["@id"]]["MEI"][0], this.props.scoreUri, this.props.score.MEI[this.props.scoreUri]);
              }
            }, this.props.score.componentTargets[t["@id"]]["description"]);
          } else {
            return /*#__PURE__*/_react.default.createElement("span", null, "Loading component target: ", t["@id"]);
          }
        }), /*#__PURE__*/_react.default.createElement("span", {
          className: "timestamp",
          key: annotation["@id"] + "_time"
        }, "(at ", annotation["dct:created"], ")")));
      }));
    }

    return /*#__PURE__*/_react.default.createElement("div", null, "Loading...");
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
  return (0, _redux.bindActionCreators)({
    scorePageToComponentTarget: _index.scorePageToComponentTarget
  }, dispatch);
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AnnotationsListing);

exports.default = _default;