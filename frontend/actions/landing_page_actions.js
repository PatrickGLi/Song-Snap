var ApiUtil = require('../utils/api_util');

var LandingPageActions = {
  loginGuest: function(cb) {
    ApiUtil.createGuestSession(cb);
  }
};

module.exports = LandingPageActions;
