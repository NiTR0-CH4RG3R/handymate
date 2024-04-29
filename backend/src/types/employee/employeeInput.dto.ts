import EmployeePosition from './employeePosition.enum';

export default interface EmployeeInputDTO {
    name: {
        first: string;
        last?: string;
    }
    address: string;
    email?: string;
    phone01: string;
    phone02?: string;
    position: EmployeePosition;
}