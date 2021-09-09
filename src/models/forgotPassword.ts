import execPromise from "../helpers/promise"

export default {

  createForgotData: (code: string, id: number) => {
    return execPromise('INSERT INTO forgot_password SET ?', [{code, user_id: id}])
  },

  getUserByCode: (code: string) => {
    return execPromise('SELECT u.id, u.email, r.code FROM forgot_password r LEFT JOIN users u ON r.user_id=u.id WHERE r.code=?', [code])
  },

  deleteCode: (code: string) => {
    return execPromise('DELETE FROM forgot_password WHERE code=?', [code])
  }

}