'use strict';

/**
 * academic-program service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::academic-program.academic-program');
