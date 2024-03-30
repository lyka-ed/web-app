import { verifyToken } from "../utils/token";
import { Unauthorised } from "./app.error.handler";\

const authenticated = (req, res, next) =>{
    try {
        const token = req.headers.authorization.split(' ') [1];
        if (!token) throw new Unauthorised(`Authorisation Failed`);

        const payload = verifyToken(token);
        if (!req.user) req.user = {};
        req.user.id = payload.userId;
        next()
    } catch (error) {
        next(error);
    };
};

module.export = {
    authenticated
}
