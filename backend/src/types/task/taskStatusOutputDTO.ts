import TaskStatusInputDTO from "./taskStatusInputDTO";

export default interface TaskStatusOutputDTO extends TaskStatusInputDTO {
    addedDate: Date;
    addedBy: string;
}