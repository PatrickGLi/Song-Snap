var AppDispatcher = require('../dispatcher/dispatcher'),
    UserConstants = require('../constants/user_constants');

var UserActions = {
  receiveUser: function(user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_RECEIVED,
      user: user
    });
  },

  receiveNewUser: function(user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.NEW_USER_RECEIVED,
      user: user
    });
  },
};

module.exports = UserActions;
