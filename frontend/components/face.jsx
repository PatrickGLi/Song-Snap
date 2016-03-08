var React = require('react'),
    FaceActions = require('../actions/face_actions');

var Face = React.createClass({
  componentDidMount: function() {
    this.getUserMedia();
  },

  getUserMedia: function() {
    navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

    var video = document.querySelector('video');

    if (navigator.getUserMedia) {
      navigator.getUserMedia({audio: true, video: true}, function(stream) {
        video.src = window.URL.createObjectURL(stream);
      }, errorCallback);
    }

    function errorCallback() {
      alert("Something went wrong with your camera.");
    }
  },

  render: function() {

    return (
      <div>
        <video autoPlay></video>
      </div>
    )
  }
});

module.exports = Face;
