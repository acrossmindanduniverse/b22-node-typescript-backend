import { Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import response from './../helpers/response';
import connection from './../config/index';

interface AuthReq extends Request {
  authUser: string | JwtPayload
}

const authMiddleware = (req: AuthReq, res: Response, next: Function) => {
  const payload = req.headers.authorization
  if (payload) {
    'Bearer token'
    const token = payload.slice(7)
    try {
      const verify = jwt.verify(token, `${connection.JWT.secretKey}`)
      req.authUser = verify
      next()
    }catch (err) {
      return response(res, 400, false, 'Session expired')
    }
  } else {
    return response(res, 500, false, 'Auth token needed')
  }
}

export default authMiddleware