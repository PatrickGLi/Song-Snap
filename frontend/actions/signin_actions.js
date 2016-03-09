var ApiUtil = require('../utils/api_util');

var SignInActions = {
  destroySession: function() {
    ApiUtil.destroySession();
  }
};

module.exports = SignInActions;
