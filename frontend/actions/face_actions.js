var ApiUtil = require('../utils/api_util');

var FaceActions = {
  getFaceEmotions: function() {
    ApiUtil.fetchEmotions();
  }
};

module.exports = FaceActions;
