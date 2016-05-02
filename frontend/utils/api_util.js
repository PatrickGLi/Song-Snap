var ReactConstants = require('../constants/react_constants'),
    UserActions = require('../actions/user_actions'),
    SessionActions = require('../actions/session_actions'),
    TrackActions = require('../actions/track_actions'),
    ApiActions = require('../actions/api_actions');

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

  createSession: function(credentials, cb){
    $.ajax({
      url: 'api/session',
      type: 'POST',
      data: {user: credentials},
      success: function(response){
        SessionActions.receiveCurrentUser(response);
        if (!response.errors) {
          UserActions.receiveUser(response);
          cb();
        }
      }
    });
  },

  createGuestSession: function(cb) {
    $.ajax({
      url: 'api/session',
      type: 'POST',
      data: {
              user: { username: "guest",
                      password: "password"
                    }
            },
      success: function(response){
        SessionActions.receiveCurrentUser(response);
        if (!response.errors) {
          UserActions.receiveUser(response);
          cb();
        }
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
                 ApiActions.emotionReceived(data);

                 if (data.length > 0) {
                   ApiActions.getTracks(data);
                 }
               }
           });
  },

  fetchTracks: function(faceData) {
    $.ajax({
      url: 'api/tracks',
      type: 'GET',
      data: {faceData},
      success: function(data) {
        TrackActions.receiveTracks(data);
      }
    });
  },
};



module.exports = ApiUtil;
