"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

var _index = require("../actions/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(state = {
  newSessionUri: "",
  newSessionScore: "",
  muzicodesUpdated: false
}, action) {
  switch (action.type) {
    case _index.MUZICODES_UPDATED:
      // console.log("Muzicodes has been updated.");
      return (0, _immutabilityHelper.default)(state, {
        $merge: {
          "muzicodesUpdated": true
        }
      });

    case _index.CREATE_SESSION:
      // console.log("Created session: ", action.payload);
      return (0, _immutabilityHelper.default)(state, {
        $merge: {
          "newSessionUri": action.payload.headers.location,
          "newSessionScore": action.payload.data["@graph"][0]["mo:performance_of"]["@id"]
        }
      });

    default:
      // console.log("Unknown action: ", action);
      return state;
  }
}

;