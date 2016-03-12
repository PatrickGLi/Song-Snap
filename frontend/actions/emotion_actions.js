var AppDispatcher = require('../dispatcher/dispatcher'),
    EmotionConstants = require('../constants/emotion_constants');

var EmotionActions = {
  receiveEmotions: function(emotions) {
    AppDispatcher.dispatch({
      actionType: EmotionConstants.EMOTION_RECEIVED,
      emotions: emotions
    });
  },
};

module.exports = EmotionActions;
