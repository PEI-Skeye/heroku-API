'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    async addbyclassname(ctx) {
        const body = ctx.request.body;
        const type = body.NotificationType;
        const classe = body.Class;
        const ClassTypes = await strapi.services.classtype.find();
        for (var classType of ClassTypes) {
            var cls = classType.Class;
            // console.log("Type = " + classType.NotificationType);
            // console.log("Class = " + cls.description);
            if (type==classType.NotificationType){
                var cl = await strapi.api.class.services.class.findOne({ _id: cls._id });
                if (classe == cl.description) {
                    return classType;
                }
            }
        }
        var cla = await strapi.api.class.services.class.findOne({ description: classe });
        var obj = { NotificationType: type, Class: cla._id};
        var response = await strapi.services.classtype.create(obj);
        return response;
    },

    async seed(ctx) {
        var json = require('../../data/class-type.json');
        for(var obj of json) {
            var notif = obj.NotificationType;
            var clas = obj.Class;
            var cl = await strapi.api.class.services.class.findOne({ description: clas });
            var obj = { NotificationType: notif, Class: cl._id};

            await strapi.services.classtype.create(obj);
        }
        return "Success, FINALLY";
    }
}
