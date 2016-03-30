var ApiUtil = require('../utils/api_util');

var LandingPageActions = {
  loginGuest: function() {
    ApiUtil.createGuestSession();
  }
};

module.exports = LandingPageActions;
