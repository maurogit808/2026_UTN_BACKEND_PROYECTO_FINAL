import express from 'express';

import authMiddleware from '../middleware/auth.middleware.js';
import workspaceController from '../controllers/workspace.controller.js';
import workspaceMiddleware from '../middleware/workspace.middleware.js';
import { MEMBER_WORKSPACE_ROLES } from '../constants/membersRoles.constant.js';

const workspaceRouter = express.Router();

//Configuramos el authMiddleware a nivel de ruta
workspaceRouter.use(authMiddleware);

workspaceRouter.post('/', workspaceController.create);

workspaceRouter.get('/', workspaceController.getAllByUser);

workspaceRouter.delete(
    '/:workspace_id', 
    workspaceMiddleware([MEMBER_WORKSPACE_ROLES.OWNER]), 
    workspaceController.deleteById
)

workspaceRouter.put(
    '/:workspace_id', 
    workspaceMiddleware([MEMBER_WORKSPACE_ROLES.ADMIN, MEMBER_WORKSPACE_ROLES.OWNER]), 
    workspaceController.updateById
)

export default workspaceRouter;