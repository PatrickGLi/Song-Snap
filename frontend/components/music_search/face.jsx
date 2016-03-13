var React = require('react'),
    FaceActions = require('../../actions/face_actions'),
    EmotionStore = require('../../stores/emotions_store');

var Face = React.createClass({

  componentDidMount: function() {
    this.getUserMedia();
    this.addPictureListener();

    this.listener = EmotionStore.addListener(this.onGetEmotion);
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  onGetEmotion: function() {
    setTime(function(){
      this.cameraButton.addEventListener('click', this.getPhoto)
    }.bind(this),1000);
  },

  addPictureListener: function() {
    this.cameraButton = document.getElementById('take-photo');
    this.cameraButton.addEventListener('click', this.getPhoto);
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.tracks !== null) {
      this.cameraButton.addEventListener('click', this.getPhoto);
    }
  },

  getPhoto:function() {
    setTimeout(function(){
      var canvas = document.getElementById('canvas');
      canvas.width = this.video.videoWidth;
      canvas.height = this.video.videoHeight;
      canvas.getContext('2d').drawImage(this.video, 0, 0);
      var dataURI = canvas.toDataURL('image/jpg');
      var blob = this.dataURItoBlob(dataURI);
      FaceActions.fetchEmotions(blob);
    }.bind(this), 500);
    this.cameraButton.removeEventListener('click', this.getPhoto, false);
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
      navigator.getUserMedia({video: true}, function(stream) {
        this.video.src = window.URL.createObjectURL(stream);
      }.bind(this), function(err) { console.log("There was this error: " + err)});
    }
  },

  render: function() {
    return (
      <div>
        <video autoPlay></video>
        <img id="take-photo" src="/assets/camera-icon.png"></img>
          <canvas id="canvas" style={{ display: "none" }}></canvas>
      </div>
    );
  }

});

module.exports = Face;
