import ENVIRONMENT from "./config/environment.config.js";
import connectMongoDB from "./config/mongodb.config.js";
import express from "express";

/* SOLO EN LOCAL Y SI TENER PROBLEMAS DE DNS PARA CONECTARTE A MONGODB */
import dns from 'dns';
import authRouter from "./routes/auth.router.js";
import { ok } from "assert";
import { stat } from "fs";
import authMiddleware from "./middleware/auth.middleware.js";
import workspaceRouter from "./routes/workspace.router.js";


if(ENVIRONMENT.MODE === 'development'){
    dns.setServers(['8.8.8.8', '8.8.4.4']);
}

connectMongoDB()

/* 
Crear una API de express
Route:
    /api/auth => Trabaja todo lo relacionado a autentificacion
        POST /register
            body: {name, email, password}
            Validar que el usuario tenga nombre mayor a 2 caracteres
            Validar email
            Validar password con almenos 6 caracteres 
            Crear un usuario en la DB
        



Mas Adelante...
        POST /login
        
RECOMENDACION:
    El controller puede ser asincrono!!
    authRouter.post(
        '/register', 
        async (request, response) => {
            await userRepository.create('pepe')
        }
    )
*/


const app = express();
const PORT = ENVIRONMENT.PORT;

import cors from 'cors'

// Habilitamos las consultas cross-origin
app.use(cors())
// Parse JSON
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/workspace', workspaceRouter)



app.get('/api/profile',
    authMiddleware,
    (request, response) => {
        console.log("SE ACTIVA EL CONTROLADOR")
    return response.json({
        ok: true,
        status: 200,
        message: "estas autenticado"
    })
 }
)



app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
/*
Crear una API de express
Route:
    /api/auth => Trabaja todo lo relacionado a autentificacion
        POST /register
            body: {name, email, password}
            Crear un usuario en la DB
            Validar que el usuario tenga nombre mayor a 2 caracteres
            Validar email
            Password con al menos 6 caracteres


Mas adelante...
        POST /login

RECOMENDACION:
    authRouter.post('/register', 
        async (request, response) => {
            await userRepository.create('pepe')
            }
        )   

*/

/* 
Ruta: /api/workspace


    controlador: workspaceController
        
        POST '/' post() Debe estar con el authMiddleware (IMPORTANTE)
            Validar nombre y descripcion (opcional)
            Crear un espacio de trabajo
            Crear una membresia de role tipo 'dueño' a nombre del id del cliente consultante.
            
            body: {
                nombre,
                descripcion
            }

        GET '/' getAllByUser() Debe estar con el authMiddleware (IMPORTANTE)
            Buscar todos los espacios de trabajo de los que el cliente consultante es miembro 
            Responder con la lista de espacios de trabajo

        DELETE '/:workspace_id' deleteById() Debe estar con el authMiddleware
            Validar que el espacio de trabajo exista => 404
            Validar que el usuario consultante sea 'dueño' de dicho espacio de trabajo => 403 Forbidden
            Eliminar (Soft o Hard) el espacio de trabajo

        PUT '/:workspace_id' updateById() Debe estar con el authMiddleware
            body: {
                nombre (opcional),
                descripcion (opcional)
            }
            Validar que el espacio de trabajo exista => 404
            Validar que el usuario consultante sea 'dueño' o 'admin' de dicho espacio de trabajo => 403 Forbidden
            Actualizar los campos correspondientes.

    RECOMENDACION:
        Como se repite 
            Validar que el espacio de trabajo exista
            Validar que el cliente consultante sea miembro del espacio de trabajo
        Vendria muy bien usar un middleware que se llame workspaceMiddleware
        Haria:
            - Validar que el espacio de trabajo exista
            - Validar que el cliente consultante sea miembro del espacio de trabajo
            - Guardar en la request la info de:
                workspace
                member
*/



/* 
Un endpoint donde el cliente debera enviarnos por header de autorizacion el access token, en caso de estar presente y ser correcto
Le daremos los datos de la cuenta
*/