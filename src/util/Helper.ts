import { Request, Response, NextFunction } from "express"

import { verifyToken } from "../util/JWT"
const User = require("../models/userModel")

export {
  checkToken,
  getTotalPages
}

const SECRET_KEY = process.env.JWT_SECRET_KEY

// header check by key value pairs
async function checkToken(req: Request, res: any, next: NextFunction) {
  const authHeader = req.header('authorization')
  // if err or token is empty or null
  if (!authHeader) {
    const errMsg = {
      token: {
        msg: 'Authorization header is missing',
        location: ''
      }
    }
    return res.status(400).send(errMsg)
  }

  // replace bearer
  const token: string = authHeader.replace("Bearer ", "")

  //  function verified 
  const decoded = await verifyToken(token, next)

  const userInfo: any = await User.findOne({uuid: decoded.userId})
  if (!userInfo) {
      return next({
          status: 404,
          code: `not_found`,
          message: 'User does not exists'
      })
  }

  res.userId = decoded.userId
  // if token value is wrong
  if (!decoded) {
    return res.status(400).send('Token is not valid')
  }

  return next()
}

function getTotalPages(totalItems: number, itemsPerPage: number) {
  return Math.floor((totalItems + itemsPerPage - 1) / itemsPerPage);
}