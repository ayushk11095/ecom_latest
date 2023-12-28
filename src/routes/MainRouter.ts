import { Router } from "express"

import {
    userRouter,
    productRouter,
    orderRouter
} from "."
import { checkToken } from "../util/Helper"

const router = Router()

router.use("/user", userRouter)
router.use("/product", checkToken, productRouter)
router.use("/order", checkToken, orderRouter)

export default router