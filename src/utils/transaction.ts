import { sequelizeConfig as sequelizeConfig } from "../config/sequelize";

export function transaction() {
    return function (target: Object, method: string, descriptor: TypedPropertyDescriptor<any>) {
        const originMethod = descriptor.value;
        if (!originMethod) {
            throw "decorator only support method";
        }

        descriptor.value = async function (...args: any[]) {
            if (args.length > 0) {
                const lastArg = args[args.length - 1];
                if (typeof lastArg === "object" && lastArg.LOCK) {
                    return await originMethod.apply(this, args);
                }
                else {
                    const transaction = await sequelizeConfig.transaction();
                    try {
                        args.push(transaction);
                        const value = await originMethod.apply(this, args);
                        transaction.commit();
                        return value;
                    }
                    catch (error) {
                        console.log(error);
                        transaction.rollback();
                        throw (error);
                    }
                }
            }
            else {
                return await originMethod.apply(this, args);
            }
        };
    };
}