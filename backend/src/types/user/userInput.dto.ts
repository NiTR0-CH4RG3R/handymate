import UserRole from "./userRole.enum";

export default interface UserInputDTO {
    username: string;
    password: string;
    roles: UserRole[];
    employee: string;
}
