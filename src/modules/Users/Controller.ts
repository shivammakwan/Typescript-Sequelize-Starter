import { Request, Response, NextFunction } from "express";
import UserRepository from './Repository';
import { Transaction } from "sequelize";
import { responseGenerator } from "../../utils/functions"

/**
 * GET /users
 */

export let getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = new UserRepository();
    userRepository
        .getAllUsers()
        .then((data: any) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => next(err));
};


/**
 * POST /api/user/register
 */
export let doRegistration = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = new UserRepository();
    userRepository
        .doRegistration(req.body)
        .then((response: any) => {
            console.log(response);
            res.json(responseGenerator(response.code, response.message, response.data));
        })
        .catch((err) => next(err));
};
