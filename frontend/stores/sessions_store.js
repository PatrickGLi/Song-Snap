var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    SessionConstants = require('../constants/session_constants');

var _userId = window.currentUserId;
var _errors = [];

var SessionStore = new Store(AppDispatcher);

SessionStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case SessionConstants.RECEIVED_CURRENT_USER:
      if(payload.user.errors) {
        _errors = payload.user.errors;
        SessionStore.__emitChange();
      } else {
        setSessionStorage(payload.user.id);
      }
      break;
    case SessionConstants.LOGOUT:
      removeSessionStorage();
  }
};

SessionStore.currentUser = function(){
  return _userId;
};

SessionStore.errors = function(){
  return _errors.slice(0);
};

var setSessionStorage = function(userId){
  _userId = userId;
  _errors = [];
  SessionStore.__emitChange();
};

var removeSessionStorage = function(){
  _userId = null;
  SessionStore.__emitChange();
};

module.exports = SessionStore;
