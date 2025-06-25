const { validatePassword } = require('@strapi/admin/server/services/auth');

const checkCredentials = async ({ email, password }) => {
  // eslint-disable-next-line no-undef
  const user = await strapi.query('admin::user').findOne({ where: { email } });

  if (!user || !user.password) {
    return [null, false, { message: 'Invalid credentials', email }];
  }

  const isValid = await validatePassword(password, user.password);

  if (!isValid) {
    return [null, false, { message: 'Invalid credentials', email }];
  }

  if (!(user.isActive === true)) {
    return [null, false, { message: 'User not active', email }];
  }

  return [null, user];
};

module.exports = {
  checkCredentials,
};
