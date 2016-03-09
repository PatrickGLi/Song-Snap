var ApiUtil = require('../utils/api_util');

var AppActions = {
  fetchAllUsers: function() {
    ApiUtil.fetchAllUsers();
  },

  createUser: function(user, cb) {
    ApiUtil.createUser(user, cb);
  },

  createSession: function(credentials) {
    ApiUtil.createSession(credentials);
  }

};

module.exports = AppActions;
