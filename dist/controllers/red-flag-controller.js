"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteRedFlag = exports.updateRedFlagcomment = exports.updateRedFlagLocation = exports.addRedFlag = exports.getRedFlag = exports.getAllRedFlags = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _db = _interopRequireDefault(require("../db/db"));

var _users = _interopRequireDefault(require("../users.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// set-up end point to get all red-flags
var getAllRedFlags = function getAllRedFlags(req, res) {
  if (redFlags.length) {
    res.status(200).send({
      data: redFlags
    });
  } else {
    res.status(204).send({
      error: 'Ooops! Currently no redflags'
    });
  }
}; // set-up end point to get a specific red-flag


exports.getAllRedFlags = getAllRedFlags;

var getRedFlag = function getRedFlag(req, res) {
  var redFlagId = parseInt(req.params.id, 10);
  var redFlag = redFlags.find(function (flag) {
    return flag.id === redFlagId;
  });

  if (redFlag) {
    res.status(200).send({
      data: redFlag
    });
  } else {
    res.status(404).send({
      error: "the red-flag with the id: ".concat(redFlagId, " does not exist")
    });
  }
}; // set-up end point to create a red-flag


exports.getRedFlag = getRedFlag;

var addRedFlag = function addRedFlag(req, res) {
  if (_users["default"].find(function (user) {
    return user.id === parseInt(req.body.createdBy, 10);
  })) {
    var newRedFlag = {
      id: redFlags.length + 1,
      createdOn: new Date(Date.now()).toLocaleString().slice(0, 10),
      createdBy: req.body.createdBy,
      type: req.body.type,
      location: req.body.location,
      image: req.body.image,
      status: 'pending',
      video: req.body.video,
      comment: req.body.comment
    };
    redFlags.push(newRedFlag);

    _fs["default"].writeFile('src/incidents.json', JSON.stringify(redFlags, null, 2), function (err) {
      if (err) {
        res.status(400).send({
          error: 'redFlag post failed'
        });
      } else {
        res.status(201).send({
          data: newRedFlag,
          message: 'created red flag record'
        });
      }
    });
  } else {
    res.status(401).send({
      error: 'User not authorized'
    });
  }
}; // set-up end point to edit a red-flag location


exports.addRedFlag = addRedFlag;

var updateRedFlagLocation = function updateRedFlagLocation(req, res) {
  var redFlagId = parseInt(req.params.id, 10);
  var redFlag = redFlags.find(function (flag) {
    return flag.id === redFlagId;
  });

  if (redFlag) {
    if (redFlag.status === 'rejected') {
      res.status(401).send({
        error: "the red-flag with the id: ".concat(redFlagId, " does not adhere to iReports code of conduct hence has been rejected")
      });
    } else if (redFlag.status === 'under investigation') {
      res.status(401).send({
        error: "the red-flag with the id: ".concat(redFlagId, " is under investigation")
      });
    } else if (redFlag.status === 'resolved') {
      res.status(401).send({
        error: "the red-flag with the id: ".concat(redFlagId, " has been resolved")
      });
    } else {
      redFlag.location = req.body.location;

      _fs["default"].writeFile('src/incidents.json', JSON.stringify(redFlags, null, 2), function (err) {
        if (err) {
          res.status(404).send({
            error: 'redFlag update failed'
          });
        } else {
          res.status(200).send({
            data: [{
              id: redFlag.id,
              message: req.body.location
            }]
          });
        }
      });
    }
  } else {
    res.status(400).send({
      error: "the red-flag with the id: ".concat(redFlagId, " does not exist")
    });
  }
}; // set-up end point to edit a red-flag comment


exports.updateRedFlagLocation = updateRedFlagLocation;

var updateRedFlagcomment = function updateRedFlagcomment(req, res) {
  var redFlagId = parseInt(req.params.id, 10);
  var redFlag = redFlags.find(function (flag) {
    return flag.id === redFlagId;
  });

  if (redFlag) {
    if (redFlag.status === 'rejected') {
      res.status(401).send({
        error: "the red-flag with the id: ".concat(redFlagId, " does not adhere to iReports code of conduct hence has been rejected")
      });
    } else if (redFlag.status === 'under investigation') {
      res.status(401).send({
        error: "the red-flag with the id: ".concat(redFlagId, " is under investigation")
      });
    } else if (redFlag.status === 'resolved') {
      res.status(401).send({
        error: "the red-flag with the id: ".concat(redFlagId, " has been resolved")
      });
    } else {
      redFlag.comment = req.body.comment;

      _fs["default"].writeFile('src/incidents.json', JSON.stringify(redFlags, null, 2), function (err) {
        if (err) {
          res.status(400).send({
            error: 'redFlag update failed'
          });
        } else {
          res.status(200).send({
            data: [{
              id: redFlag.id,
              message: req.body.comment
            }]
          });
        }
      });
    }
  }
}; // set-up end point to delete a red-flag


exports.updateRedFlagcomment = updateRedFlagcomment;

var deleteRedFlag = function deleteRedFlag(req, res) {
  var redFlagId = parseInt(req.params.id, 10);
  var redFlag = redFlags.find(function (flag) {
    return flag.id === redFlagId;
  });

  if (redFlag) {
    if (redFlag.status === 'rejected') {
      res.status(401).send({
        error: "the red-flag with the id: ".concat(redFlagId, " does not adhere to iReports code of conduct hence has been rejected")
      });
    } else if (redFlag.status === 'under investigation') {
      res.status(401).send({
        error: "the red-flag with the id: ".concat(redFlagId, " is under investigation")
      });
    } else if (redFlag.status === 'resolved') {
      res.status(401).send({
        error: "the red-flag with the id: ".concat(redFlagId, " has been resolved")
      });
    } else {
      var newRedFlags = redFlags.filter(function (flag) {
        return flag.id !== redFlagId;
      });

      _fs["default"].writeFile('src/incidents.json', JSON.stringify(newRedFlags, null, 2), function (err) {
        // check status code and message
        if (err) {
          res.status(500).send({
            data: [{
              id: redFlagId,
              message: 'An error has occurred!'
            }]
          });
        } else {
          res.status(200).send({
            data: [{
              id: redFlagId,
              message: 'red flag succesfully deleted'
            }]
          });
        }
      });
    }
  } else {
    res.status(400).send({
      error: "the red-flag with the id: ".concat(redFlagId, " does not exist")
    });
  }
};

exports.deleteRedFlag = deleteRedFlag;