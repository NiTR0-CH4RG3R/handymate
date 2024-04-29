import { Document, Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import TaskState from "../types/task/taskState.enum";
import TaskStatusInputDTO from "../types/task/taskStatusInputDTO";
import TaskInputDTO from "../types/task/taskInputDTO";

export interface TaskStatusDocument extends TaskStatusInputDTO, Document { }

export interface TaskDocument extends TaskInputDTO, Document {
    _id: string;
    status: TaskStatusDocument[];
}

const taskStatusSchema = new Schema({
    description: { type: String, required: true },
    status: { type: String, enum: Object.values(TaskState), required: true },
    resources: [{ type: Schema.Types.UUID, ref: 'Resource', required: false }],
    assignedTo: { type: Schema.Types.UUID, ref: 'Employee', required: false },
    addedDate: { type: Date, default: Date.now },
    addedBy: { type: Schema.Types.UUID, ref: 'User', required: false }
});

const schema = new Schema({
    _id: { type: Schema.Types.UUID, default: uuidv4(), required: true },
    title: { type: String, required: true },
    status: [taskStatusSchema]
});

export default model<TaskDocument>("Task", schema);
