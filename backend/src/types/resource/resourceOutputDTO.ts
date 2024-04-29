import ResourceInputDTO from './resourceInputDTO'

export default interface ResourceOutputDTO extends ResourceInputDTO {
    _id: string;
    addedDate: Date;
}