var ReactConstants = require('../constants/react_constants'),
    UserActions = require('../actions/user_actions'),
    SessionActions = require('../actions/session_actions');

var ApiUtil = {
  fetchCurrentUser: function(id){
    $.get('api/users/'+ id, {}, function(data) {
      UserActions.receiveUser(data);
    });
  },

  createUser: function(user, cb){
    $.ajax({
      url: 'api/users',
      type: 'POST',
      data: {user: user},
      success: function(response) {
        UserActions.receiveNewUser(response);
        if (!response.errors) {
          cb();
        }
      }
    });
  },

  createSession: function(credentials){
    $.ajax({
      url: 'api/session',
      type: 'POST',
      data: {user: credentials},
      success: function(response){
        UserActions.receiveUser(response);
        SessionActions.receiveCurrentUser(response);
      }
    });
  },

  destroySession: function() {
    $.ajax({
      url: 'api/session',
      type: 'DELETE',
      data: {},
      success: SessionActions.logout
    });
  },

  fetchEmotions: function(blobData) {
    $.ajax({
               url: "https://api.projectoxford.ai/emotion/v1.0/recognize",
               beforeSend: function(xhrObj){
                   // Request headers
                   xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
                   xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", ReactConstants.MICROSOFT_PRIMARY_KEY);
               },
               type: "POST",
               processData: false,
               // Request body
               data: blobData,
               success: function(data) {
                 console.log(data);
               }
           });
  }
};



module.exports = ApiUtil;
