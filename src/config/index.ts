import mysql2 from 'mysql2'

const {

  MYSQL_HOST_DEV,
  MYSQL_USER_DEV,
  MYSQL_PASSWORD_DEV,
  MYSQL_DATABASE_DEV,
  JWT_SECRET_KEY_DEV,

  GOOGLE_CLOUD_ACCOUNT_TYPE,
  GOOGLE_CLOUD_PROJECT_ID,
  GOOGLE_CLOUD_PRIVATE_KEY_ID,
  GOOGLE_CLOUD_PRIVATE_KEY,
  GOOGLE_CLOUD_CLIENT_EMAIL,
  GOOGLE_CLOUD_CLIENT_ID,
  GOOGLE_CLOUD_AUTH_URI,
  GOOGLE_CLOUD_TOKEN_URI,
  GOOGLE_CLOUD_AUTH_PROVIDER_X509,
  GOOGLE_CLOUD_CLIENT_X509
} = process.env

const connection = {
  db: mysql2.createConnection({
    host: MYSQL_HOST_DEV,
    user: MYSQL_USER_DEV,
    password: MYSQL_PASSWORD_DEV,
    database: MYSQL_DATABASE_DEV
  }),
  JWT: {
    secretKey: JWT_SECRET_KEY_DEV
  },
  application_credentials: {
    type: GOOGLE_CLOUD_ACCOUNT_TYPE,
    project_id: GOOGLE_CLOUD_PROJECT_ID,
    private_key_id: GOOGLE_CLOUD_PRIVATE_KEY_ID,
    private_key: GOOGLE_CLOUD_PRIVATE_KEY,
    client_email: GOOGLE_CLOUD_CLIENT_EMAIL,
    client_id: GOOGLE_CLOUD_CLIENT_ID,
    auth_uri: GOOGLE_CLOUD_AUTH_URI,
    token_uri: GOOGLE_CLOUD_TOKEN_URI,
    auth_provider_x509_cert_url: GOOGLE_CLOUD_AUTH_PROVIDER_X509,
    client_x509_cert_url: GOOGLE_CLOUD_CLIENT_X509
  }
}

export default connection