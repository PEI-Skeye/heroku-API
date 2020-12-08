"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
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
