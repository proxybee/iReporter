"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteRedFlag = exports.updateRedFlagcomment = exports.updateRedFlagLocation = exports.addRedFlag = exports.getRedFlag = exports.getAllRedFlags = void 0;

var _incidents = _interopRequireDefault(require("../incidents.json"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//set-up end point to get all red-flags
var getAllRedFlags = function getAllRedFlags(req, res) {
  if (_incidents["default"].length) {
    res.send({
      status: 200,
      data: _incidents["default"]
    });
  } else {
    res.send({
      status: 500,
      error: "ooops! we seem to have missed redFlags, we will fix this as soon as possible"
    });
  }
}; //set-up end point to get a specific red-flag


exports.getAllRedFlags = getAllRedFlags;

var getRedFlag = function getRedFlag(req, res) {
  var redFlagId = req.params.redFlagId;

  var redFlag = _incidents["default"].find(function (flag) {
    return flag.id == redFlagId;
  });

  if (redFlag) {
    res.send({
      status: 200,
      data: [redFlag]
    });
  } else {
    res.send({
      status: 400,
      error: "the red-flag with the id:" + redFlagId + "does not exist"
    });
  }
}; //set-up end point to create a red-flag


exports.getRedFlag = getRedFlag;

var addRedFlag = function addRedFlag(req, res) {
  var newRedFlag = {
    id: _incidents["default"].length + 1,
    createdOn: new Date(Date.now()).toLocaleString().slice(0, 10),
    createdBy: req.body.createdBy,
    type: req.body.type,
    location: req.body.location,
    status: req.body.status,
    image: req.body.image,
    video: req.body.video,
    comment: req.body.comment
  };

  _incidents["default"].push(newRedFlag);

  _fs["default"].writeFile('server/incidents.json', JSON.stringify(_incidents["default"], null, 2), function (err) {
    if (err) {
      res.send({
        status: 424,
        error: "redFlag post request failed"
      });
    } else {
      res.send({
        status: 200,
        data: [{
          id: newRedFlag.id,
          message: "created red flag record"
        }]
      });
    }
  });
}; //set-up end point to edit a red-flag location


exports.addRedFlag = addRedFlag;

var updateRedFlagLocation = function updateRedFlagLocation(req, res) {
  var redFlagId = parseInt(req.params.redFlagId, 10);

  var redFlag = _incidents["default"].find(function (flag) {
    return flag.id === redFlagId;
  });

  if (redFlag) {
    if (redFlag.status === "rejected") {
      res.send({
        status: 304,
        error: "the red-flag with the id:" + redFlagId + "" + "does not adhere to iReports code of conduct hence has been rejected"
      });
    } else if (redFlag.status === "under investigation") {
      res.send({
        status: 304,
        error: "the red-flag with the id:" + redFlagId + "" + "is under investigation"
      });
    } else if (redFlag.status === "resolved") {
      res.send({
        status: 304,
        error: "the red-flag with the id:" + redFlagId + "" + "has been resolved"
      });
    } else {
      redFlag.location = req.body.location;

      _fs["default"].writeFile('server/incidents.json', JSON.stringify(_incidents["default"], null, 2), function (err) {
        if (err) {
          res.send({
            status: 424,
            error: "redFlag update failed"
          });
        } else {
          res.send({
            status: 205,
            data: [{
              id: redFlag.location,
              message: "red-flag location updated"
            }]
          });
        }
      });
    }
  } else {
    res.send({
      status: 400,
      error: "the red-flag with the id:" + redFlagId + " does not exist"
    });
  }
}; //set-up end point to edit a red-flag comment


exports.updateRedFlagLocation = updateRedFlagLocation;

var updateRedFlagcomment = function updateRedFlagcomment(req, res) {
  var redFlagId = parseInt(req.params.redFlagId, 10);

  var redFlag = _incidents["default"].find(function (flag) {
    return flag.id === redFlagId;
  });

  if (redFlag) {
    if (redFlag.status === "rejected") {
      res.send({
        status: 304,
        error: "the red-flag with the id:" + redFlagId + "does not adhere to iReports code of conduct hence has been rejected"
      });
    } else if (redFlag.status === "under investigation") {
      res.send({
        status: 304,
        error: "the red-flag with the id:" + redFlagId + "" + "is under investigation"
      });
    } else if (redFlag.status === "resolved") {
      res.send({
        status: 304,
        error: "the red-flag with the id:" + redFlagId + "" + "has been resolved"
      });
    } else {
      redFlag.comment = req.body.comment;

      _fs["default"].writeFile('server/incidents.json', JSON.stringify(_incidents["default"], null, 2), function (err) {
        if (err) {
          res.send({
            status: 424,
            error: "redFlag update failed"
          });
        } else {
          res.send({
            status: 205,
            data: [{
              id: redFlag.id,
              message: "red flag comment updated"
            }]
          });
        }
      });
    }
  }

  ;
}; //set-up end point to delete a red-flag


exports.updateRedFlagcomment = updateRedFlagcomment;

var deleteRedFlag = function deleteRedFlag(req, res) {
  var redFlagId = parseInt(req.params.redFlagId, 10);

  var redFlag = _incidents["default"].find(function (flag) {
    return flag.id === redFlagId;
  });

  if (redFlag) {
    if (redFlag.status === "rejected") {
      res.send({
        status: 304,
        error: "the red-flag with the id:" + redFlagId + "does not adhere to iReports code of conduct hence has been rejected"
      });
    } else if (redFlag.status === "under investigation") {
      res.send({
        status: 304,
        error: "the red-flag with the id:" + redFlagId + "" + "is under investigation"
      });
    } else if (redFlag.status === "resolved") {
      res.send({
        status: 304,
        error: "the red-flag with the id:" + redFlagId + "" + "has been resolved"
      });
    }

    var newRedFlags = _incidents["default"].filter(function (flag) {
      return flag.id !== redFlagId;
    });

    _fs["default"].writeFile('server/incidents.json', JSON.stringify(newRedFlags, null, 2), function (err) {
      if (err) {
        res.send({
          status: 205,
          data: [{
            id: newRedFlag.id,
            message: "red flag comment updated"
          }]
        });
      } else {
        res.send({
          status: 200,
          data: [{
            id: newRedFlag.id,
            message: "red flag succesfully deleted"
          }]
        });
      }
    });
  } else {
    res.send({
      status: 404,
      error: "the red-flag with the id:" + redFlagId + "does not exist"
    });
  }
};

exports.deleteRedFlag = deleteRedFlag;