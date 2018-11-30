"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _redFlagController = require("../controllers/red-flag-controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.get('/red-flags', _redFlagController.getAllRedFlags);
app.get('/red-flags/:redFlagId', _redFlagController.getRedFlag);
app.post('/red-flags', _redFlagController.addRedFlag);
app.patch('/red-flags/:redFlagId/location', _redFlagController.updateRedFlagLocation);
app.patch('/red-flags/:redFlagId/comment', _redFlagController.updateRedFlagcomment);
app["delete"]('/red-flags/:redFlagId', _redFlagController.deleteRedFlag);
var _default = app;
exports["default"] = _default;