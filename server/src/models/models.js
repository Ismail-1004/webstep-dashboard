import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Group = sequelize.define("group", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    course: { type: DataTypes.STRING, allowNull: false },
    monthlyFee: { type: DataTypes.INTEGER, allowNull: true }
});

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    paid: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    mustPay: { type: DataTypes.INTEGER, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
});

const Consumption = sequelize.define("consumption", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    consumption: { type: DataTypes.INTEGER, allowNull: false },
    paid: { type: DataTypes.INTEGER, allowNull: true }
});

User.beforeValidate(async (user, options) => {
    const group = await Group.findByPk(user.groupId);
    if (group) {
        user.mustPay = group.monthlyFee; 
    }
});

Group.hasMany(User, { foreignKey: 'groupId' });
User.belongsTo(Group, { foreignKey: 'groupId' });

export default { User, Group, Consumption };