import UserInputDTO from "./userInput.dto";

export default interface UserOutputDTO extends UserInputDTO {
    _id: string;
    addedDate: Date;
    addedBy: string;
}
