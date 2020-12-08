'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
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
