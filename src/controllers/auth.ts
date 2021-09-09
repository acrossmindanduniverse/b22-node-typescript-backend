import { Response, Request } from 'express'
import response from './../helpers/response';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import auth from '../models/users';
import forgotPasswordModel from '../models/forgotPassword'
import connection from './../config';
import nodemailer from 'nodemailer'


export const signUp = async (req: Request, res: Response) => {
  const setData = req.body
  setData.password = await bcrypt.hash(setData.password, await bcrypt.genSalt())
  try {
    const findEmail: any = await auth.findEmail(setData.email)
    if (findEmail.length > 0) {
      return response(res, 400, false, 'Email unavailable')
    } else {
      const result = await auth.signUp(setData)
      return response(res, 200, true, result)
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'An error occured')
  }
}

export const signIn = async(req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const result: any = await auth.signIn(email)
    console.log(result)
    if (result.length < 1) return response(res, 400, false, 'email or password did not match')
    const user = result[0]
    const compare = await bcrypt.compare(password, user.password)
    if (compare) {
      const token = jwt.sign({ ...result }, `${connection.JWT.secretKey}`, {
        expiresIn: '24h'
      })
      const newResult = {token, id: user.id, email: user.email, fullname: user.fullname}
      return response(res, 200, true, newResult)
    } else {
      return response(res, 400, false, 'email or password did not match')
    }
  } catch (err) {
    return response(res, 500, false, 'An error occured')
  }
}

// export const forgotPassword = async(req: Request, res: Response) => {
//   try {
//     let testAccount = await nodemailer.createTestAccount()
//     let transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 465,
//       secure: true,
//       auth: {
//         type: 'OAuth2',
//         user: testAccount.user,
//         serviceClient: connection.application_credentials.client_id,
//         privateKey: connection.application_credentials.private_key,
//         accessToken: '',
//       }
//     })
//     let info = await transporter.sendMail({
//       from: `"Admin" <admin@mail.com>`,
//       to: req.body.email,
//       subject: "testing",
//       html: '<b>testing</b>'
//     })
//     console.log("Message sent: %s", info);
//     return response(res, 200, true, info)
//   } catch(err) {
//     return response(res, 500, false, 'An error occured')
//   }
// }

export const forgotPassword = async(req: Request, res: Response) => {
  const { email } = req.body
  try {
    const result: any = await auth.signIn(email)
    const randomResult = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1)
    if (result.length > 0) {
      await forgotPasswordModel.createForgotData(randomResult, result[0].id)
      return response(res, 200, true, 'Request has been sent to email')
    } else {
      return response(res, 400, false, 'Email not found')
    }
  } catch (err) {
    return response(res, 500, false, 'An error occured')
  }
}

export const resetPassword = async(req: Request, res: Response) => {
  const { email, reset_code, new_password, confirm_password } = req.body
  try {
    const user: any = await forgotPasswordModel.getUserByCode(reset_code)
    if (user.length < 1 || user[0].email !== email) return response(res, 400, false, 'Wrong code or email')

    if (new_password.length < 8) return response(res, 400, false, 'Password must be 8 or greater characters long')

    if (confirm_password !== new_password) return response(res, 400, false, 'Password did not match')
    console.log(user[0])

    const newPassword: any = await bcrypt.hash(new_password, await bcrypt.genSalt())
    const update = await auth.updateProfile({password: newPassword}, user[0].id)
    await forgotPasswordModel.deleteCode(reset_code)

    return response(res, 200, true, update)
  } catch (err) {
    return response(res, 500, false, 'An error occrured')
  }
}