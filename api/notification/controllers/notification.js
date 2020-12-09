"use strict";

const { seed } = require("../../classtype/controllers/classtype");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async postYolo(ctx) {
    var user = ctx.request.body.idUser;
    var camera = ctx.request.body.idCamera;
    var timestamp = ctx.request.body.timestamp;
    var classes = ctx.request.body.Classes;
    var url = ctx.request.body.urlVideo;
    var cam = await strapi.api.camera.services.camera.findOne({
      _id: camera,
    });
    console.log(classes);
    for (var classe of classes) {
      for (var classeType of cam.classtypes) {
        const classObj = await strapi.services.class.findOne({
          description: classe,
        });
        const classDesc = classObj.description;
        console.log(`comparing ${classDesc} with ${classe}`);
        if (classe === classDesc) {
          var obj = {
            detectionDate: timestamp,
            videoLink: url,
            seen: false,
            classtype: classeType,
            Camera: camera,
          };
          await strapi.services.notification.create(obj);
          return "success";
        } else return "Class not found";
      }
    }
  },
  async seed(ctx) {
    var json = require("../../data/notification.json");
    for (var obj of json) {
      var dectDate = obj.detectionDate;
      var vidLink = obj.videoLink;
      var seen = obj.seen;

      var cam = await strapi.api.camera.services.camera.findOne({
        _id: obj.Camera,
      });

      var obj = {
        detectionDate: dectDate,
        videoLink: vidLink,
        seen: seen,
        Camera: cam,
      };
      await strapi.services.notification.create(obj);
    }
    return "Success";
  },
};
