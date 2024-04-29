import Controller, { Method } from "../core/controller";
import User from "../models/user.model";

import Employee from "../models/employee.model";
import logger from "../core/logger";
import EmployeeInputDTO from "../types/employee/employeeInput.dto";
import UserInputDTO from "../types/user/userInput.dto";

const controller = new Controller("user");

controller.addEndpoint(
    Method.GET,
    "",
    (req, res) => {
        res.json({ message: "Get Users" });
    }
);

controller.addEndpoint(
    Method.GET,
    ":id",
    (req, res) => {
        res.json({ message: `${req.params.id}` });
    }
);

controller.addEndpoint(
    Method.POST,
    "",
    async (req, res) => {

        try {
            const employee = await Employee.create<EmployeeInputDTO>(req.body.employee as EmployeeInputDTO);

            const user = await User.create<UserInputDTO>(
                {
                    ...req.body.user,
                    employee: employee._id
                } as UserInputDTO
            );

            res.json(user._id);
        } catch (error) {
            logger.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }

    }
);

controller.addEndpoint(
    Method.PUT,
    ":id",
    (req, res) => {
        res.json({ message: "Update User" });
    }
);

controller.addEndpoint(
    Method.DELETE,
    ":id",
    async (req, res) => {
        try {
            const employeeId = (await User.findById(req.params.id))?.employee;
            await User.deleteOne({ _id: req.params.id });
            await Employee.deleteOne({ _id: employeeId });
        }
        catch (error) {
            logger.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
        res.json({ message: "Delete User" });
    }
);

export default controller;