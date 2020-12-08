'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async seed(ctx) {
        var json = require("../../data/subscription.json");
        for(var i = 0; i < json.length; i++) {
            var obj = json[i];
            await strapi.services.subscription.create(obj);
        }
        return "Success";
    },
};
