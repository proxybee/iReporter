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