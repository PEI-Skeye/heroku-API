"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { addbyclassname } = require("../../../api/classtype/controllers/classtype");

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
      if (type==body.NotificationType && classes.description==body.Class){
        return "ClassType already exists for this Camera!";
      }
    }
    var claTy = await addbyclassname(ctx);
    // console.log("Classtype = " + JSON.stringify(claTy));
    // console.log("Classtype = " + claTy._id);
    // console.log("1 = " + JSON.stringify(camera.classtypes.length));
    camera.classtypes.push(claTy._id);
    // console.log("2 = " + JSON.stringify(camera.classtypes.length));
    var response = await strapi.services.camera.update({ id: cameraId }, camera);
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
};
