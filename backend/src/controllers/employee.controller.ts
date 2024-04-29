import Controller, { Method } from '../core/controller';

const controller = new Controller('employees');


controller.addEndpoint(
    Method.GET,
    [1, 2],
    async (req, res) => {
        res.json({ message: 'Get Participants' });
    }
);

controller.addEndpoint(
    Method.GET,
    ':id',
    async (req, res) => {
        res.json({ message: `${req.params.id}` });
    }
);

controller.addEndpoint(
    Method.POST,
    async (req, res) => {
        res.json({ message: 'Create Participant' });
    }
);

controller.addEndpoint(
    Method.PUT,
    ':id',
    async (req, res) => {
        res.json({ message: 'Update Participant' });
    }
);

controller.addEndpoint(
    Method.DELETE,
    ':id',
    async (req, res) => {
        res.json({ message: 'Delete Participant' });
    }
);

export default controller;
