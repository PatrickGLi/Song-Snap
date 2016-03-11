var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    SessionConstants = require('../constants/session_constants');

var _userId = window.currentUserId;
var _accessToken = -1;
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

SessionStore.currentUser = function(){
  return _userId;
};

SessionStore.currentAccessToken = function() {
  return _accessToken;
};

SessionStore.errors = function(){
  return _errors.slice(0);
};

var setSessionStorage = function(user){
  _userId = user.id;
  _accessToken = user.access_token;
  _errors = [];
  SessionStore.__emitChange();
};

var removeSessionStorage = function(){
  _userId = null;
  _accessToken = null;
  SessionStore.__emitChange();
};

module.exports = SessionStore;
