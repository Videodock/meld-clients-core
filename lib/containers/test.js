"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _index = require("../actions/index");

var _reactRedux = require("react-redux");

var _redux = require("redux");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class Test extends _react.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.setTraversalObjectives([{
      "@context": {
        "oa": "http://www.w3.org/ns/oa#",
        "meldterm": "http://meld.linkedmusic.org/terms/"
      },
      "@id": {},
      "oa:hasBody": {
        "@id": "meldterm:highlight"
      }
    }]);
  }

  componentDidMount() {
    // start traversal
    this.props.traverse("http://meld.linkedmusic.org/annotations/Frageverbot1.json-ld");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Did update!", prevProps, this.props);

    if ("graph" in prevProps) {
      // check our traversal objectives if the graph has updated
      if (prevProps.graph.graph.length !== this.props.graph.graph.length) {
        this.props.checkTraversalObjectives(this.props.graph.graph, this.props.graph.objectives);
      }
    }
  }

  render() {
    return /*#__PURE__*/_react.default.createElement("div", null, "Hello MELD");
  }

}

function mapStateToProps({
  graph
}) {
  return {
    graph
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    traverse: _index.traverse,
    setTraversalObjectives: _index.setTraversalObjectives,
    checkTraversalObjectives: _index.checkTraversalObjectives
  }, dispatch);
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Test);

exports.default = _default;