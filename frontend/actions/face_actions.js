var ApiUtil = require('../utils/api_util');

var FaceActions = {
  fetchEmotions: function(data) {
    ApiUtil.fetchEmotions(data);
  }
};

module.exports = FaceActions;
