"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _index = require("../actions/index");

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _reactRouter = require("react-router");

var _score = _interopRequireDefault(require("../containers/score"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class Jam extends _react.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.location.query.session) {
      // start polling
      this.doPoll();
    }
  }

  doPoll() {
    const graphUri = this.props.location.query.session;

    if ('etags' in this.props.graph && graphUri in this.props.graph.etags) {
      this.props.fetchSessionGraph(graphUri, this.props.graph.etags[graphUri]);
    } else {
      this.props.fetchSessionGraph(graphUri);
    }

    setTimeout(() => this.doPoll(), 200);
  }

  render() {
    if (this.props.score.publishedScores) {
      if (this.props.score.triggerNextSession) {
        // have we got a next session queued up?
        if (this.props.graph.nextSession) {
          this.props.transitionToSession(this.props.graph.annoGraph["@id"], this.props.graph.nextSession);
          return /*#__PURE__*/_react.default.createElement("div", null, "Loading next session...");
        } else {
          // if not, ignore this request and reset trigger
          this.props.resetNextSessionTrigger();
        }
      }

      console.log("Jam props: ", this.props); //if(this.props.graph.targetsById) {

      let session = "";
      let etag = "";

      if (this.props.graph && this.props.graph.annoGraph) {
        session = this.props.graph.annoGraph["@id"];
        etag = this.props.graph.etags[session];
        console.log("session: ", session, " etag: ", etag, " etags: ", this.props.graph.etags);
      }

      const byId = this.props.graph.targetsById;
      const publishedScores = this.props.score.publishedScores;
      const conceptualScores = this.props.score.conceptualScores;
      const scores = Object.keys(publishedScores).map(pS => {
        //return <Score key={ sc } uri={ sc } annotations={ byId[sc]["annotations"] } />;
        const cS = publishedScores[pS];
        const annotationTargets = conceptualScores[cS];
        let annotations = Object.keys(byId).map(t => {
          if (annotationTargets && annotationTargets.includes(t)) {
            return byId[t].annotations;
          }
        });
        console.log("WORKING WITH: ", annotations);
        return /*#__PURE__*/_react.default.createElement("div", {
          key: "wrapper" + pS
        }, /*#__PURE__*/_react.default.createElement(_score.default, {
          key: pS,
          uri: pS,
          annotations: annotations,
          session: session,
          etag: etag,
          nextSession: this.props.nextSession
        }), ";", /*#__PURE__*/_react.default.createElement("div", {
          id: "prev",
          key: "prev" + pS,
          onClick: () => {
            console.log("prev clicked, ps: ", pS, this.props.score.pageNum, this.props.score.MEI);
            this.props.scorePrevPage(pS, this.props.score.pageNum, this.props.score.MEI[pS]);
          }
        }, " Previous "), /*#__PURE__*/_react.default.createElement("div", {
          id: "next",
          key: "next" + pS,
          onClick: () => {
            console.log("next clicked, ps: ", pS, this.props.score.pageNum, this.props.score.MEI); //this.props.scoreNextPage(pS, this.props.score.pageNum, this.props.score.MEI[pS])

            this.props.postNextPageAnnotation(session, etag);
          }
        }, " Next"));
      });
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("link", {
        rel: "stylesheet",
        href: "../../style/jam.css",
        type: "text/css"
      }), /*#__PURE__*/_react.default.createElement("div", {
        id: "annotations"
      }), scores);
    }

    return /*#__PURE__*/_react.default.createElement("div", null, "Loading...");
  }

}

function mapStateToProps({
  graph,
  score
}) {
  return {
    graph,
    score
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    fetchSessionGraph: _index.fetchSessionGraph,
    scorePrevPage: _index.scorePrevPage,
    scoreNextPage: _index.scoreNextPage,
    postNextPageAnnotation: _index.postNextPageAnnotation,
    transitionToSession: _index.transitionToSession,
    resetNextSessionTrigger: _index.resetNextSessionTrigger
  }, dispatch);
}

(0, _reactRouter.withRouter)(Jam);

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Jam);

exports.default = _default;