var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    SessionConstants = require('../constants/session_constants'),
    ReactConstants = require('../constants/react_constants');

var _userId = ReactConstants.CURRENT_USER_ID;
var _user = null;
var _accessToken = ReactConstants.CURRENT_ACCESS_TOKEN;
var _errors = [];

var SessionStore = new Store(AppDispatcher);

SessionStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case SessionConstants.RECEIVED_CURRENT_USER:
      if(payload.user.errors) {
        _errors = payload.user.errors;
        SessionStore.__emitChange();
      } else {
        setSessionStorage(payload.user);
      }
      break;
    case SessionConstants.LOGOUT:
      removeSessionStorage();
  }
};

SessionStore.currentUserId = function(){
  return _userId;
};

SessionStore.currentUser = function() {
  return _user;
}

SessionStore.currentAccessToken = function() {
  return _accessToken;
};

SessionStore.errors = function(){
  return _errors.slice(0);
};

var setSessionStorage = function(user){
  _userId = user.id;
  _user = user;
  _accessToken = user.access_token;
  _errors = [];
  SessionStore.__emitChange();
};

var removeSessionStorage = function(){
  _userId = null;
  _userr = null;
  _accessToken = null;
  SessionStore.__emitChange();
};

module.exports = SessionStore;
