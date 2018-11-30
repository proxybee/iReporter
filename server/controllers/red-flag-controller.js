import redFlags from '../incidents.json';
import fs from 'fs';

//set-up end point to get all red-flags
export const getAllRedFlags = (req, res) => {
    if (redFlags.length) {
        res.send({
            status: 200,
            data: redFlags
        });
    } else {
        res.send({
            status: 500,
            error: "ooops! we seem to have missed redFlags, we will fix this as soon as possible"
        });
    }
}

//set-up end point to get a specific red-flag
export const getRedFlag = (req, res) => {
    const redFlagId = req.params.redFlagId;
    const redFlag = redFlags.find(flag => flag.id == redFlagId);

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
}

//set-up end point to create a red-flag
export const addRedFlag = (req, res) => {
    const newRedFlag = {
        id: redFlags.length + 1,
        createdOn: new Date(Date.now()).toLocaleString().slice(0, 10),
        createdBy: req.body.createdBy,
        type: req.body.type,
        location: req.body.location,
        status: req.body.status,
        image: req.body.image,
        video: req.body.video,
        comment: req.body.comment,
    };

    redFlags.push(newRedFlag);

    fs.writeFile('server/incidents.json', JSON.stringify(redFlags, null, 2), (err) => {
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
}

//set-up end point to edit a red-flag location
export const updateRedFlagLocation = (req, res) => {
    const redFlagId = parseInt(req.params.redFlagId, 10);
    const redFlag = redFlags.find(flag => flag.id === redFlagId);
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
                error: ("the red-flag with the id:" + redFlagId + "" + "has been resolved")
            });
        } else {
            redFlag.location = req.body.location;

            fs.writeFile('server/incidents.json', JSON.stringify(redFlags, null, 2), (err) => {
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
};


//set-up end point to edit a red-flag comment
export const updateRedFlagcomment = (req, res) => {
    const redFlagId = parseInt(req.params.redFlagId, 10);
    const redFlag = redFlags.find(flag => flag.id === redFlagId);
    if (redFlag) {
        if (redFlag.status === "rejected") {
            res.send({
                status: 304,
                error: "the red-flag with the id:" + redFlagId + "does not adhere to iReports code of conduct hence has been rejected"
            });
        } else if (redFlag.status === "under investigation") {
            res.send({
                status: 304,
                error: ("the red-flag with the id:" + redFlagId + "" + "is under investigation")
            });
        } else if (redFlag.status === "resolved") {
            res.send({
                status: 304,
                error: ("the red-flag with the id:" + redFlagId + "" + "has been resolved")
            });
        } else {

            redFlag.comment = req.body.comment;

            fs.writeFile('server/incidents.json', JSON.stringify(redFlags, null, 2), (err) => {
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
    };
}

//set-up end point to delete a red-flag
export const deleteRedFlag = (req, res) => {
    const redFlagId = parseInt(req.params.redFlagId, 10);
    const redFlag = redFlags.find(flag => flag.id === redFlagId);

    if (redFlag) {
        if (redFlag.status === "rejected") {
            res.send({
                status: 304,
                error: "the red-flag with the id:" + redFlagId + "does not adhere to iReports code of conduct hence has been rejected"
            });
        } else if (redFlag.status === "under investigation") {
            res.send({
                status: 304,
                error: ("the red-flag with the id:" + redFlagId + "" + "is under investigation")
            });
        } else if (redFlag.status === "resolved") {
            res.send({
                status: 304,
                error: ("the red-flag with the id:" + redFlagId + "" + "has been resolved")
            });
        }
        const newRedFlags = redFlags.filter(flag => flag.id !== redFlagId);
        fs.writeFile('server/incidents.json', JSON.stringify(newRedFlags, null, 2), (err) => {
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
}


