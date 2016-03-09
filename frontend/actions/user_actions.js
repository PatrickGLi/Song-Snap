var AppDispatcher = require('../dispatcher/dispatcher'),
    UserConstants = require('../constants/user_constants');

var UserActions = {
  receiveNewUser: function(user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.NEW_USER_RECEIVED,
      user: user
    });
  },
};

module.exports = UserActions;
