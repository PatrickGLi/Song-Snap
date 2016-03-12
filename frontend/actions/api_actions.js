var EmotionActions = require('../actions/emotion_actions');

setTimeout(function () {
  ApiUtil = require('../utils/api_util');
}, 0);


var ApiActions = {
  getTracks: function(faceData) {
    ApiUtil.fetchTracks(faceData);
  },

  emotionReceived: function(emotions){
    EmotionActions.receiveEmotions(emotions);
  }
};

module.exports = ApiActions;
