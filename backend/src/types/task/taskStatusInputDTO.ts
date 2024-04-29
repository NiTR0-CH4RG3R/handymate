import TaskState from "./taskState.enum";

export default interface TaskStatusInputDTO {
    description: string;
    status: TaskState;
    resources: string[];
    assignedTo?: string;
}