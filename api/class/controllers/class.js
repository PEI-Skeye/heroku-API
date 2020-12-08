'use strict';
const {sanitizeEntity} = require ('strapi-utils')
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async seed(ctx) {
        var json = require("../../data/class.json");
        for(var i = 0; i < json.length; i++) {
            var obj = json[i];
            await strapi.services.class.create(obj);
        }
        return "Success";
    },

   async findByDesc(ctx) {
    const { description } = ctx.params;

    const entity = await strapi.services.class.findOne({ description: description });
    return sanitizeEntity(entity, { model: strapi.models.class });
  }

};
