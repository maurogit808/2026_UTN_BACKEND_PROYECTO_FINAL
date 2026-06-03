import mongoose from "mongoose";
import { WORKSPACE_COLLECTION_NAME } from "./workspace.model.js";
import { USER_COLLECTION_NAME } from "./user.model.js";
import { MEMBER_WORKSPACE_ROLES } from "../constants/membersRoles.constant.js";

const workspaceMemberSchema = new mongoose.Schema({
    fk_workspace_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: WORKSPACE_COLLECTION_NAME
    },
    fk_user_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: USER_COLLECTION_NAME
    },
    fecha_creacion: {
        type: Date,
        default: Date.now,
        required: true
    },
    rol: {
        enum: [MEMBER_WORKSPACE_ROLES.ADMIN, MEMBER_WORKSPACE_ROLES.OWNER, MEMBER_WORKSPACE_ROLES.USER],
        type: String,
        default: MEMBER_WORKSPACE_ROLES.USER
    }
})
export const WORKSPACE_MEMBER_MODEL_NAME = 'WorkspaceMember'
const WorkspaceMember = mongoose.model(WORKSPACE_MEMBER_MODEL_NAME, workspaceMemberSchema)

export default WorkspaceMember