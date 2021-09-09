import connection from "../config";

const execPromise = (sql: string, data: any[]) => {
  return new Promise((resolve, reject) => {
    connection.db.query(sql, data, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

export default execPromise