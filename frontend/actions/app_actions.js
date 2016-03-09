var ApiUtil = require('../utils/api_util');

var AppActions = {
  createUser: function(user, cb) {
    ApiUtil.createUser(user, cb);
  }

};

module.exports = AppActions;
