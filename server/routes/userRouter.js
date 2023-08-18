import  express  from "express";
import { getMyProfile, login, logout, register } from "../controller/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router=express.Router()


router.post("/new", register);
router.post("/login",login );
router.post("/logout",logout );


router.get("/me",isAuthenticated,getMyProfile); //when next of isAuthenticated run the getMyProfile run

export default router;