"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

var _meldActions = require("../actions/meldActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(state = {
  processedAnnotations: {}
}, action) {
  if (action.type === _meldActions.ANNOTATION_SKIPPED) {
    return (0, _immutabilityHelper.default)(state, {
      processedAnnotations: {
        $merge: {
          [action.payload["@id"]]: action.payload
        }
      }
    });
  } else {
    return state;
  }
}

;