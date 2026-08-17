import User from "./user.js";
import Task from "./task.js";
import personalData from "./personalData.js";
import Tag from "./tag.js";
import TaskTag from "./taskTag.js";

User.hasMany(Task, { foreignKey: "user_id", as: "tasks" });

Task.belongsTo(User, {
    foreignKey: { name: "user_id", allowNull: false },
    as: "user",
});

User.hasOne(personalData, { foreignKey: "user_id", as: "dataPersonal" });

personalData.belongsTo(User, { foreignKey: "user_id", as: "user" });

Task.belongsToMany(Tag, {
    through: TaskTag,
    foreignKey: "task_id",
    as: "tags",
});
Tag.belongsToMany(Task, {
    through: TaskTag,
    foreignKey: "tag_id",
    as: "tasks",
});

export { User, Task, personalData, Tag, TaskTag };