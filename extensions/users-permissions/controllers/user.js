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
  async setNotiTrue(ctx) {
    const userid = ctx.params.id;
    const userInfo = await strapi.plugins[
      "users-permissions"
    ].services.user.fetch({
      _id: userid,
    });
    //console.log(userInfo); // Corre ate aqui
    var notis = [];
    for (var not of userInfo.notifications) {
      const notif = await strapi.api.notification.services.notification.findOne(
        {
          id: not._id,
        }
      );
      if (notif.seen === false) {
        notif.seen = true;
        await strapi.api.notification.services.notification.update(
          { _id: notif._id },
          {
            _id: notif._id,
            seen: notif.seen,
            detectionDate: notif.detectionDate,
            videoLink: notif.videoLink,
            Camera: notif.Camera,
            classtype: notif.classtype,
          }
        );
        // console.log(notis);
      }
    }

    return await strapi.plugins["users-permissions"].services.user.fetch({
      _id: userid,
    });
  },
};
