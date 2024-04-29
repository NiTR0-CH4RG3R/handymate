
import { Schema, model, Document, CallbackWithoutResultAndOptionalError } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";
import UserOutputDTO from "../types/user/userOutput.dto";
import UserRole from "../types/user/userRole.enum";

export interface UserDocument extends UserOutputDTO, Document {
    _id: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const schema = new Schema(
    {
        _id: { type: Schema.Types.UUID, default: uuidv4(), required: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        roles: { type: Object.values(UserRole), required: true },
        addedDate: { type: Date, default: Date.now },
        addedBy: { type: Schema.Types.UUID, ref: 'User', required: false },
        employee: { type: Schema.Types.UUID, ref: 'Employee', required: true },
    }
);


schema.pre(
    "save",
    async function (this: UserDocument, next: CallbackWithoutResultAndOptionalError) {
        // only hash the password if it has been modified (or is new)
        if (!this.isModified("password")) return next();

        // Random additional data
        const salt = await bcrypt.genSalt();

        const hash = await bcrypt.hashSync(this.password, salt);

        // Replace the password with the hash
        this.password = hash;

        return next();
    }
);

schema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    const user = this as UserDocument;
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

export default model<UserDocument>("User", schema);