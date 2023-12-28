import { Router } from "express"

import { signUp, logIn, profileUpdate, findOne, forgotPassword } from "../controllers/userController"
import { checkToken } from "../util/Helper"
import { logInValidator, profileUpdateValidator, userCreateValidator } from "../middleware/validator"

const router = Router()

router.post("/register", userCreateValidator, signUp)
router.post("/logIn", logInValidator, logIn)
router.put("/update", checkToken, profileUpdateValidator, profileUpdate)
router.get("/detail/:uuid", checkToken, findOne)
router.post("/forgot-password", logInValidator, forgotPassword)

export default router
