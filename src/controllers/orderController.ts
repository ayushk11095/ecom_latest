import { Request, Response, NextFunction } from "express"

const Product = require("../models/productModel")

export default {
    create,
}

// Order API
export async function create(req: Request, res: Response, next: NextFunction) {
    const {uuid, quantity} = req.body
    try {
        const product = await Product.findOne({uuid})
        if (!product) {
            return next({
                status: 404,
                code: `not_found`,
                message: 'Product not found'
            })
        }

        if (product.stock < quantity || product.stock === 0) {
            return next({
                status: 409,
                code: `out_of_stock`,
                message: 'Product is out of stock'
            })
        }

        product.stock = product.stock - parseInt(quantity)
        await product.save()

        return res.json({
            success: true,
            message: `Order placed successfully`,
        })
    } catch (error) {
        return next(error)
    }
}
