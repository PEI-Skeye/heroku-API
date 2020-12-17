"use strict";

const { default: createStrapi } = require("strapi");
const {
  findnotibyid,
} = require("../../../api/notification/controllers/notification");
const endpoint = "http://skeye-backend.herokuapp.com";

module.exports = {
  async findnoti(ctx) {
    const userid = ctx.params.id;
    const userInfo = await strapi.plugins[
      "users-permissions"
    ].services.user.fetch({
      _id: userid,
    });
    //console.log(userInfo); // Corre ate aqui
    var notis = [];
    for (var not of userInfo.notifications) {
      const notif = await findnotibyid({ params: { id: not._id } });
      notis.push(notif);
    }

    return notis;
  },
};
