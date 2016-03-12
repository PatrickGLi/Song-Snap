var ApiUtil = require('../utils/api_util');

var MusicSearchActions = {
  updateUser: function(currentUser) {
    ApiUtil.updateUser(currentUser);
  }
};

module.exports = MusicSearchActions;
