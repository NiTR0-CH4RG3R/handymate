import Controller, { Method, Endpoint } from '../core/controller';
import TaskModel from '../models/task.model';

export const controller = new Controller('task');

controller.addEndpoint(
    Method.GET,
    async (req, res) => {
        res.json({ message: 'Get Participants' });
    }
);

controller.addEndpoint(
    Method.GET,
    ':id',
    async (req, res) => {
        res.json({ message: 'Get Participant' });
    }
);

controller.addEndpoint(
    Method.POST,
    async (req, res) => {
        try {
            const user = new TaskModel(req.body.task);
            await user.save();
        }
        catch (error) {
            console.log(error)
        }
        res.json({ message: 'Create Participant' });
    }
);

controller.addEndpoint(
    Method.PUT,
    'id',
    async (req, res) => {
        res.json({ message: 'Update Participant' });
    }
);

controller.addEndpoint(
    Method.DELETE,
    ':id',
    (req, res) => {
        res.json({ message: 'Delete Participant' });
    }
);

export default controller;