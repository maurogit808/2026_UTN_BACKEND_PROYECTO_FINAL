import ServerError from "../helpers/serverError.helper.js"
import Workspace from "../models/workspace.model.js"
import WorkspaceMember from "../models/workspace_Members.model.js"
import workspaceRepository from "../repositories/workspace.repository.js"
import workspaceMemberRepository from "../repositories/workspaceMember.repository.js"

function workspaceMiddleware (valid_roles = []){

    return async function (request, response, next) {
        try{
            const user_id = request.user.id
            const workspace_id = request.params.workspace_id
    
            if (!workspace_id) {
                throw new ServerError("No se proporciono el id del espacio de trabajo", 400)
            }
    
            const workspace = await workspaceRepository.getById(workspace_id)
            if (!workspace) {
                throw new ServerError("No se encontro el espacio de trabajo", 404)
            }
    
            //Quiero obtener la membresia cuyo user id sea el del cliente y workspace_id sea el indicado por el params
            const member_selected = await workspaceMemberRepository.getByUserAndWorkspaceId(user_id, workspace_id)

            if (!member_selected) {
                throw new ServerError("No eres miembro de este espacio de trabajo", 403)
            }   

            if(valid_roles.length > 0 && !valid_roles.includes(member_selected.rol)){
                throw new ServerError("No tenes el rol necesario para esta accion", 403)
            }
    
            request.workspace = workspace
            request.membership = member_selected
    
            return next()
    
        }catch (error) {
            if (error instanceof ServerError) {
                return response.status(error.status).json(
                    {
                        message: error.message,
                        ok: false,
                        status: error.status
                    }
                    )
                }
                else {
                        console.error('Error critico:', error);
                        return response.status(500).json({
                            message: "Error interno del servidor",
                            ok: false,
                            status: 500
                        });
                }
        
        }
    } 
}

/* async function workspaceMiddleware(request, response, next) {
    try{
        const user_id = request.user.id
        const workspace_id = request.params.workspace_id

        if (!workspace_id) {
            throw new ServerError("No se proporciono el id del espacio de trabajo", 400)
        }

        const workspace = await workspaceRepository.getById(workspace_id)
        if (!workspace) {
            throw new ServerError("No se encontro el espacio de trabajo", 404)
        }

        //Quiero obtener la membresia cuyo user id sea el del cliente y workspace_id sea el indicado por el params
        const member_selected = await workspaceMemberRepository.getByUserAndWorkspaceId(user_id, workspace_id)

       
        if (!member_selected) {
            throw new ServerError("No eres miembro de este espacio de trabajo", 403)
        }

        request.workspace = workspace
        request.membership = member_selected

        return next()

    }catch (error) {
        if (error instanceof ServerError) {
            return response.status(error.status).json(
                {
                    message: error.message,
                    ok: false,
                    status: error.status
                }
                )
            }
            else {
                    console.error('Error critico:', error);
                    return response.status(500).json({
                        message: "Error interno del servidor",
                        ok: false,
                        status: 500
                    });
            }
    
    }
} */

export default workspaceMiddleware

/* function alertar(mensaje){
    
    return function (event){
        console.log('alerta! ' + mensaje)
    }
}

document.addEventListener('click', alertar('Ocurrio un click'))
document.addEventListener('dblclick', alertar("Ocurrio un doble click")) */