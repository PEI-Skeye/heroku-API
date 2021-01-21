"use strict";

const classtype = require("../../classtype/controllers/classtype");
const { seed } = require("../../classtype/controllers/classtype");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const endpoint = "http://skeye-backend.herokuapp.com";
// // const endpoint = "http://127.0.0.1:1337";
module.exports = {
  async findnoti(ctx) {
    const axios = require("axios");
    let finalNotis = [];
    var notif = {};
    const notificationse = await strapi.api.notification.services.notification.find();
    // return notificationse;
    for (var noti of notificationse) {
      const notiClass = await strapi.api.class.services.class.findOne({
        _id: noti.classtype.Class,
      });

      console.log(notiClass);
      notif = {
        seen: noti.seen,
        _id: noti._id,
        detectionDate: noti.detectionDate,
        videoLink: noti.videoLink,
        createdAt: noti.createdAt,
        updatedAt: noti.updatedAt,
        Camera: noti.Camera,
        classtype: noti.classtype,
        Class: notiClass,
      };
      finalNotis.push(notif);
    }
    return finalNotis;
  },

  async findnotibyid(ctx) {
    const axios = require("axios");
    // return notificationse;
    console.log(ctx.params);
    const noti = await strapi.api.notification.services.notification.findOne({
      _id: ctx.params.id,
    });
    const notiClass = await strapi.api.class.services.class.findOne({
      _id: noti.classtype.Class,
    });

    console.log(notiClass);
    const notif = {
      seen: noti.seen,
      _id: noti._id,
      detectionDate: noti.detectionDate,
      videoLink: noti.videoLink,
      createdAt: noti.createdAt,
      updatedAt: noti.updatedAt,
      Camera: noti.Camera,
      classtype: noti.classtype,
      Class: notiClass,
    };

    return notif;
  },

  async postYolo(ctx) {
    const axios = require("axios");
    var userid = ctx.request.body.idUser;
    var camera = ctx.request.body.idCamera;
    var timestamp = ctx.request.body.timestamp;
    var classes = ctx.request.body.classes;
    var url = ctx.request.body.urlVideo;
    var cam = await strapi.api.camera.services.camera.findOne({
      _id: camera,
    });
    const notis = [];
    //console.log("---- CLASSES : " + classes);
    for (var classe of classes) {
      //console.log("+++++ CLASS : " + classe);
      for (var classeType of cam.classtypes) {
        var aux = await strapi.services.class.findOne({
          _id: classeType.Class,
        });
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
          var noti = await strapi.services.notification.create(obj);
          // axios.post(`${endpoint}/notifications/`, obj).catch((error) => {
          //   console.log(`----------------Notification Add Error: ${error}\n`);
          // });

          console.log(noti);

          // var usr = await strapi.services.users.findOne({
          //   _id: userid,
          // });
          console.log("\n\n\n\n\n\n\n\n\n----------------NOTIS\n");
          notis.push(noti);
          console.log(notis);
          console.log("----------------NOTIS\n\n\n\n\n\n\n\n\n\n");
          //return "success";
        } //else return "Class not found";
      }
    }
    await axios
      .get(`${endpoint}/users/${userid}`)
      .then((usr) => {
        console.log("----------------USER\n");
        for (var no of notis) {
          usr.data.notifications.push(no);
          console.log("\n\n\n\n\n\n\n\n\n----------------USR DATA NOTIS\n");
          console.log(usr.data.notifications);
          console.log("----------------USR DATA NOTIS\n\n\n\n\n\n\n\n\n\n");
        }

        console.log(usr.data);
        axios.put(`${endpoint}/users/${userid}`, usr.data).catch((error) => {
          console.log("----------------ERROR USER 2\n");
        });
      })
      .catch((error) => {
        console.log("----------------ERROR USER\n");
        return error;
      });
    return "Success";
  },
};
