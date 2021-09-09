import execPromise from '../helpers/promise';

interface Auth {
  email: string;
  password: string;
}

export default {

  findEmail: (email: string) => {
    return execPromise('SELECT email FROM users WHERE email=?', [email])
  },

  signUp: ({email, password}: Auth) => {
   return execPromise('INSERT INTO users (email, password) VALUES (?, ?)', [email, password])
 },

 signIn: (email: string) => {
  return execPromise('SELECT * FROM users WHERE email=?', [email])
 },

 updateProfile: (data: object, id: number) => {
  return execPromise('UPDATE users SET ? WHERE id=?', [data, id])
}

}