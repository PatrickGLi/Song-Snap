var AppDispatcher = require('../dispatcher/dispatcher'),
    Store = require('flux/utils').Store;
    EmotionConstants = require('../constants/emotion_constants');

var _emotion = null;

var EmotionStore = new Store(AppDispatcher);

EmotionStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case EmotionConstants.EMOTION_RECEIVED:
      resetEmotion(payload.emotions);
      break;
  }
};

EmotionStore.currentEmotion = function() {
  return _emotion;
};

function resetEmotion(emotions) {
  _emotion = calculateMood(emotions);

  EmotionStore.__emitChange();
}

function calculateMood(emotions) {
  var highest = 0;
  var mood = ""

  for (var k in emotions[0].scores) {
    var convertedValue = parseFloat(emotions[0].scores[k]);

    if (convertedValue > highest) {
      highest = convertedValue;
      mood = k
    }
  }

  debugger
  return mood;
}

module.exports = EmotionStore;
