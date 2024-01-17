import express from "express";
import { getUser , updateUser} from "../controller/user.js";

const router = express.Router()

router.get("/find/:userId", getUser)
router.put("/:userId", updateUser);



export default router