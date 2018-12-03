"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _winston = _interopRequireDefault(require("winston"));

var _redFlagRoutes = _interopRequireDefault(require("./routes/red-flag-routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// call the packages the product needs
var logger = _winston["default"].createLogger({
  transports: [new _winston["default"].transports.Console()]
});

var app = (0, _express["default"])(); // get homepage

app.get('/', function (res, req) {
  res.status(200).send('hi, server is running fine');
});
app.use('/api/v1', _redFlagRoutes["default"]);
app.use(_express["default"]["static"](__dirname + "/public"));
var port = process.env.PORT || 3020;
app.listen(port, function () {
  return logger.info("listening on port ".concat(port, "..."));
});
var _default = app;
exports["default"] = _default;