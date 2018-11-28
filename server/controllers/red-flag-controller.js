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
