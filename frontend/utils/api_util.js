var ReactConstants = require('../constants/react_constants');

var ApiUtil = {
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
