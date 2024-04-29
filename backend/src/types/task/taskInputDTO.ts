import TaskStatusInputDTO from "./taskStatusInputDTO";

export default interface TaskInputDTO {
    title: string;
    status: TaskStatusInputDTO[];
}