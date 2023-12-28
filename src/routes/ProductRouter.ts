import { Router } from "express"

import { create, deleteProduct, findAll, findOne, update } from "../controllers/productController"
import { listValidator, productCreateValidator, productUpdateValidator } from "../middleware/validator"

const router = Router()

router.post("/create", productCreateValidator, create)
router.put("/update", productUpdateValidator, update)
router.get("/detail/:uuid", findOne)
router.post("/list", listValidator, findAll)
router.delete("/delete/:uuid", deleteProduct)

export default router
