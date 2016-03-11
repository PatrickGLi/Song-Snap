var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var UserConstants = require('../constants/user_constants.js');

var _user = null;
var _errors = [];

var UserStore = new Store(AppDispatcher);

UserStore.__onDispatch = function(payload){
  switch(payload.actionType) {
    case UserConstants.USER_RECEIVED:
      userUpdate(payload.user);
      break;
    case UserConstants.NEW_USER_RECEIVED:
    if(payload.user.errors) {
      _errors = payload.user.errors;
      UserStore.__emitChange();
    } else {
      userUpdate(payload.user);
    }
  }
};

UserStore.errors = function(){
  return _errors.slice(0);
};

var userUpdate = function(user){
  _user = user;
  _errors = [];
  UserStore.__emitChange();
};

UserStore.currentUser = function() {
  return _user;
};

module.exports = UserStore;
