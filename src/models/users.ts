import execPromise from '../helpers/promise';

interface Auth {
  fullname: string;
  email: string;
  password: string;
}

export default {

  findEmail: (email: string) => {
    return execPromise('SELECT email FROM users WHERE email=?', [email])
  },

  signUp: ({fullname, email, password}: Auth) => {
   return execPromise('INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)', [fullname, email, password])
 },

 signIn: (email: string) => {
  return execPromise('SELECT * FROM users WHERE email=?', [email])
 },

 updateProfile: (data: object, id: number) => {
  return execPromise('UPDATE users SET ? WHERE id=?', [data, id])
}

}