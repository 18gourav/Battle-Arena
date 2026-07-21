import {Router} from 'express'
import { logoutUser, userLogin, userRegister } from "../controllers/user.controller.js";
import { verifyJWT } from '../middleware/verifyJWT.js';

const route = Router();

route
.route("/register")
.post(userRegister)

route
.route("/login")
.post(userLogin)

route.get('/me', verifyJWT, (req, res) => {
    res.json(req.user);
})

route
.route("/logout")
.post(verifyJWT,logoutUser)

export default route