"use strict";

const { seed } = require("../../classtype/controllers/classtype");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async seed(ctx) {
    var json = require("../../data/notification.json");
    for (var obj of json) {
      var dectDate = obj.detectionDate;
      var vidLink = obj.videoLink;
      var seen = obj.seen;
      var notiType = obj.NotificationType;
      var cam = await strapi.api.camera.services.camera.findOne({
        _id: obj.Camera,
      });
      var obj = {
        detectionDate: dectDate,
        videoLink: vidLink,
        seen: seen,
        notificationType: notiType,
        Camera: cam,
      };
      await strapi.services.notification.create(obj);
    }
    return "Success";
  },
};
