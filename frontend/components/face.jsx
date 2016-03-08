var React = require('react'),
    FaceActions = require('../actions/face_actions');

var Face = React.createClass({
  componentDidMount: function() {
    this.getUserMedia();
    this.addPictureListener();
  },

  addPictureListener: function() {
    var cameraButton = document.getElementById('take-photo');
    cameraButton.addEventListener('click', this.getPhoto);
  },

  getPhoto:function() {
    var canvas = document.getElementById('canvas');
    canvas.width = this.video.videoWidth;
    canvas.height = this.video.videoHeight;
    canvas.getContext('2d').drawImage(this.video, 0, 0);
    var dataURI = canvas.toDataURL('image/jpg');
    var blob = this.dataURItoBlob(dataURI);
    FaceActions.fetchEmotions(blob);
  },

  dataURItoBlob: function(dataURI) {
   var byteString;
   if (dataURI.split(',')[0].indexOf('base64') >= 0)
     byteString = atob(dataURI.split(',')[1]);
   else
     byteString = unescape(dataURI.split(',')[1]);
   var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
   var ia = new Uint8Array(byteString.length);
   for (var i = 0; i < byteString.length; i++) {
     ia[i] = byteString.charCodeAt(i);
   }
   return new Blob([ia], {type:mimeString});
 },

  getUserMedia: function() {
    navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

    this.video = document.querySelector('video');

    if (navigator.getUserMedia) {
      navigator.getUserMedia({audio: true, video: true}, function(stream) {
        this.video.src = window.URL.createObjectURL(stream);
      }.bind(this), function(err) { console.log("There was this error: " + err)});
    }
  },

  render: function() {
    return (
      <div>
        <video autoPlay></video>
        <button id="take-photo" value="Take Picture"></button>
          <canvas id="canvas" style={{ display: "none" }}></canvas>
      </div>
    );
  }

});

module.exports = Face;
