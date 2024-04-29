import TaskInputDTO from "./taskInputDTO";
import TaskStatusOutputDTO from "./taskStatusOutputDTO";

export default interface TaskOutputDTO extends TaskInputDTO {
    _id: string;
    status: TaskStatusOutputDTO[];
}