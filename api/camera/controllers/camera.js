"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const {
  addbyclassname,
} = require("../../../api/classtype/controllers/classtype");
const route = "http://skeye-backend.herokuapp.com";
module.exports = {
  async addclasstype(ctx) {
    const axios = require("axios");
    const cameraId = ctx.params.id;
    const body = ctx.request.body;
    //console.log(JSON.stringify(body));
    var camera = await strapi.services.camera.findOne({
      _id: cameraId,
    });
    for (var classType of camera.classtypes) {
      var type = classType.NotificationType;
      var classes = await strapi.services.class.findOne({
        _id: classType.Class,
      });
      // console.log("Type = " + type);
      // console.log("Class = " + classes.description);
      if (type == body.NotificationType && classes.description == body.Class) {
        return "ClassType already exists for this Camera!";
      }
    }
    var claTy = await addbyclassname(ctx);
    // console.log("Classtype = " + JSON.stringify(claTy));
    // console.log("Classtype = " + claTy._id);
    // console.log("1 = " + JSON.stringify(camera.classtypes.length));
    camera.classtypes.push(claTy._id);
    // console.log("2 = " + JSON.stringify(camera.classtypes.length));
    var response = await strapi.services.camera.update(
      { id: cameraId },
      camera
    );
    return response;
  },

  async seed(ctx) {
    var json = require("../../data/camera.json");
    for (var i = 0; i < json.length; i++) {
      var claTy = await strapi.api.classtype.services.classtype.findOne({
        _id: json[i].Classtype,
      });
      var claTypes = [];
      for (var claId of json[i].Classtype) {
        var claTy = await strapi.api.classtype.services.classtype.findOne({
          _id: claId,
        });
        claTypes.push(claTy);
      }
      // console.log("Class type: \n");
      // console.log(claTypes);
      var obj = {
        name: json[i].name,
        macAddress: json[i].macAddress,
        classtypes: claTypes,
      };
      // console.log("Object: \n");
      // console.log(obj);
      await strapi.services.camera.create(obj);
    }
    return "Success";
  },
  async updateCamClassType(ctx) {
    const axios = require("axios");
    const cameraId = ctx.params.id;
    const camObj = ctx.request.body;
    //Creates all classtypes and puts them into an array with the right format
    let claList = [];
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

      const ClaTypeObjCamera = {
        _id: classTypeResponse._id,
        NotificationType: classTypeResponse.NotificationType,
        createdAt: classTypeResponse.createdAt,
        updatedAt: classTypeResponse.updatedAt,
        __v: classTypeResponse.__v,
        Class: classTypeResponse.Class._id,
        id: classTypeResponse.Class.id,
      };
      claList.push(ClaTypeObjCamera);
    }
    const previousCamera = await strapi.api.camera.services.camera.findOne({
      _id: cameraId,
    });
    delete previousCamera["_v"];
    let cameraObj = previousCamera;

    if (camObj.link) {
      cameraObj = {
        name: camObj.name,
        macAddress: camObj.macAddr,
        classtypes: claList,
        createdAt: previousCamera.createdAt,
        id: previousCamera.id,
        videoLink: camObj.link,
      };
    } else {
      cameraObj = {
        name: camObj.name,
        macAddress: camObj.macAddr,
        classtypes: claList,
        createdAt: previousCamera.createdAt,
        id: previousCamera.id,
      };
    }
    //console.log(cameraObj);
    var msg = {};

    await axios
      .put(`${route}/cameras/${cameraId}`, cameraObj)
      .then((response) => {
        msg = response.data;
        let ctIdsArr = [];
        for (var i of msg.classtypes) {
          ctIdsArr.push(i._id);
        }
        msg.classtypes = ctIdsArr;
      })
      .catch((err) => (msg = err));

    console.log("###########################################");
    console.log(msg);
    // const cameraCreated = await strapi.api.camera.services.camera.update(
    //   cameraId,
    //   cameraObj
    // );
    return msg;
  },
    async getMobile(ctx) {
    let camera = await strapi.api.camera.services.camera.findOne(ctx.request.body);

    let classDesc = [];
    for (var obj of camera.classtypes) {
      const cl = await strapi.api.class.services.class.findOne({
        id: obj.Class,
      });

      classDesc.push({class: cl.description, NotificationType: obj.NotificationType});
    }

    let cam = {
      _id: camera._id,
      name: camera.name,
      macAddress: camera.macAddress,
      createdAt: camera.createdAt,
      updatedAt: camera.updatedAt,
      id: camera.id,
      classTypes: classDesc
    }

    return cam;
  }
};
