import { Response } from 'express'

const response = 
(
  res: Response, 
  statusCode: number, 
  status?: boolean,
  data?: any
) => {
  const result = {
    data,
    statusCode,
    status
  }

  result.data = data
  result.statusCode = statusCode
  result.status = status

  return res.status(result.statusCode).json({
    result: result.status,
    data: result.data
  })
}

export default response