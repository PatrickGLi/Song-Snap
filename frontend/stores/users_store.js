var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var UserConstants = require('../constants/user_constants.js');

var _users = {};
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
      addUser(payload.user);
    }
  }
};

var addUser = function(user){
  _users[user.id] = user;
  _errors = [];
  UserStore.__emitChange();
};

UserStore.errors = function(){
  return _errors.slice(0);
};

var resetUsers = function(users){
  users.forEach(function(user){
    _users[user.id] = user;
  });
};

var userUpdate = function(user){
  _users[user.id] = user;
  _errors = [];
  UserStore.__emitChange();
};

UserStore.all = function() {
  var users = [];
  Object.keys(_users).forEach(function(key){
    users.push(_users[key]);
  });
  return users;
};

UserStore.find = function(id){
  return _users[id];
};


module.exports = UserStore;
