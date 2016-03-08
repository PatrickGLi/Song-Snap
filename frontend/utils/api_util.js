var ReactConstants = require('../constants/react_constants');

var ApiUtil = {
  fetchEmotions: function(image) {
       $.ajax({
           url: "https://api.projectoxford.ai/emotion/v1.0/recognize",
           beforeSend: function(xhrObj){
               // Request headers
               xhrObj.setRequestHeader("Content-Type","application/json");
               xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", ReactConstants.MICROSOFT_PRIMARY_KEY);
           },
           type: "POST",
           // Request body
           data: image,
       })
       .done(function(data) {
           alert("success");
       })
       .fail(function() {
           alert("error");
       });
  }
};

module.exports = ApiUtil;
