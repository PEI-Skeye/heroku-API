"use strict";

const classtype = require("../../classtype/controllers/classtype");
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
    var classes = ctx.request.body.classes;
    var url = ctx.request.body.urlVideo;
    var cam = await strapi.api.camera.services.camera.findOne({
      _id: camera,
    });
    //console.log("---- CLASSES : " + classes);
    for (var classe of classes) {
      //console.log("+++++ CLASS : " + classe);
      for (var classeType of cam.classtypes) {
        var aux = await strapi.services.class.findOne( { _id: classeType.Class });
        var ct = aux.description;
        //console.log("+++++ CLASSTYPES : " + ct);
        //console.log(`comparing ${ct} with ${classe}`);
        if (classe === ct) {
          var obj = {
            detectionDate: timestamp,
            videoLink: url,
            seen: false,
            classtype: classeType,
            Camera: camera,
          };
          await strapi.services.notification.create(obj);
          //return "success";
        } //else return "Class not found";
      }
    }
  },

  async seed(ctx) {
    const axios = require('axios').default;
    var json = require("../../data/notification.json");
    for (var obj of json) {
      axios.post("http://localhost:1337/notifications/yolo", obj);
    }
    return "success";
  },
};
