const _ = require('lodash');

function overwriteDynamicObject (source, target) {
  _.forEach(_.keys(target), key => {
    if (!source[key]) _.assign(source, { [key]: target[key] });
    if (typeof target[key] === 'object') {
      overwriteDynamicObject(source[key], target[key]);
    } else {
      _.assign(source, { [key]: target[key] });
    }
  });
}

module.exports = {
  overwriteDynamicObject
};
