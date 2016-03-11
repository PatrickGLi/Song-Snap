setTimeout(function () {
  ApiUtil = require('../utils/api_util');
}, 0);


var ApiActions = {
  getTracks: function(faceData) {
    ApiUtil.fetchTracks(faceData);
  }
};

module.exports = ApiActions;
