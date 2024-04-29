// import User, { UserDocument, UserInput } from '../models/user.model';
// import Employee, { EmployeeDocument, EmployeeInput } from '../models/employee.model';
// import { FilterQuery, QueryOptions } from 'mongoose';

// export async function createUser(employee: EmployeeInput, user: UserInput): Promise<UserDocument> {
//     // First create the employee
//     const employeeDoc: EmployeeDocument = await Employee.create<EmployeeInput>(employee);
//     // Then create the user
//     return await User.create<UserInput>({ ...user, employee: employeeDoc._id });
// }

// export async function getUserById(id: string): Promise<UserDocument> {
//     return await User.findById(id);
// }

