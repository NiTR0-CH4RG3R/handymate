// import { model, Schema, Model, Document } from 'mongoose';
// import { v4 as uuidv4 } from "uuid";

// export enum EmployeePosition {
//     CEO,
//     Manager,
// }

// export interface IEmployee extends Document {
//     _id?: string;
//     name: {
//         first: string;
//         last?: string;
//     }
//     address: string;
//     email?: string;
//     phone01: string;
//     phone02?: string;
//     position: EmployeePosition;
//     addedDate?: Date;
//     addedBy?: string;

//     get fullName(): string;
// };

// const schema: Schema = new Schema({
//     _id: { type: Schema.Types.UUID, default: uuidv4(), required: false },
//     name: {
//         first: { type: String, required: true },
//         last: { type: String, required: false }
//     },
//     address: { type: String, required: true },
//     email: { type: String, required: false },
//     phone01: { type: String, required: true },
//     phone02: { type: String, required: false },
//     position: { type: String, enum: Object.values(EmployeePosition), required: true },
//     addedDate: { type: Date, default: Date.now, required: false },
//     addedBy: { type: Schema.Types.UUID, ref: 'User', required: false }
// },
//     {
//         virtuals: {
//             fullName: {
//                 get(): string {
//                     return this.name.first + " " + this.name.last;
//                 }
//             }
//         },
//         toJSON: { virtuals: true },
//         toObject: { virtuals: true }
//     }
// );

// const e: Model<IEmployee> = model("Employee", schema);

// export default Employee;


import { model, Schema, Document } from 'mongoose';
import EmployeePosition from '../types/employee/employeePosition.enum';
import EmployeeOutputDTO from '../types/employee/employeeOutput.dto';
import { v4 as uuidv4 } from 'uuid';


export interface EmployeeDocument extends EmployeeOutputDTO, Document {
    _id: string;
}

const schema: Schema = new Schema({
    _id: { type: Schema.Types.UUID, default: uuidv4(), required: true },
    name: {
        first: { type: String, required: true },
        last: { type: String, required: false }
    },
    address: { type: String, required: true },
    email: { type: String, required: false },
    phone01: { type: String, required: true },
    phone02: { type: String, required: false },
    position: { type: String, enum: Object.values(EmployeePosition), required: true },
    addedDate: { type: Date, default: Date.now, required: false },
    addedBy: { type: Schema.Types.UUID, ref: 'User', required: false }
});

schema.virtual('fullName').get(function (this: EmployeeDocument) {
    return this.name.first + " " + this.name.last;
});

export default model<EmployeeDocument>("Employee", schema);