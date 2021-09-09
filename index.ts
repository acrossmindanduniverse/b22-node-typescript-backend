import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connection from './src/config'
import routes from './src/routes'

const { PORT } = process.env

const app = express()

app.use(cors())
app.use(express.urlencoded({extended: false}))

app.use('/', routes)

app.listen(PORT, () => {
  console.log(`App running on ${PORT}`)
})


connection.db.connect((err) => {
  if (err) {
    throw err
  } else {
    console.log('Database has connected')
  }
})