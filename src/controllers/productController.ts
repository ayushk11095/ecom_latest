import { Request, Response, NextFunction } from "express"
import { v4 as uuidv4 } from 'uuid';

const Product = require("../models/productModel")
import { getTotalPages } from "../util/Helper";

export default {
    create, update, findOne, findAll, deleteProduct
}

// Product create API
export async function create(req: Request, res: Response, next: NextFunction) {
    const {title, images, price, discountPrice, stock, description} = req.body
    try {
        const data = await Product.findOne({title})
        if (data) {
            return next({
                status: 409,
                code: `already_exists`,
                message: 'Product already exists'
            })
        }

        const product = new Product()
        product.uuid = uuidv4()
        product.title = title
        product.images = images
        product.price = price
        product.discountPrice = discountPrice
        product.description = description
        product.stock = stock
        await product.save()

        res.json({
            success: true,
            message: `Product added successfully`,
            data: product
        })
    } catch (error) {
        return next(error)
    }
}

// Product update API
export async function update(req: Request, res: Response, next: NextFunction) {
    const {uuid, title, images, price, discountPrice, stock, description} = req.body
    try {
        const product = await Product.findOne({uuid})
        if (!product) {
            return next({
                status: 404,
                code: `not_found`,
                message: 'Product not found'
            })
        }

        const data = await Product.findOne({title, uuid: {$ne: uuid}})
        if (data) {
            return next({
                status: 409,
                code: `already_exists`,
                message: 'Product already exists'
            })
        }

        product.title = title
        product.images = images
        product.price = price
        product.discountPrice = discountPrice
        product.description = description
        product.stock = stock
        await product.save()

        res.json({
            success: true,
            message: `Product updated successfully`,
            data: product
        })
    } catch (error) {
        return next(error)
    }
}

// Product detail API
export async function findOne(req: Request, res: Response, next: NextFunction) {
    const uuid = req.params.uuid
    try {
        const data = await Product.findOne({uuid})
        if (!data) {
            return next({
                status: 404,
                code: `not_found`,
                message: 'Product not found'
            })
        }
        
        res.json({
            success: true,
            message: `Product fetched successfully.`,
            data
        })
    } catch (error) {
        return next(error)
    }
}

// Product list API
export async function findAll(req: Request, res: Response, next: NextFunction) {
    const dataArr: any = req.body
    dataArr.page = dataArr.page != null ? parseInt(dataArr.page) - 1 : 0;
    dataArr.pageSize = dataArr.pageSize != null ? parseInt(dataArr.pageSize) : 10;

    let paginate: any = {};
    //paginate
    if (dataArr.pageSize != 0) {
        paginate.limit = dataArr.pageSize;
        paginate.offset = dataArr.pageSize * dataArr.page;
    }

    try {

        const data = await Product.find().skip(paginate.offset)
        .limit(paginate.limit)

        const count = await Product.count()

        const pageCount = await getTotalPages(count, dataArr.pageSize);

        const result = {
            total: count,
            pageCount: pageCount,
            page: dataArr.page + 1,
            pageSize: dataArr.pageSize,
            data,
          };
        
        res.json({
            success: true,
            message: `Product fetched successfully.`,
            result
        })
    } catch (error) {
        return next(error)
    }
}

// Product delete API
export async function deleteProduct(req: Request, res: Response, next: NextFunction) {
    const uuid = req.params.uuid
    try {
        const data = await Product.findOneAndDelete({uuid})
        if (!data) {
            return next({
                status: 404,
                code: `not_found`,
                message: 'Product not found'
            })
        }
        
        return res.json({
            success: true,
            message: `Product deleted successfully.`,
        })
    } catch (error) {
        return next(error)
    }
}