import { Router } from "express"

import { create } from "../controllers/orderController"

const router = Router()

router.post("/create", create)

export default router
