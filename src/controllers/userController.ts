import { Request, Response, NextFunction } from "express"
import { hashSync, compareSync } from "bcryptjs"
import { v4 as uuidv4 } from 'uuid';

const User = require("../models/userModel")
import { createToken } from "../util/JWT";

export default {
    signUp, logIn, profileUpdate, forgotPassword
}

// Sign-Up API
export async function signUp(req: Request, res: Response, next: NextFunction) {
    const {name, email, mob, countryCode, isnCode, password} = req.body
    try {
        const data = await User.findOne({email})
        if (data) {
            return next({
                status: 409,
                code: `already_exists`,
                message: 'User already exists'
            })
        }

        const user = new User()
        user.uuid = uuidv4()
        user.name = name
        user.email = email
        user.mob = mob
        user.countryCode = countryCode
        user.isnCode = isnCode
        user.password = hashSync(password, 8)
        await user.save()

        res.json({
            success: true,
            message: `Sign-up successfully`,
            data: user
        })
    } catch (error) {
        return next(error)
    }
}

// LogIn API
export async function logIn(req: Request, res: Response, next: NextFunction) {
    const {email, password} = req.body
    try {
        const data: any = await User.findOne({email})
        if (!data) {
            return next({
                status: 404,
                code: `not_found`,
                message: 'User does not exists'
            })
        }

        // check password
        const checkPassword: boolean = compareSync(password, data.password);
        if (!checkPassword) {
            return next({
                status: 409,
                code: `invalid_credential`,
                message: 'Invalid credential'
            })
        }

        const userInfo = {...data._doc}
        delete userInfo.password

        userInfo.token = await createToken({
            userId: userInfo.uuid
        })
        
        return res.json({
            success: true,
            message: `LogIn successfully`,
            data: userInfo
        })
    } catch (error) {
        return next(error)
    }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
    const uuid = req.params.uuid
    try {
        const data = await User.findOne({uuid})
        if (!data) {
            return next({
                status: 404,
                code: `not_found`,
                message: 'User not found'
            })
        }

        const userInfo = {...data._doc}
        delete userInfo.password
        
        res.json({
            success: true,
            message: `Profile fetched successfully.`,
            data: userInfo
        })
    } catch (error) {
        return next(error)
    }
}

// Profile update API
export async function profileUpdate(req: Request, res: Response, next: NextFunction) {
    const {uuid, name, mob, countryCode, isnCode, password} = req.body
    try {
        const user = await User.findOne({uuid})
        if (!user) {
            return next({
                status: 404,
                code: `not_found`,
                message: 'User not found'
            })
        }

        user.name = name
        user.mob = mob
        user.countryCode = countryCode
        user.isnCode = isnCode
        await user.save()

        res.json({
            success: true,
            message: `Profile updated successfully`,
            data: user
        })
    } catch (error) {
        return next(error)
    }
}

// Forgot password API
export async function forgotPassword(req: Request, res: Response, next: NextFunction) {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if (!user) {
            return next({
                status: 404,
                code: `not_found`,
                message: 'User not found'
            })
        }

        user.password = hashSync(password, 8)
        await user.save()

        res.json({
            success: true,
            message: `Password updated successfully`,
        })
    } catch (error) {
        return next(error)
    }
}