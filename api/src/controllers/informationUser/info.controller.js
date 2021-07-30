const { User, InformationUser } = require("../../db");

module.exports = {
  createInfoUser: async (data) => {
    return await InformationUser.create(data).then((data) => data);
  },
  getInfoUser: async () => {
    return await InformationUser.findAll().then((usersdata) => usersdata);
  },
  getInfoByUserId: async (userId) => {
    return await InformationUser.findOne({
      where:{userId: userId}
    }).then((userdata) => userdata);
  },
  editInfoUser: async (userId, data) => {
    return await InformationUser.update(data, {
      where: {
        userId: userId,
      },
    }).then((userdata) => userdata[0] ? "User data update successful" : "User data update fail");
  },
  deleteInfoUser: async (userId) => {
    return await InformationUser.destroy(
      {
        where: {
          userId: userId,
        },
      }
    ).then((userdata) => userdata ? "User data delete successful" : "User data delete fail");
  },
};
