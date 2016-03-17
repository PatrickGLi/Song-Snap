var React = require('react'),
    FaceActions = require('../../actions/face_actions'),
    EmotionStore = require('../../stores/emotions_store');

var Face = React.createClass({
  getInitialState: function() {
    return ({ loading: false,
              url: false
          });
  },

  componentDidMount: function() {
    this.getUserMedia();
    this.addPictureListener();

    this.listener = EmotionStore.addListener(this.onGetEmotion);
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  onGetEmotion: function() {
    setTimeout(function(){
      this.setState({ loading: false });
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
    this.setState({ loading: true });
    var sound = document.getElementById('sound-effect');
    sound.play();
    var canvas = document.getElementById('canvas');
    canvas.width = this.video.videoWidth;
    canvas.height = this.video.videoHeight;
    canvas.getContext('2d').drawImage(this.video, 0, 0);
    var dataURI = canvas.toDataURL('image/jpg');
    this.setState({ url: dataURI });
    var blob = this.dataURItoBlob(dataURI);
    this.cameraButton.removeEventListener('click', this.getPhoto, false);
    setTimeout(function(){
      FaceActions.fetchEmotions(blob);
    }, 500);
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
    var loadSpinner;
    if (this.state.loading) {
      loadSpinner = (
        <div className="spinner">
        </div>
      );
    } else {
      loadSpinner = <div></div>;
    }

    var image;
    if (this.state.url) {
      image = (
        <img className="last-picture" src={this.state.url}></img>
      );
    } else {
      image = <div></div>;
    }

    return (
      <div>
        {image}
        {loadSpinner}
        <video autoPlay></video>
          <div className="overlay"><div id="take-photo"></div></div>
          <audio id="sound-effect" >
            <source src="camera-shutter-click-03.mp3" type="audio/mpeg"></source>
          </audio>
          <canvas id="canvas" style={{ display: "none" }}></canvas>
      </div>
    );
  }

});

module.exports = Face;
