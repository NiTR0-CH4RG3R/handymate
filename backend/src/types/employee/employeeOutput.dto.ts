import EmployeeInputDTO from "./employeeInput.dto";

export default interface EmployeeOutputDTO extends EmployeeInputDTO {
    _id: string;
    addedDate: Date;
    addedBy: string;
    fullName: string;
}