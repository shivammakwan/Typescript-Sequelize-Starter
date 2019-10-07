import { Users } from "../../models/Users";
import { transaction } from "../../utils/transaction";
import { responseGenerator, decryptPassword, tokenEncrypt, encryptPassword, sendEmail } from "../../utils/functions";
import codes from "../../utils/code";
import messages from "../../utils/message";
import validator from "validator";
import { sequelizeConfig as Sequelize } from "../../config/sequelize";
import { Transaction } from "sequelize";
import fs from "fs";

const Op = require('sequelize').Op;

export default class Repository {

    @transaction()
    public async doRegistration(info: any, transaction?: Transaction) {
        try {
            if (
                !validator.isEmail(info.userEmail) &&
                !validator.isEmpty(info.userPassword) &&
                !validator.isEmpty(info.fullName)
            ) {
                return {
                    code: codes.invalidDetails,
                    message: messages.invalidDetails,
                    data: null
                };
            }

            const userPassword = encryptPassword(info.userPassword);
            return await Users.findOrCreate({
                where: {
                    email: {
                        [Op.eq]: info.userEmail
                    }
                },
                transaction,
                defaults: {
                    name: info.fullName,
                    email: info.userEmail,
                    password: userPassword,
                    status: 0
                }
            }).then(async ([user, created]) => {
                try {
                    console.log("Users", user);
                    console.log("isCreated", created);
                    if (created === true) {
                        // generating token
                        let token = await tokenEncrypt(info.userEmail);
                        token = Buffer.from(token, 'ascii').toString('hex');
                        //sending email if registered
                        let emailMessage = fs
                            .readFileSync("../emailtemplate/welcome.html", "utf8")
                            .toString();
                        emailMessage = emailMessage
                            .replace('$fullname', info.fullName)
                            .replace('$link', process.env.EMAIL_VERIFIED_LINK + token);

                        await sendEmail(
                            info.emailAddress,
                            messages.registrationEmailSubject,
                            emailMessage
                        );

                        return {
                            code: codes.success,
                            message: messages.success,
                            data: { token: token }
                        };
                    } else {
                        return {
                            code: codes.invalidDetails,
                            message: messages.duplicateDetails,
                            data: null
                        }
                    }
                } catch (err) {
                    console.log(err);
                    return {
                        code: codes.invalidDetails,
                        message: messages.invalidDetails,
                        data: null
                    }
                }
            });


        } catch (err) {
            console.log(err);
            return {
                code: codes.invalidDetails,
                message: messages.invalidDetails,
                data: null
            }
        }
    }

    @transaction()
    public async getAllUsers() {
        try {
            return await Users.findAll();
        } catch (err) {
            console.log(err);
        }
    }

    @transaction()
    public async getUserById(id: any) {
        try {
            return await Users.findByPk(id);
        } catch (err) {
            console.log(err);
        }
    }


    /**
   * API for user login
   * @param {*} req (email address & password)
   * @param {*} res (json with success/failure)
   */
    async login(info: any) {
        try {
            if (!validator.isEmail(info.emailAddress)) {
                return {
                    code: codes.invalidDetails,
                    message: messages.invalidLoginDetails,
                    data: null
                };
            }

            const loginDetails: any = await Users.findOne({
                where: {
                    id: {
                        [Op.eq]: info.emailAddress
                    }
                }
            });

            if (loginDetails.length <= 0) {
                return {
                    code: codes.invalidDetails,
                    message: messages.invalidLoginDetails,
                    data: null
                };
            }
            const password = decryptPassword(loginDetails[0].userPassword);
            if (password !== info.userPassword) {
                return {
                    code: codes.invalidDetails,
                    message: messages.invalidLoginDetails,
                    data: null
                };
            }


            if (loginDetails[0].isEmailVerified === 0) {
                return {
                    code: codes.invalidDetails,
                    message: messages.emailVerify,
                    data: null
                };
            }

            const token = await tokenEncrypt(loginDetails[0]);
            delete loginDetails[0].userPassword;
            delete loginDetails[0].isEmailVerified;
            delete loginDetails[0].isActive;
            delete loginDetails[0].isAdmin;
            delete loginDetails[0].isDeleted;
            return {
                code: codes.success,
                message: messages.success,
                data: loginDetails,
                token: token
            };
        } catch (e) {
            return {
                code: codes.unexceptedError,
                message: messages.tryCatch,
                data: e.message
            };
        }
    }
}
