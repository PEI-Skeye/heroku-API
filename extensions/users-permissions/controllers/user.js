"use strict";

const { default: createStrapi } = require("strapi");
const {
  findnotibyid,
} = require("../../../api/notification/controllers/notification");
const {
  addbyclassname,
} = require("../../../api/classtype/controllers/classtype");
const {
  getMobile,
} = require("../../../api/camera/controllers/camera");

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

  async addUserCamera(ctx) {
    const axios = require("axios");
    const userId = ctx.params.id;
    const camObj = ctx.request.body;
    //   {
    //     "classTypes": [
    //         {
    //             "Class": "5fda3abdb72d6002e65f2948",
    //             "NotificationType": 1
    //         }
    //     ],
    //     "macAddr": "mac1",
    //     "name": "camera1"
    // }
    let claList = [];
    //Creates all classtypes and puts them into an array with the right format
    for (var obj of camObj.classTypes) {
      const cl = await strapi.api.class.services.class.findOne({
        id: obj.Class,
      });

      var classTypeObj = {
        request: {
          body: {
            Class: cl.description,
            NotificationType: obj.NotificationType,
          },
        },
      };
      const classTypeResponse = await addbyclassname(classTypeObj);

      // const ClaTypeObjCamera = {
      //   _id: classTypeResponse._id,
      //   NotificationType: classTypeResponse.NotificationType,
      //   createdAt: classTypeResponse.createdAt,
      //   updatedAt: classTypeResponse.updatedAt,
      //   __v: classTypeResponse.__v,
      //   Class: classTypeResponse.Class._id,
      //   id: classTypeResponse.Class.id,
      // };
      // claList.push(ClaTypeObjCamera);

      claList.push(classTypeResponse._id);
      //console.log(classTypeResponse);
    }

    //create and post the camera object
    const cameraObj = {
      name: camObj.name,
      macAddress: camObj.macAddr,
      classtypes: claList,
    };
    const cameraCreated = await strapi.services.camera.create(cameraObj);
    // adicionar esse objeto de camara associado ao user
    const usrCamClassTypeObjs = [];
    for (var classTypeCamObj of cameraCreated.classtypes) {
      usrCamClassTypeObjs.push(classTypeCamObj._id);
    }
    const usrCamObj = {
      classtypes: usrCamClassTypeObjs,
      _id: cameraCreated._id,
      name: cameraCreated.name,
      macAddress: cameraCreated.macAddress,
      createdAt: cameraCreated.createdAt,
      updatedAt: cameraCreated.updatedAt,
      __v: cameraCreated.__V,
      id: cameraCreated.id,
    };
    const userInfo = await strapi.plugins[
      "users-permissions"
    ].services.user.fetch({
      _id: userId,
    });
    userInfo.cameras.push(usrCamObj);
    return await strapi
      .query("user", "users-permissions")
      .update({ id: userInfo._id }, { cameras: userInfo.cameras });
    console.log("Response:\n");
    console.log(userInfo);

    return claList;
  },
  async userlist(ctx) {
    var userList = [];
    var users = await strapi.query("user", "users-permissions").find();
    //console.log(users);
    for (var user of users) {
      //console.log(user);
      var cm = [];
      var userList = [];
      for (var camera of user.cameras) {
        let classDesc = [];
        for (var obj of camera.classtypes) {
          const clasT = await strapi.api.classtype.services.classtype.findOne({
            _id: obj
          });
          const cl = await strapi.api.class.services.class.findOne({
            id: clasT.Class,
          });

          classDesc.push({Class: cl.description,NotificationType: clasT.NotificationType});
        }
        let cam = {
          _id: camera._id,
          name: camera.name,
          macAddress: camera.macAddress,
          createdAt: camera.createdAt,
          updatedAt: camera.updatedAt,
          id: camera.id,
          classtypes: classDesc
        }

        cm.push(cam);
      }
      user.cameras = cm;
      userList.push(user);
    }
    return users;
  },
  async findClassDesc(ctx) {

    const user = await strapi.plugins[
      "users-permissions"
    ].services.user.fetch({
      _id: ctx.params.id,
    });
    console.log(user);


    var cm = [];
    for (var camera of user.cameras) {
      let classDesc = [];
      for (var obj of camera.classtypes) {
        const clasT = await strapi.api.classtype.services.classtype.findOne({
          _id: obj
        });
        const cl = await strapi.api.class.services.class.findOne({
          id: clasT.Class,
        });

        classDesc.push({Class: cl.description,NotificationType: clasT.NotificationType});
      }
        
      let cam = {
        _id: camera._id,
        name: camera.name,
        macAddress: camera.macAddress,
        createdAt: camera.createdAt,
        updatedAt: camera.updatedAt,
        id: camera.id,
        classtypes: classDesc
      }

      cm.push(cam);
  }
  user.cameras = cm;
  return user;
  },
  async payment(ctx) {
    const user = await strapi.plugins[
      "users-permissions"
    ].services.user.fetch({
      _id: ctx.params.id,
    });

    var date = new Date(); 
    date.setMonth(date.getMonth()+1);
    let dateStr = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();

    return await strapi
      .query("user", "users-permissions")
      .update({ id: ctx.params.id }, { paymentExpiration: dateStr});
  }
};
