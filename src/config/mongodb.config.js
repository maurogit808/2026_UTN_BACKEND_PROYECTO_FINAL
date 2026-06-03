import mongoose from "mongoose"
import ENVIRONMENT from "./environment.config.js"


   
const connectMongoDB = async ( ) => {
try{
    await mongoose.connect(ENVIRONMENT.MONGO_DB_CONNECTION_STRING + '/' + ENVIRONMENT.MONGO_DB_NAME
        
    )
     
    console.log("La conexion con MongoDB funciona")
}
catch(error){
    console.error("Hubo un fallo en la conexion de la DB", error)
}
   
}

export default connectMongoDB

/*

    Como manejar un inicio de sesion?

    Vamos a tener un endpoint
    POST /api/auth/login
       body: {email, password}

       - Buscar al usuario por email
       - Validar la contraseña (bcrypt.compare(texto_original, texto_hasheado) esto devolvera un booleano)
       - Crear un jsonwebtoken con los datos de sesion del usuario (username, email, id, created_at, etc)
       - responder con ese token (access_token) al cliente
*/