'use strict';

const moment = require('moment-timezone');
const localProvider = require('@strapi/provider-audit-logs-local');

const defaultEvents = [
  'entry.create',
  'entry.update',
  'entry.delete',
  'entry.publish',
  'entry.unpublish',
  'media.create',
  'media.update',
  'media.delete',
  'media-folder.create',
  'media-folder.update',
  'media-folder.delete',
  'user.create',
  'user.update',
  'user.delete',
  'admin.auth.success',
  'admin.logout',
  'content-type.create',
  'content-type.update',
  'content-type.delete',
  'component.create',
  'component.update',
  'component.delete',
  'role.create',
  'role.update',
  'role.delete',
  'permission.create',
  'permission.update',
  'permission.delete'
];

const getSanitizedUser = (user) => {
  let displayName = user.email;

  if (user.username) {
    displayName = user.username;
  } else if (user.firstname && user.lastname) {
    displayName = `${user.firstname} ${user.lastname}`;
  }

  return {
    id: user.id,
    email: user.email,
    displayName
  };
};

const getEventMap = (defaultEvents) => {
  const getDefaultPayload = (...args) => args[0];

  // Use the default payload for all default events
  return defaultEvents.reduce((acc, event) => {
    acc[event] = getDefaultPayload;
    return acc;
  }, {});
};

const createAuditLogsService = (strapi) => {
  // Manage internal service state privately
  const state = {};

  // NOTE: providers should be able to replace getEventMap to add or remove events
  const eventMap = getEventMap(defaultEvents);

  const processEvent = (name, ...args) => {
    const requestState = strapi.requestContext.get()?.state;

    // Ignore events with auth strategies different from admin
    const isUsingAdminAuth = requestState?.auth?.strategy.name === 'admin';
    const user = requestState?.user;

    if (!isUsingAdminAuth) {
      return null;
    }

    const getPayload = eventMap[name];

    // Ignore the event if it's not in the map
    if (!getPayload) {
      return null;
    }

    // Ignore some events based on payload
    const ignoredUids = ['plugin::upload.file', 'plugin::upload.folder'];
    if (ignoredUids.includes(args[0]?.uid)) {
      return null;
    }

    return {
      action: name,
      date: moment().toDate(),
      payload: getPayload(...args) || {},
      userId: user.id
    };
  };

  async function handleEvent (name, ...args) {
    const processedEvent = processEvent(name, ...args);

    if (processedEvent) {
      // This stores the event when after the transaction is committed,
      // so it's not stored if the transaction is rolled back
      await strapi.db.transaction(({ onCommit }) => {
        onCommit(() => state.provider.saveEvent(processedEvent));
      });
    }
  }

  return {
    async register () {
      // Register the provider now because collections can't be added later at runtime
      state.provider = await localProvider.register({ strapi });

      // Start saving events
      state.eventHubUnsubscribe = strapi.eventHub.subscribe(handleEvent.bind(this));

      return this;
    },

    async findMany (query) {
      const { results, pagination } = await state.provider.findMany(query);

      const sanitizedResults = results.map((result) => {
        const { user, ...rest } = result;
        return {
          ...rest,
          user: user ? getSanitizedUser(user) : null
        };
      });

      return {
        results: sanitizedResults,
        pagination
      };
    },

    async findOne (id) {
      const result = await state.provider.findOne(id);

      if (!result) {
        return null;
      }

      const { user, ...rest } = result;
      return {
        ...rest,
        user: user ? getSanitizedUser(user) : null
      };
    },

    unsubscribe () {
      if (state.eventHubUnsubscribe) {
        state.eventHubUnsubscribe();
      }

      if (state.deleteExpiredJob) {
        state.deleteExpiredJob.cancel();
      }

      return this;
    },

    destroy () {
      return this.unsubscribe();
    }
  };
};

module.exports = createAuditLogsService;
