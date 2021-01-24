"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async addbyclassname(ctx) {
    const body = ctx.request.body;
    const type = body.NotificationType;
    const classe = body.Class;
    const ClassTypes = await strapi.api.classtype.services.classtype.find();
    console.log("Type1 = " + type);
    console.log("Class1 = " + classe);
    for (var classType of ClassTypes) {
      var cls = classType.Class;
      console.log(
        `A comparar ${type} === ${classType.NotificationType} e \n ${classe} === ${classType.Class.description} `
      );
      //   if (
      //     type === classType.NotificationType &&
      //     classe === classType.Class.description
      //   ) {
      //     console.log("Type1 = " + type);
      //     console.log("Class1 = " + classe);
      //     console.log("Type2 = " + classType.NotificationType);
      //     console.log("Class2 = " + classType.Class.description);
      //     return classType;
      //   }
    }

    const classtype = ClassTypes.find((obj) => {
      return obj.NotificationType === type && obj.Class.description === classe;
    });
    console.log(classtype);
    if (classtype) {
      return classtype;
    } else {
      var cla = await strapi.api.class.services.class.findOne({
        description: classe,
      });
      console.log(cla);
      var obj = { NotificationType: type, Class: cla._id };
      var response = await strapi.api.classtype.services.classtype.create(obj);
      return response;
    }
  },

  async seed(ctx) {
    var json = require("../../data/class-type.json");
    for (var obj of json) {
      var notif = obj.NotificationType;
      var clas = obj.Class;
      var cl = await strapi.api.class.services.class.findOne({
        description: clas,
      });
      var obj = { NotificationType: notif, Class: cl._id };

      await strapi.services.classtype.create(obj);
    }
    return "Success, FINALLY";
  },
};
