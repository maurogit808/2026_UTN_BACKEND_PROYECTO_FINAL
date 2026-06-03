import dotenv from 'dotenv'

//Lee el archivo .env e inyecta las variables de entorno dentro de process.env
dotenv.config()

//Guardar en mismo lugar las variables de entorno
const ENVIRONMENT = {
    MONGO_DB_CONNECTION_STRING: process.env.MONGO_DB_CONNECTION_STRING,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    MODE: process.env.MODE,
    PORT: process.env.PORT,
    GMAIL_USERNAME: process.env.GMAIL_USERNAME,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    URL_BACKEND: process.env.URL_BACKEND,
    JWT_SECRET: process.env.JWT_SECRET
}

export default ENVIRONMENT