"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _winston = _interopRequireDefault(require("winston"));

require("regenerator-runtime/runtime");

var _incidentRoutes = _interopRequireDefault(require("./routes/incident-routes"));

var _userRoute = _interopRequireDefault(require("./routes/user-route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-console */
// call the packages the product needs
// initialize winston logger
var logger = _winston["default"].createLogger({
  transports: [new _winston["default"].transports.Console()]
}); // initialize new express app


var app = (0, _express["default"])(); // load all files in public directory

app.use(_express["default"]["static"](_path["default"].resolve("".concat(__dirname, "/../public")))); // createTables();
// import routes

app.use('/api/v1', _incidentRoutes["default"]);
app.use('/api/v1/users', _userRoute["default"]);
app.use(function (err, req, res, next) {
  logger.info(err.stack);
  res.status(500);
  res.render("Bad Request");
});
var port = process.env.PORT || 4020;
app.listen(port, function () {
  return logger.info("listening on port ".concat(port, "..."));
});
var _default = app;
exports["default"] = _default;