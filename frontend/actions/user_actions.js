var AppDispatcher = require('../dispatcher/dispatcher'),
    UserConstants = require('../constants/user_constants');

var UserActions = {
  receiveAllUsers: function(users) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USERS_RECEIVED,
      users: users
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
