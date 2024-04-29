// import { Schema, model } from "mongoose";
// import { v4 as uuidv4 } from "uuid";

// export interface IResource {
//     _id?: string;
//     extension: string;
//     uri: string;
//     size: number;
//     hashSHA256: string;
//     addedDate?: Date;
// }

// const schema = new Schema({
//     _id: { type: Schema.Types.UUID, default: uuidv4(), required: true },
//     extension: { type: String, required: true },
//     uri: { type: String, required: true },
//     size: { type: Number, required: true },
//     hashSHA256: { type: String, required: true },
//     addedDate: { type: Date, default: Date.now },
// },
//     {
//         toJSON: { virtuals: true },
//         toObject: { virtuals: true }
//     }
// );

// export default model<IResource>("Resource", schema);


import { Document, Schema, model } from "mongoose";
import ResourceOutputDTO from "../types/resource/resourceOutputDTO";

export interface ResourceDocument extends ResourceOutputDTO, Document {
    _id: string;
}

const schema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    extension: { type: String, required: true },
    uri: { type: String, required: true },
    size: { type: Number, required: true },
    hashSHA256: { type: String, required: true },
    addedDate: { type: Date, default: Date.now },
});

export default model<ResourceDocument>("Resource", schema);