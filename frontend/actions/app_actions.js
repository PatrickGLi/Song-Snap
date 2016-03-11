var ApiUtil = require('../utils/api_util');

var AppActions = {
  fetchCurrentUser: function(id) {
    ApiUtil.fetchCurrentUser(id);
  },

  createUser: function(user, cb) {
    ApiUtil.createUser(user, cb);
  },

  createSession: function(credentials, cb) {
    ApiUtil.createSession(credentials, cb);
  },

  destroySession: function() {
    ApiUtil.destroySession();
  }

};

module.exports = AppActions;
